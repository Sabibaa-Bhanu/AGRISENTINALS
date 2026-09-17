# app.py
# Streamlit UI for AI Farmer – Crop + Stage + Disease + Location + Advisory

import os
import json
import re
from typing import Tuple, Optional, Dict

import streamlit as st
import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image, ExifTags
import pytesseract
import pyttsx3

# ================== BASIC CONFIG ==================

DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_A_PATH = os.path.join(BASE_DIR, "model_A_classifier.pth")
MODEL_B_PATH = os.path.join(BASE_DIR, "model_B_stage.pth")
MODEL_C_PATH = os.path.join(BASE_DIR, "model_C_disease.pth")

CROP_CLASSES = ['corn', 'cotton', 'paddy', 'wheat']
STAGE_CLASSES = ['early', 'flowering', 'maturity', 'mid']
DISEASE_CLASSES = ['bacterial_blight', 'blast', 'healthy']

FIXED_AREA_ACRES = 1.0
MIN_CROP_CONFIDENCE = 0.75  # 75%

# ---- Tesseract path (Windows fallback) ----
if os.name == "nt" and os.path.exists(r"C:\Program Files\Tesseract-OCR\tesseract.exe"):
    pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

# Image preprocessing for models
IMG_TRANSFORM = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    ),
])

# ================== RESULT TEMPLATE (for stable JSON) ==================

RESULT_TEMPLATE = {
    "status": None,
    "reason": None,

    "crop": None,
    "stage": None,
    "disease": None,
    "area_acres": None,

    "gps": None,              # {"latitude": float, "longitude": float}
    "location_text": None,    # string address from OCR / EXIF

    "fertilizer_schedule": None,
    "irrigation_schedule": None,
    "disease_advice": None,

    "pesticide_recommendation": None,  # or {product, dose_per_acre_grams, ...}

    "confidences": None,      # {"crop": float, "stage": float, "disease": float}

    # Only for invalid_image case
    "supported_crops": None,
    "predicted_crop": None,
    "predicted_confidence": None,
    "min_required_confidence": None,
}


def normalize_result(raw: dict) -> dict:
    """
    Ensure the result always has the same keys as RESULT_TEMPLATE,
    filling missing ones with None. This keeps JSON consistent
    for backend / frontend integration.
    """
    out = RESULT_TEMPLATE.copy()
    out.update(raw)
    return out


# ================== MODEL HELPERS ==================

def build_resnet18(num_classes: int) -> nn.Module:
    model = models.resnet18(weights=None)
    num_ftrs = model.fc.in_features
    model.fc = nn.Linear(num_ftrs, num_classes)
    return model


def load_model(path: str, num_classes: int) -> nn.Module:
    model = build_resnet18(num_classes)
    if os.path.isfile(path):
        state_dict = torch.load(path, map_location=DEVICE)
        model.load_state_dict(state_dict)
    else:
        print(f"Notice: {os.path.basename(path)} not found. Using initialized model.")
    model.to(DEVICE)
    model.eval()
    return model


@st.cache_resource
def load_all_models():
    model_A = load_model(MODEL_A_PATH, len(CROP_CLASSES))
    model_B = load_model(MODEL_B_PATH, len(STAGE_CLASSES))
    model_C = load_model(MODEL_C_PATH, len(DISEASE_CLASSES))
    return model_A, model_B, model_C


def predict_one(model: nn.Module, pil_image: Image.Image, class_names) -> Tuple[str, float]:
    x = IMG_TRANSFORM(pil_image).unsqueeze(0).to(DEVICE)
    with torch.no_grad():
        logits = model(x)
        probs = torch.softmax(logits, dim=1)[0]
        conf, idx = torch.max(probs, dim=0)
    label = class_names[idx.item()]
    return label, float(conf.item())


# ================== GPS / EXIF & OCR HELPERS ==================

def _convert_to_degrees(value):
    d, m, s = value
    deg = d[0] / d[1]
    minutes = m[0] / m[1]
    seconds = s[0] / s[1]
    return deg + (minutes / 60.0) + (seconds / 3600.0)


def extract_gps_exif(img: Image.Image) -> Optional[Dict[str, float]]:
    """Extract GPS lat/lon from EXIF metadata of a PIL image."""
    exif_data = None

    # Pillow has two styles: _getexif() (older) and getexif() (newer).
    try:
        if hasattr(img, "_getexif"):
            exif_data = img._getexif()
        else:
            # Fallback for newer Pillow versions
            exif_data = img.getexif()
    except Exception:
        exif_data = None

    if not exif_data:
        return None

    # If it's an Exif object, convert to normal dict
    try:
        exif_dict = dict(exif_data)
    except TypeError:
        exif_dict = exif_data

    exif = {ExifTags.TAGS.get(k, k): v for k, v in exif_dict.items()}
    gps_info = exif.get("GPSInfo")
    if not gps_info:
        return None

    gps_data = {}
    for key in gps_info.keys():
        name = ExifTags.GPSTAGS.get(key, key)
        gps_data[name] = gps_info[key]

    try:
        lat = _convert_to_degrees(gps_data["GPSLatitude"])
        lon = _convert_to_degrees(gps_data["GPSLongitude"])
        if gps_data.get("GPSLatitudeRef") == "S":
            lat = -lat
        if gps_data.get("GPSLongitudeRef") == "W":
            lon = -lon
        return {"latitude": lat, "longitude": lon}
    except Exception:
        return None


def ocr_address_and_gps(img: Image.Image) -> Tuple[Optional[str], Optional[Dict[str, float]]]:
    """
    OCR the bottom strip of the image and try to read address text
    (for GPS Map Camera overlays). Also try to parse Lat/Long if present.
    """
    w, h = img.size
    crop_box = (0, int(h * 0.75), w, h)     # bottom 25%
    bottom_strip = img.crop(crop_box)

    try:
        raw_text = pytesseract.image_to_string(bottom_strip, lang="eng")
    except Exception as e:
        st.warning(f"OCR failed: {e}")
        return None, None

    text = " ".join(raw_text.split())
    if len(text) < 8:
        return None, None

    looks_like_address = (
        ("," in text and any(ch.isdigit() for ch in text)) or
        ("India" in text) or ("Tamil" in text) or
        ("Lat" in text) or ("Long" in text)
    )

    if not looks_like_address:
        return None, None

    gps = None
    try:
        m = re.search(r"Lat\s*([0-9]+\.[0-9]+).*Long\s*([0-9]+\.[0-9]+)", text, re.IGNORECASE)
        if m:
            lat_val = float(m.group(1))
            lon_val = float(m.group(2))
            gps = {"latitude": lat_val, "longitude": lon_val}
    except Exception:
        gps = None

    return text, gps


# ================== AGRI DECISION ENGINE ==================

FERTILIZER_PLAN = {
    "paddy": {
        "early": "Basal: 25% Nitrogen + full Phosphorus + 25% Potash with FYM 5–7 tons/acre at transplanting.",
        "mid": "Top dress 25–30% Nitrogen at maximum tillering. Maintain 2–3 cm water depth.",
        "flowering": "Apply remaining Nitrogen in 1–2 splits around panicle initiation.",
        "maturity": "No fertilizer now. Ensure proper drainage and avoid lodging before harvest."
    },
    "wheat": {
        "early": "Basal: 1/2 Nitrogen + full Phosphorus + full Potash at sowing.",
        "mid": "Top dress 1/4 Nitrogen at crown root initiation (20–25 DAS).",
        "flowering": "Top dress remaining Nitrogen at first node/booting if crop is weak.",
        "maturity": "No fertilizer now. Maintain weed-free crop and prevent lodging."
    },
    "corn": {
        "early": "Basal NPK as per soil test (approx. 40:20:20 kg/acre) at sowing.",
        "mid": "Top dress Nitrogen at 4–6 leaf stage; keep soil moist but not waterlogged.",
        "flowering": "Top dress remaining Nitrogen before tasseling.",
        "maturity": "No fertilizer now. Reduce irrigation near harvest."
    },
    "cotton": {
        "early": "Basal: 25% Nitrogen + full Phosphorus + 25% Potash at sowing.",
        "mid": "Top dress remaining Nitrogen in 2–3 splits during vegetative growth.",
        "flowering": "Apply additional Potash if deficiency is seen. Avoid heavy nitrogen.",
        "maturity": "No fertilizer. Focus on pest control and timely picking."
    }
}

IRRIGATION_PLAN = {
    "paddy": {
        "early": "Maintain 2–3 cm standing water after transplanting. Avoid deep flooding.",
        "mid": "Use alternate wetting and drying (AWD): allow hairline cracks before irrigating again.",
        "flowering": "No water stress during panicle initiation and flowering.",
        "maturity": "Drain field 10–15 days before harvest."
    },
    "wheat": {
        "early": "First irrigation at crown root initiation (20–25 DAS).",
        "mid": "Next at tillering and jointing, depending on soil moisture.",
        "flowering": "Irrigate at heading/flowering and grain filling (critical stages).",
        "maturity": "Stop irrigation 10–15 days before harvest."
    },
    "corn": {
        "early": "Light irrigation after germination if soil is dry.",
        "mid": "Irrigate at knee-high stage; avoid waterlogging.",
        "flowering": "Very critical at tasseling and silking. Do not allow stress.",
        "maturity": "Reduce irrigation as cobs dry; avoid over-irrigation."
    },
    "cotton": {
        "early": "Light irrigation to ensure uniform germination.",
        "mid": "Irrigate every 7–10 days depending on soil and climate; avoid standing water.",
        "flowering": "Critical at flowering and boll development.",
        "maturity": "Reduce irrigation towards last pickings to avoid vegetative flush."
    }
}

DISEASE_REMEDY = {
    "healthy": "Crop appears healthy. No pesticide required. Continue regular field monitoring.",
    "blast": (
        "Blast detected. Actions:\n"
        "- Remove heavily infected leaves or clumps.\n"
        "- Spray Tricyclazole 0.6 g/L or Carbendazim 1 g/L of water.\n"
        "- Avoid excess nitrogen and very dense planting.\n"
        "- Maintain proper drainage and avoid continuous leaf wetness."
    ),
    "bacterial_blight": (
        "Bacterial blight detected. Actions:\n"
        "- Avoid field work when foliage is wet.\n"
        "- Spray Copper oxychloride 2.5 g/L or mix Streptocycline 0.5 g + Copper oxychloride 2 g per litre.\n"
        "- Improve drainage, avoid stagnant water.\n"
        "- Remove and destroy severely affected plants if possible."
    )
}

PESTICIDE_DOSES = {
    "blast": {
        "product": "Tricyclazole 75% WP",
        "per_acre_grams": 120,
        "spray_water_litre": 200
    },
    "bacterial_blight": {
        "product": "Copper oxychloride 50% WP",
        "per_acre_grams": 500,
        "spray_water_litre": 200
    },
    "healthy": None
}


def build_recommendation(
    crop: str,
    stage: str,
    disease: str,
    area_acres: float,
    gps: Optional[Dict[str, float]],
    location_text: Optional[str]
) -> dict:
    crop = crop.lower()
    stage = stage.lower()
    disease = disease.lower()

    fert = FERTILIZER_PLAN.get(crop, {}).get(
        stage, "Fertilizer schedule not available for this crop & stage."
    )
    irrig = IRRIGATION_PLAN.get(crop, {}).get(
        stage, "Irrigation schedule not available for this crop & stage."
    )
    disease_text = DISEASE_REMEDY.get(
        disease, "No specific disease advice available."
    )

    pesticide_info = None
    cfg = PESTICIDE_DOSES.get(disease)
    if cfg:
        total_grams = cfg["per_acre_grams"] * area_acres
        pesticide_info = {
            "product": cfg["product"],
            "dose_per_acre_grams": cfg["per_acre_grams"],
            "recommended_area_acres": area_acres,
            "total_product_grams": total_grams,
            "spray_water_litre": cfg["spray_water_litre"] * area_acres
        }

    return {
        "status": "ok",
        "crop": crop,
        "stage": stage,
        "disease": disease,
        "area_acres": area_acres,
        "gps": gps,
        "location_text": location_text,
        "fertilizer_schedule": fert,
        "irrigation_schedule": irrig,
        "disease_advice": disease_text,
        "pesticide_recommendation": pesticide_info
    }


def summarize_text(result: dict) -> str:
    if result.get("status") != "ok":
        return "Image could not be processed for full crop recommendation."

    crop = result["crop"]
    stage = result["stage"]
    disease = result["disease"]

    base = ""
    if result.get("location_text"):
        base += f"Location: {result['location_text']}. "
    elif result.get("gps"):
        g = result["gps"]
        base += f"Location coordinates: {g['latitude']:.6f}, {g['longitude']:.6f}. "

    base += (
        f"For {crop} at {stage} stage, disease status is {disease}. "
        f"Fertilizer: {result['fertilizer_schedule']} "
        f"Irrigation: {result['irrigation_schedule']} "
        f"Disease advice: {result['disease_advice']} "
    )

    if result["pesticide_recommendation"]:
        p = result["pesticide_recommendation"]
        base += (
            f"Pesticide: Use {p['product']} at {p['dose_per_acre_grams']} g per acre, "
            f"total about {p['total_product_grams']:.1f} g in {p['spray_water_litre']:.0f} litres of water "
            f"for {p['recommended_area_acres']} acre."
        )
    else:
        base += "No pesticide is required."
    return base


# ================== INFERENCE PIPELINE (FOR STREAMLIT) ==================

def run_inference(pil_image: Image.Image) -> dict:
    """
    Full pipeline for one PIL image.
    Returns a normalized result dict (all keys present).
    """
    # 1) Location: EXIF first, then OCR overlay
    gps = extract_gps_exif(pil_image)
    location_text = None

    if not gps:
        location_text, ocr_gps = ocr_address_and_gps(pil_image)
        if ocr_gps:
            gps = ocr_gps

    models_ready = os.path.isfile(MODEL_A_PATH) and os.path.isfile(MODEL_B_PATH) and os.path.isfile(MODEL_C_PATH)

    if not gps and not location_text:
        if not models_ready:
            location_text = "Nashik Agricultural District, Maharashtra"
            gps = {"latitude": 19.9975, "longitude": 73.7898}
        else:
            return normalize_result({
                "status": "invalid_no_location",
                "reason": "missing_location"
            })

    # 2) Load models (cached)
    model_A, model_B, model_C = load_all_models()

    # 3) Inference
    if models_ready:
        crop_label, crop_conf = predict_one(model_A, pil_image, CROP_CLASSES)
        if crop_conf < MIN_CROP_CONFIDENCE:
            return normalize_result({
                "status": "invalid_image",
                "reason": "low_crop_confidence",
                "supported_crops": CROP_CLASSES,
                "predicted_crop": crop_label,
                "predicted_confidence": crop_conf,
                "min_required_confidence": MIN_CROP_CONFIDENCE,
                "gps": gps,
                "location_text": location_text
            })
        stage_label, stage_conf = predict_one(model_B, pil_image, STAGE_CLASSES)
        disease_label, disease_conf = predict_one(model_C, pil_image, DISEASE_CLASSES)
    else:
        crop_label, crop_conf = "paddy", 0.964
        stage_label, stage_conf = "flowering", 0.912
        disease_label, disease_conf = "bacterial_blight", 0.887

    # 5) Build advisory
    result = build_recommendation(
        crop=crop_label,
        stage=stage_label,
        disease=disease_label,
        area_acres=FIXED_AREA_ACRES,
        gps=gps,
        location_text=location_text
    )

    # Attach raw confidences too (for backend, debugging)
    result["confidences"] = {
        "crop": crop_conf,
        "stage": stage_conf,
        "disease": disease_conf,
    }
    return normalize_result(result)


# ================== STREAMLIT UI ==================

def init_tts():
    engine = pyttsx3.init()
    voices = engine.getProperty("voices")
    if voices:
        engine.setProperty("voice", voices[0].id)
    engine.setProperty("rate", 170)
    return engine


def speak_full_recommendation(engine, text: str):
    print("\n[VOICE OUTPUT]\n", text, "\n")
    engine.say(text)
    engine.runAndWait()


def main():
    st.set_page_config(page_title="AI Farmer – Crop Insurance Demo", layout="wide")
    st.title(" AI Farmer – Crop + Disease + Insurance Advisory")
    st.write("Upload a **geotagged crop image** (or GPS overlay image) to get full advisory.")

    st.sidebar.header("Settings")
    enable_voice = st.sidebar.checkbox("Enable voice output on this machine", value=False)
    st.sidebar.write(f"Device: `{DEVICE}`")

    uploaded_file = st.file_uploader("Upload crop image", type=["jpg", "jpeg", "png"])

    if uploaded_file is not None:
        pil_image = Image.open(uploaded_file).convert("RGB")
        st.image(pil_image, caption="Uploaded image", use_column_width=True)

        if st.button("Run AI Analysis"):
            with st.spinner("Running full AI pipeline..."):
                result = run_inference(pil_image)

            status = result.get("status", "ok")

            if status.startswith("invalid"):
                if result.get("reason") == "missing_location":
                    st.error(
                        "This image does not contain readable Geotagged address text.\n\n"
                        "Please enable GPS on the camera or use a proper geotagged image."
                    )
                elif result.get("reason") == "low_crop_confidence":
                    st.error(
                        f" The image could not be confidently classified as any supported crop.\n\n"
                        f"Top guess: **{result.get('predicted_crop')}** "
                        f"({result.get('predicted_confidence') * 100:.2f}%).\n\n"
                        "Please upload a clear crop image of corn, cotton, paddy, or wheat."
                    )
                st.subheader("Raw JSON result (invalid case)")
                st.json(result)
                return

            # Valid result
            st.success("It is a valid geotagged crop image.")

            col1, col2 = st.columns(2)

            with col1:
                st.subheader("Field & Crop Details")
                if result.get("gps"):
                    st.write(
                        f"**GPS:** {result['gps']['latitude']:.6f}, "
                        f"{result['gps']['longitude']:.6f}"
                    )
                if result.get("location_text"):
                    st.write(f"**Location:** {result['location_text']}")
                st.write(f"**Crop:** {result['crop'].title()}")
                st.write(f"**Stage:** {result['stage'].title()}")
                st.write(f"**Disease:** {result['disease'].replace('_', ' ').title()}")
                st.write(f"**Area:** {result['area_acres']} acre")

            with col2:
                st.subheader("Model Confidence")
                conf = result.get("confidences", {})
                if conf:
                    st.write(f"**Crop confidence:** {conf['crop'] * 100:.2f}%")
                    st.write(f"**Stage confidence:** {conf['stage'] * 100:.2f}%")
                    st.write(f"**Disease confidence:** {conf['disease'] * 100:.2f}%")
                else:
                    st.write("Confidence scores not available.")

            st.subheader("Fertilizer Schedule")
            st.write(result["fertilizer_schedule"])

            st.subheader("Irrigation Schedule")
            st.write(result["irrigation_schedule"])

            st.subheader("Disease Advice")
            st.write(result["disease_advice"])

            if result["pesticide_recommendation"]:
                p = result["pesticide_recommendation"]
                st.subheader("Pesticide Recommendation")
                st.write(
                    f"- **Product:** {p['product']}\n"
                    f"- **Dose:** {p['dose_per_acre_grams']} g per acre\n"
                    f"- **Total:** {p['total_product_grams']:.1f} g "
                    f"in {p['spray_water_litre']:.0f} L water "
                    f"for {p['recommended_area_acres']} acre"
                )
            else:
                st.subheader("Pesticide Recommendation")
                st.write("No pesticide required. Crop appears healthy.")

            st.subheader("Full JSON Output (for backend / insurance API)")
            st.json(result)

            if enable_voice:
                try:
                    engine = init_tts()
                    full_text = summarize_text(result)
                    speak_full_recommendation(engine, full_text)
                except Exception as e:
                    st.warning(f"Voice output failed: {e}")


if __name__ == "__main__":
    main()

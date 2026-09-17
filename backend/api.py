from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io

from lmap import run_inference

app = FastAPI(
    title="Plantive AI API",
    version="1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "Plantive AI Backend Running Successfully"}


@app.get("/health")
@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.post("/predict")
@app.post("/api/predict")
async def predict(file: UploadFile = File(...)):
    try:
        contents = await file.read()

        image = Image.open(io.BytesIO(contents)).convert("RGB")

        result = run_inference(image)

        return result

    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }
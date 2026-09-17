import os
import torch
import torch.nn as nn
from torchvision import models

# Device
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Base directory
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Model paths
MODEL_A_PATH = os.path.join(BASE_DIR, "model_A_classifier.pth")
MODEL_B_PATH = os.path.join(BASE_DIR, "model_B_stage.pth")
MODEL_C_PATH = os.path.join(BASE_DIR, "model_C_disease.pth")

# Classes
CROP_CLASSES = ['corn', 'cotton', 'paddy', 'wheat']
STAGE_CLASSES = ['early', 'flowering', 'maturity', 'mid']
DISEASE_CLASSES = ['bacterial_blight', 'blast', 'healthy']


def build_resnet18(num_classes):
    model = models.resnet18(weights=None)
    model.fc = nn.Linear(model.fc.in_features, num_classes)
    return model


def load_model(path, num_classes):
    model = build_resnet18(num_classes)
    state_dict = torch.load(path, map_location=DEVICE)
    model.load_state_dict(state_dict)
    model.to(DEVICE)
    model.eval()
    return model


print("Loading AI Models...")

crop_model = load_model(MODEL_A_PATH, len(CROP_CLASSES))
stage_model = load_model(MODEL_B_PATH, len(STAGE_CLASSES))
disease_model = load_model(MODEL_C_PATH, len(DISEASE_CLASSES))

print("All models loaded successfully.")
import os
import torch
from flask import Flask
from flask_cors import CORS
from api.config import Config
from logging.config import dictConfig
from transformers import BlipProcessor, BlipForConditionalGeneration, BlipConfig


dictConfig(Config.LOGGING_CONFIG)

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")

checkpoint = torch.load(os.path.join(app.config.get("MODEL_DIR"), "blip_quantized_with_config.pth"))
model = BlipForConditionalGeneration(BlipConfig.from_dict(checkpoint["config"].to_dict()))
model.load_state_dict(checkpoint["model_state_dict"], strict=False)
model.eval()

from api import routes
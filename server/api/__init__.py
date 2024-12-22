from flask import Flask
from flask_cors import CORS
from api.config import Config
from logging.config import dictConfig
from torchvision.models import mobilenet_v3_small
from transformers import T5Tokenizer, T5ForConditionalGeneration

dictConfig(Config.LOGGING_CONFIG)

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

mobilenet_v3_model = mobilenet_v3_small(weights=MobileNet_V3_Small_Weights.IMAGENET1K_V1)
tokenizer = T5Tokenizer.from_pretrained("google-t5/t5-small")
decoder = T5ForConditionalGeneration.from_pretrained("google-t5/t5-small")

from api import routes

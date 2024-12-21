from flask import Flask
from flask_cors import CORS
from api.config import Config
from logging.config import dictConfig

dictConfig(Config.LOGGING_CONFIG)

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

from api import routes
import os
from dotenv import load_dotenv

base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
load_dotenv(dotenv_path=os.path.join(base_dir, '.env'))

class Config:
    IMAGE_DIR = os.path.join(base_dir, 'uploads', 'images')
    MAX_IMAGE_SIZE = 7 * 1024 * 1024 # 7MB
    ALLOWED_EXTENSIONS = os.environ.get('ALLOWED_EXTENSIONS', ['jpeg', 'jpg', 'png'])
    LOGGING_CONFIG = {
        'version': 1,
        'formatters': {'default': {
            'format': '[%(asctime)s] %(levelname)s in %(module)s: %(message)s',
        }},
        'handlers': {'wsgi': {
            'class': 'logging.StreamHandler',
            'stream': 'ext://flask.logging.wsgi_errors_stream',
            'formatter': 'default'
        }},
        'root': {
            'level': 'INFO',
            'handlers': ['wsgi']
        }
    }
from flask import jsonify, request
from api import app
from api.utils.inference import infer
from api.errors import handle_exception, bad_request
from api.utils.image_processing import validate_image, save_image, del_image

IMAGE_DIR = app.config.get('IMAGE_DIR')
MAX_IMAGE_SIZE = app.config.get('MAX_IMAGE_SIZE')
ALLOWED_EXTENSION = app.config.get('ALLOWED_EXTENSIONS')

@app.route('/', methods=['POST'])
def get_image_caption():
    """Endpoint for inference"""
    try:
        image = request.files.get('image')

        if not image:
            return bad_request("No image provided")
        
        try:
            _ = validate_image(image, MAX_IMAGE_SIZE, ALLOWED_EXTENSION)
        except ValueError as ve:
            app.logger.error("Error while validating image: %s", ve)
            return bad_request(ve)
        
        img_path = save_image(image, IMAGE_DIR)

        generated_caption = infer(img_path)

        try:
            del_image(img_path)
        except ValueError as ve:
            app.logger.error("Image does not exists")

        # not stopping execution even if the file is not deleted

        return jsonify({ "caption": generated_caption })

    except Exception as e:
        app.logger.error("Error in inference endpoint: %s", e)
        return handle_exception(e)
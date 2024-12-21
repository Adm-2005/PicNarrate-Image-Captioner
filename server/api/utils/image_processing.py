import os
import uuid
import imghdr
from PIL import Image
from typing import List
from werkzeug.utils import secure_filename

def validate_image(image, max_file_size: int, allowed_extensions: List[str]) -> bool:
    """
    Validates the image received in input

    Args
        image: raw image file
        max_file_size: maximum limit on file size
        allowed_extensions: allowed file types
        
    Returns 
        [bool]: 'True' if the input is valid
    
    Raises
        ValueError: raised when image does not meets constraints
    """
    allowed_filename = '.' in image.filename and image.filename.rsplit('.', 1)[1].lower() in allowed_extensions

    if not allowed_filename:
        raise ValueError("Image type not allowed.")

    if image.content_length > max_file_size:
        raise ValueError("Image exceeds maximum limit.")

    if not image.filename:
        raise ValueError("No selected file.")

    return True

def save_image(image, image_dir: str) -> str:
    """
    Saves the image received and return the path

    Args
        image: raw image file
        image_dir: directory where image is to be saved

    Returns
        [str]: path of the saved image file
    """
    os.makedirs(image_dir, exist_ok=True)
    image_path = os.path.join(image_dir, secure_filename(image.filename))

    if os.path.exists(image_path):
        base, ext = os.path.splitext(image_path)
        image_path = f"{base}_{uuid.uuid4()}{ext}"
    
    image.save(image_path)
    
    return image_path

def del_image(image_path: str) -> None:
    """
    Deletes the image stored at the given path

    Args
        image_path: path to the image file

    Raises
        ValueError: raised when image with the given path does not exists
    """
    try:
        if os.path.exists(image_path):
            os.remove(image_path)   
        else:
            raise ValueError("Image does not exists")     
    except Exception as e:
        raise e
from imagekitio import ImageKit
import os
from dotenv import load_dotenv

load_dotenv(dotenv_path="../.env")

imagekit = ImageKit(
    private_key=os.getenv("IMAGEKIT_PRIVATE_KEY"),
)

def upload_file(file_bytes, file_name, category):
    result = imagekit.files.upload(
        file=file_bytes,
        file_name=file_name,
        folder=f"/chatvault/{category}",
        is_private_file=False
    )
    return result.url, result.file_id

def delete_file(file_id):
    imagekit.files.delete(file_id)
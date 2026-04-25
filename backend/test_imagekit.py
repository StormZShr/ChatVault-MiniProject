from imagekit_utils import upload_file
with open("test.jpg", "rb") as f:
    file_bytes = f.read()
url, file_id = upload_file(file_bytes, "test.jpg", "test_category")
print("File uploaded successfully!")
print(f"URL: {url}")
print(f"File ID: {file_id}")
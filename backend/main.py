from fastapi import FastAPI, UploadFile, File, Form, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
from database import Base, engine, get_db
from models import Media
from schemas import MediaOut
from imagekit_utils import upload_file, delete_file

Base.metadata.create_all(bind=engine)

app = FastAPI(title="ChatVault API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

CATEGORIES = ["notes", "information", "funny"]
MAX_FILE_SIZE = 10 * 1024 * 1024

@app.get("/categories")
def get_categories():
    return CATEGORIES

@app.get("/media", response_model=List[MediaOut])
def get_media(category: str, db: Session = Depends(get_db)):
    if category not in CATEGORIES:
        raise HTTPException(status_code=400, detail="Invalid category")
    return db.query(Media).filter(Media.category == category).order_by(Media.uploaded_at.desc()).all()

@app.post("/upload")
async def upload_media(
    files: List[UploadFile] = File(...),
    category: str = Form(...),
    uploader: str = Form(...),
    db: Session = Depends(get_db)
):
    if category not in CATEGORIES:
        raise HTTPException(status_code=400, detail="Invalid category")

    uploaded = []
    for file in files:
        contents = await file.read()

        if len(contents) > MAX_FILE_SIZE:
            raise HTTPException(status_code=400, detail=f"{file.filename} exceeds 10MB limit")

        url, file_id = upload_file(contents, file.filename, category)

        record = Media(
            filename=file.filename,
            category=category,
            media_url=url,
            file_id=file_id,
            uploader=uploader
        )
        db.add(record)
        db.commit()
        uploaded.append({"filename": file.filename, "url": url})

    return {"uploaded": uploaded}

@app.delete("/media/{id}")
def delete_media(id: int, db: Session = Depends(get_db)):
    record = db.query(Media).filter(Media.id == id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Media not found")
    delete_file(record.file_id)
    db.delete(record)
    db.commit()
    return {"message": "Deleted successfully"}

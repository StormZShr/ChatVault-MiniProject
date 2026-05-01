from fastapi import FastAPI, UploadFile, File, Form, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
from database import Base, engine, get_db
from models import Media, User
from schemas import MediaOut
from imagekit_utils import upload_file, delete_file
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from auth import hash_password, verify_password, create_token, decode_token
from jose import JWTError

Base.metadata.create_all(bind=engine)

app = FastAPI(title="ChatVault API")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"]
)

CATEGORIES = ["notes", "information", "funny"]
MAX_FILE_SIZE = 10 * 1024 * 1024

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        payload = decode_token(token)
        username = payload.get("sub")
        user = db.query(User).filter(User.username == username).first()
        if not user:
            raise HTTPException(status_code=401, detail="Invalid token")
        return user
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

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
    current_user: User = Depends(get_current_user),
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
            uploader=current_user.username
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

@app.post("/register")
def register(username: str = Form(...), password: str = Form(...), db: Session = Depends(get_db)):
    if db.query(User).filter(User.username == username).first():
        raise HTTPException(status_code=400, detail="Username already taken")
    user = User(username=username, hashed_password=hash_password(password))
    db.add(user)
    db.commit()
    return {"message": "Registered successfully"}

@app.post("/login")
def login(form: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == form.username).first()
    if not user or not verify_password(form.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_token({"sub": user.username})
    return {"access_token": token, "token_type": "bearer"}
from pydantic import BaseModel
from datetime import datetime

class MediaOut(BaseModel):
    id: int
    filename: str
    category: str
    media_url: str
    file_id: str
    uploader: str
    uploaded_at: datetime

    class Config:
        from_attributes = True
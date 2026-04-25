from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime
from database import Base

class Media(Base):
    __tablename__ = "media"
    
    id = Column(Integer, primary_key=True, index=True)
    filename = Column(Text)
    category = Column(String)
    media_url = Column(Text)
    file_id = Column(Text)
    uploader = Column(String)
    uploaded_at = Column(DateTime, default=datetime.utcnow)
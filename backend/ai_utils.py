import os
import io
from PIL import Image
from google import genai
from dotenv import load_dotenv

load_dotenv(dotenv_path="../.env")

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def categorize_image(file_bytes: bytes) -> str:
    try:
        image = Image.open(io.BytesIO(file_bytes))
        
        prompt = """
        You are an automated file sorter. Categorize this image into one of three buckets:
        1. notes (handwritten text, whiteboards, notebook pages, study materials)
        2. information (announcements, schedules, charts, generic screenshots)
        3. funny (memes, jokes, casual photos of friends)
        
        Respond with exactly ONE word from the list above. No punctuation, no explanation.
        """
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=[prompt, image]
        )
        
        result = response.text.strip().lower()
        print(f"🧠 Gemini Output: '{result}'")
        
        if "notes" in result:
            return "notes"
        elif "funny" in result:
            return "funny"
        else:
            return "information"
            
    except Exception as e:
        print(f"🛑 AI CRASH: {e}")
        return "information"
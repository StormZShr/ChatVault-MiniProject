from database import engine

try:
    with engine.connect() as conn:
        print("Database Connected successfully")
except Exception as e:
    print(f"Connection Failed {e}")
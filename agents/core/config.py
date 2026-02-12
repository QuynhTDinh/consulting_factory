import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
if not os.getenv("GOOGLE_API_KEY"):
    load_dotenv(os.path.join(os.getcwd(), "backend", ".env"))

class Config:
    GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
    MODEL_NAME = "gemini-2.0-flash"

    @staticmethod
    def validate():
        if not Config.GOOGLE_API_KEY:
            raise ValueError("GOOGLE_API_KEY environment variable is missing.")

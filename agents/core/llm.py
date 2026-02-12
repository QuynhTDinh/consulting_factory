import json
import google.generativeai as genai
from agents.core.config import Config

class GeminiClient:
    def __init__(self):
        Config.validate()
        genai.configure(api_key=Config.GOOGLE_API_KEY)
        self.model = genai.GenerativeModel(Config.MODEL_NAME)

    def generate(self, prompt: str) -> str:
        """Generates content from the model."""
        try:
            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            print(f"Error calling Gemini: {e}")
            raise e

    def generate_json(self, prompt: str) -> dict:
        """Generates content and parses it as JSON."""
        raw_content = self.generate(prompt)
        return self._clean_and_parse_json(raw_content)

    def _clean_and_parse_json(self, raw_content: str) -> dict:
        """Cleans markdown formatting and parses JSON."""
        content = raw_content.strip()
        if content.startswith("```json"):
            content = content[7:]
        if content.endswith("```"):
            content = content[:-3]
        return json.loads(content)

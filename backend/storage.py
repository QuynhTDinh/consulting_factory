import os
import json
from datetime import datetime
from typing import List, Optional
from backend.schemas import CaseStudy, Analysis

DATA_DIR = os.path.join(os.getcwd(), "data", "cases")

# Ensure data directory exists
os.makedirs(DATA_DIR, exist_ok=True)

def save_case(case: CaseStudy) -> str:
    """Saves a CaseStudy object to a JSON file."""
    file_path = os.path.join(DATA_DIR, f"{case.id}.json")
    
    # Add timestamp if not present (extending the schema implicitly for file storage)
    case_data = case.dict()
    case_data["created_at"] = datetime.now().isoformat()
    
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(case_data, f, ensure_ascii=False, indent=2)
    
    return case.id

def list_cases() -> List[dict]:
    """Returns a list of case summaries (id, title, created_at)."""
    cases = []
    if not os.path.exists(DATA_DIR):
        return []
        
    for filename in os.listdir(DATA_DIR):
        if filename.endswith(".json"):
            file_path = os.path.join(DATA_DIR, filename)
            try:
                with open(file_path, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    cases.append({
                        "id": data.get("id"),
                        "title": data.get("title"),
                        "created_at": data.get("created_at", ""),
                        "insight_truth": data.get("analysis", {}).get("decoder", {}).get("insight", {}).get("truth", "")
                    })
            except Exception as e:
                print(f"Error reading {filename}: {e}")
                
    # Sort by created_at desc
    cases.sort(key=lambda x: x["created_at"], reverse=True)
    return cases

def get_case(case_id: str) -> Optional[CaseStudy]:
    """Retrieves a full CaseStudy by ID."""
    file_path = os.path.join(DATA_DIR, f"{case_id}.json")
    if not os.path.exists(file_path):
        return None
        
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            data = json.load(f)
            # Remove extra fields not in Pydantic model if necessary, or just let Pydantic ignore extras
            return CaseStudy(**data)
    except Exception as e:
        print(f"Error loading case {case_id}: {e}")
        return None

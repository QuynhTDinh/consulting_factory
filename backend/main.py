from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from backend.schemas import AnalyzeRequest, AnalyzeResponse
from backend.services import analyze_case

# Load environment variables
load_dotenv(dotenv_path="backend/.env")

app = FastAPI()

# Configure CORS for frontend access
# CORS Configuration
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://consulting-factory.vercel.app",
    "https://consulting-factory-git-main-quynhtdinhs-projects.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"status": "ok", "message": "Consulting Factory AI Backend is running"}

@app.post("/analyze", response_model=AnalyzeResponse)
async def analyze_endpoint(request: AnalyzeRequest):
    try:
        case_study = analyze_case(request.input_text)
        return AnalyzeResponse(case_study=case_study)
    except ValueError as e:
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal Server Error")

@app.get("/cases")
async def list_cases_endpoint():
    try:
        from backend.storage import list_cases
        return list_cases()
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal Server Error")

@app.get("/cases/{case_id}", response_model=AnalyzeResponse)
async def get_case_endpoint(case_id: str):
    try:
        from backend.storage import get_case
        case = get_case(case_id)
        if not case:
            raise HTTPException(status_code=404, detail="Case not found")
        return AnalyzeResponse(case_study=case)
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal Server Error")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

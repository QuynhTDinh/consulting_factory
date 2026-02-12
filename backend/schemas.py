from typing import List, Optional, Union
from pydantic import BaseModel, Field

# --- Enums & Helpers ---

class QuizType(str):
    SINGLE_CHOICE = "single-choice"
    MULTI_CHOICE = "multi-choice"
    TRUE_FALSE = "true-false"

class Difficulty(str):
    EASY = "easy"
    MEDIUM = "medium"
    HARD = "hard"

# --- Quiz Models ---

class QuizContext(BaseModel):
    image: Optional[str] = None
    text: Optional[str] = None

class QuizItem(BaseModel):
    id: str
    type: str = Field(..., description="Type of quiz: single-choice, multi-choice, true-false")
    question: str
    options: List[str]
    correctAnswer: Union[int, List[int]]  # Index or list of indices
    explanation: str
    context: Optional[QuizContext] = None
    difficulty: Optional[str] = "medium"

# --- New Deep Framework Models ---

class InputClassification(BaseModel):
    data: List[str]
    doing: List[str]
    interpretation: List[str]

class ContextGame(BaseModel):
    gameName: str
    unwrittenRules: List[str]
    winCriteria: str

# --- Empathy Map Models ---

class EmpathyMap(BaseModel):
    see: str
    hear: str
    say_and_do: str
    think_and_feel: str
    pain: str
    gain: str

# --- Analysis Sub-Models ---

class FactGuard(BaseModel):
    status: str
    facts: List[str]

class Jobs(BaseModel):
    functional: str
    emotional: str
    social: str

class Insight(BaseModel):
    context: str
    doing: str
    tension: str
    truth: str

class Decoder(BaseModel):
    jobs: Jobs
    tension: str
    insight: Insight

class MicroLesson(BaseModel):
    concept: str
    source: str
    misconception: str
    example: str

class ScriptLine(BaseModel):
    role: str
    text: str

class Builder(BaseModel):
    microLesson: MicroLesson
    quizzes: List[QuizItem]
    script: List[ScriptLine]

class Analysis(BaseModel):
    factGuard: FactGuard
    inputClassification: Optional[InputClassification] = None
    contextGame: Optional[ContextGame] = None
    empathyMap: Optional[EmpathyMap] = None
    decoder: Decoder
    builder: Builder

# --- Main Case Study Model ---

class CaseStudy(BaseModel):
    id: str
    title: str
    input: str
    analysis: Analysis

# --- API Request/Response ---

class AnalyzeRequest(BaseModel):
    input_text: str

class AnalyzeResponse(BaseModel):
    case_study: CaseStudy

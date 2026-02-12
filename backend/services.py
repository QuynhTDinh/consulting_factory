from backend.schemas import CaseStudy
from agents.workflows.consulting_analysis import ConsultingAnalysisWorkflow

def analyze_case(input_text: str) -> CaseStudy:
    """
    Analyzes a case using the modular ConsultingAnalysisWorkflow.
    """
    workflow = ConsultingAnalysisWorkflow()
    try:
        return workflow.run(input_text)
    except Exception as e:
        print(f"Error in ConsultingAnalysisWorkflow: {e}")
        raise e

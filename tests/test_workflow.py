
import sys
import os

# Add root to python path
sys.path.append(os.getcwd())

from agents.workflows.consulting_analysis import ConsultingAnalysisWorkflow

def test_workflow():
    workflow = ConsultingAnalysisWorkflow()
    input_text = "Khách hàng là chị Lan, 35 tuổi, muốn mua bảo hiểm nhân thọ cho con nhưng sợ bị lừa. Thu nhập 20 triệu/tháng."
    
    print(f"Testing workflow with input: {input_text}")
    try:
        case = workflow.run(input_text)
        print("\n--- Workflow Execution Successful ---")
        print(f"Case ID: {case.id}")
        print(f"Title: {case.title}")
        print(f"Insight Truth: {case.analysis.decoder.insight.truth}")
        print(f"Micro-Lesson Concept: {case.analysis.builder.microLesson.concept}")
        
        # Verify file existence
        file_path = os.path.join(os.getcwd(), "data", "cases", f"{case.id}.json")
        if os.path.exists(file_path):
            print(f"Storage verified: File exists at {file_path}")
        else:
            print("Storage failed: File not found")
            
    except Exception as e:
        print(f"Workflow failed: {e}")
        raise e

if __name__ == "__main__":
    test_workflow()

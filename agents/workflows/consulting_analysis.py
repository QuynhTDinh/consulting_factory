import uuid
from agents.workflows.base_workflow import BaseWorkflow
from backend.schemas import CaseStudy, Analysis, FactGuard, InputClassification, ContextGame, Decoder, EmpathyMap, Builder

# Skills (Skill-in-a-Box)
from agents.skills.input_parser import InputParserSkill
from agents.skills.context_game import ContextGameSkill
from agents.skills.insight_decoder import InsightDecoderSkill
from agents.skills.empathy_map import EmpathyMapSkill
from agents.skills.instruction_builder import InstructionBuilderSkill

class ConsultingAnalysisWorkflow(BaseWorkflow):
    def __init__(self):
        super().__init__()
        # Define the Linear Pipeline
        self.add_step(InputParserSkill())
        self.add_step(ContextGameSkill())
        self.add_step(InsightDecoderSkill())
        self.add_step(EmpathyMapSkill())
        self.add_step(InstructionBuilderSkill())

    def run(self, input_text: str) -> CaseStudy:
        print(f"Workflow: Starting analysis for '{input_text[:20]}...'")
        
        # Initial Context
        initial_context = {'input_text': input_text}
        
        # Run Pipeline (BaseWorkflow handles execution loop)
        final_context = super().run(initial_context)
        
        # Aggregation (Map Context back to Schema)
        # Note: Skills return dicts that update context directly.
        # We assume keys match schema requirements or skill output matches expectations.
        
        # Create Analysis Object ensuring correct types
        analysis = Analysis(
            factGuard=FactGuard(**final_context.get('factGuard', {})),
            inputClassification=InputClassification(**final_context.get('inputClassification', {})),
            contextGame=ContextGame(**final_context.get('contextGame', {})),
            decoder=Decoder(**final_context.get('decoder', {})),
            empathyMap=EmpathyMap(**final_context.get('empathyMap', {})),
            builder=Builder(**final_context.get('builder', {}))
        )
        
        # Create CaseStudy
        case_id = f"case_{uuid.uuid4().hex[:8]}"
        case_study = CaseStudy(
            id=case_id,
            title=f"Case Study: {input_text[:50]}...",
            input=input_text,
            analysis=analysis
        )
        
        # Save to Storage
        from backend.storage import save_case
        save_case(case_study)
        print(f"Workflow: Case saved with ID {case_id}")
        
        return case_study

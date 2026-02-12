from abc import ABC
from typing import Any, List, Dict
from agents.skills.base_skill import BaseSkill

class BaseWorkflow(ABC):
    """
    Abstract Base Class for Linear Workflows.
    Orchestrates a sequence of Skills using a shared context.
    """
    
    def __init__(self):
        self.steps: List[BaseSkill] = []
    
    def add_step(self, skill: BaseSkill):
        """Adds a skill to the pipeline."""
        self.steps.append(skill)
        
    def run(self, initial_context: Dict[str, Any]) -> Dict[str, Any]:
        """
        Executes the workflow pipeline.
        :param initial_context: Starting data.
        :return: Final context after all steps.
        """
        context = initial_context.copy()
        print(f"Workflow Started with {len(self.steps)} steps.")
        
        for step in self.steps:
            print(f"Workflow: Running step {step.name}...")
            try:
                # Skill returns ONLY new data to merge
                new_data = step.execute(context)
                if new_data:
                    context.update(new_data)
            except Exception as e:
                print(f"Workflow Error at step {step.name}: {e}")
                raise e
                
        print("Workflow Finished.")
        return context

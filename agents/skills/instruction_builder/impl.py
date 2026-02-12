import sys
from typing import Dict, Any
from agents.skills.base_skill import BaseSkill

class InstructionBuilderSkill(BaseSkill):
    def execute(self, context: Dict[str, Any]) -> Dict[str, Any]:
        """
        Reads 'input_text' and 'decoder' (for insight truth) from context.
        Returns 'builder'.
        """
        input_text = context.get('input_text')
        insight_data = context.get('decoder', {})
        
        if not input_text:
            raise ValueError("InstructionBuilderSkill requires 'input_text' in context.")

        # Safely extract truth
        try:
            insight_truth = insight_data['insight']['truth']
        except KeyError:
            insight_truth = "Analysis data unavailable"

        template = self.load_template("default.txt")
        prompt = template.format(
            input_text=input_text,
            insight_truth=insight_truth
        )
        
        return self.llm.generate_json(prompt)

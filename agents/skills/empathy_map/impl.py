import sys
from typing import Dict, Any
from agents.skills.base_skill import BaseSkill

class EmpathyMapSkill(BaseSkill):
    def execute(self, context: Dict[str, Any]) -> Dict[str, Any]:
        """
        Reads 'input_text' from context.
        Returns 'empathyMap'.
        """
        input_text = context.get('input_text')
        if not input_text:
            raise ValueError("EmpathyMapSkill requires 'input_text' in context.")

        template = self.load_template("default.txt")
        prompt = template.format(input_text=input_text)
        
        return self.llm.generate_json(prompt)

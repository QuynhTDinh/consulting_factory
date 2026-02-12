import sys
import json
from typing import Dict, Any
from agents.skills.base_skill import BaseSkill

class InsightDecoderSkill(BaseSkill):
    def execute(self, context: Dict[str, Any]) -> Dict[str, Any]:
        """
        Reads 'input_text' and 'contextGame' from context.
        Returns 'decoder'.
        """
        input_text = context.get('input_text')
        if not input_text:
            raise ValueError("InsightDecoderSkill requires 'input_text' in context.")
            
        context_game = json.dumps(context.get('contextGame', {}), ensure_ascii=False)

        template = self.load_template("default.txt")
        prompt = template.format(
            input_text=input_text,
            context_game=context_game
        )
        
        return self.llm.generate_json(prompt)

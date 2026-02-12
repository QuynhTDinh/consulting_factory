import os
import sys
from abc import ABC, abstractmethod
from typing import Any, Dict, Optional

class BaseSkill(ABC):
    """
    Abstract Base Class for all Skills (Skill-in-a-Box pattern).
    """
    
    def __init__(self, llm_client=None):
        from agents.core.llm import GeminiClient
        self.llm = llm_client or GeminiClient()
        self.name = self.__class__.__name__

    def load_template(self, template_name: str = "default.txt") -> str:
        """Loads a prompt template from the skills 'templates' directory."""
        # Assume directory structure: .../skills/<skill_name>/impl.py
        # We want .../skills/<skill_name>/templates/<template_name>
        skill_dir = os.path.dirname(os.path.abspath(sys.modules[self.__module__].__file__))
        template_path = os.path.join(skill_dir, "templates", template_name)
        
        try:
            with open(template_path, "r", encoding="utf-8") as f:
                return f.read()
        except FileNotFoundError:
            raise FileNotFoundError(f"Template not found at {template_path}")

    @abstractmethod
    def execute(self, context: Dict[str, Any]) -> Dict[str, Any]:
        """
        Executes the skill's logic.
        :param context: The shared context dictionary.
        :return: A dictionary of new data to merge into the context.
        """
        pass

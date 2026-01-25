from pydantic import BaseModel
from typing import List

class DecisionResult(BaseModel):
    option_id: str
    ssi: float
    confidence: str
    risks: List[str]

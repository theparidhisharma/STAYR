from pydantic import BaseModel
from typing import List

class AgentInput(BaseModel):
    client_budget: float
    requires_refundability: bool
    credit_limit: float
    urgency_level: int
    current_credit_used: float

class BookingOption(BaseModel):
    option_id: str
    price: float
    refundable: bool
    supplier_reliability: float
    operational_effort: int

class EvaluatedOption(BaseModel):
    option_id: str
    bsi: float
    conflicts: List[str]
    decision: str
    risk_nudge: str
    explanation: str

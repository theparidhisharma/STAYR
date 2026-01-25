from pydantic import BaseModel

class AgentConstraints(BaseModel):
    max_budget: float
    refundable_required: bool
    urgency: int

class ClientProfile(BaseModel):
    cancellation_rate: float

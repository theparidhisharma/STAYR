from pydantic import BaseModel

class InventoryOption(BaseModel):
    id: str
    price: float
    refundable: bool
    supplier: str
    supplier_reliability: float
    operational_effort: int

from app.core.stability import compute_ssi
from app.models.agent import AgentConstraints, ClientProfile
from app.models.inventory import InventoryOption
from app.utils.scoring import Weights

def test_ssi_decreases_when_over_budget():
    option = InventoryOption(
        id="H1",
        price=12000,
        refundable=True,
        supplier="A",
        supplier_reliability=0.9,
        operational_effort=1
    )

    constraints = AgentConstraints(
        max_budget=8000,
        refundable_required=True,
        urgency=3
    )

    client = ClientProfile(cancellation_rate=0.1)

    ssi = compute_ssi(option, constraints, client, Weights)

    assert ssi < 70

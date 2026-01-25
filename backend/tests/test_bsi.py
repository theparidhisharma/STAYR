from backend.app.domain.bsi import calculate_bsi
from backend.app.schemas import AgentInput, BookingOption



def test_credit_penalty():
    option = BookingOption(
        option_id="TEST_OPTION",
        price=100000,
        refundable=True,
        supplier_reliability=0.8,
        operational_effort=3
    )

    tight_credit_constraints = AgentInput(
        client_budget=120000,
        requires_refundability=True,
        credit_limit=110000,
        current_credit_used=95000,
        urgency_level=5
    )

    relaxed_credit_constraints = AgentInput(
        client_budget=120000,
        requires_refundability=True,
        credit_limit=200000,
        current_credit_used=20000,
        urgency_level=5
    )

    bsi_high_credit_stress = calculate_bsi(
        option, tight_credit_constraints, []
    )

    bsi_low_credit_stress = calculate_bsi(
        option, relaxed_credit_constraints, []
    )

    assert bsi_high_credit_stress < bsi_low_credit_stress

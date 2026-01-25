from backend.app.schemas import AgentInput, BookingOption
from backend.app.agent.state import AgentState
from backend.app.agent.evaluator import evaluate_options
from backend.app.agent.comparator import select_best_option
from backend.app.agent.whatif import simulate_budget_change
from backend.app.agent.output_builder import build_final_output
import json


constraints = AgentInput(
    client_budget=120000,
    requires_refundability=True,
    credit_limit=130000,
    current_credit_used=100000,  # <-- VERY tight
    urgency_level=8
)


options = [
    BookingOption(
        option_id="HILTON_A",
        price=115000,
        refundable=False,
        supplier_reliability=0.85,
        operational_effort=4
    ),
    BookingOption(
        option_id="MARRIOTT_B",
        price=118000,
        refundable=True,
        supplier_reliability=0.75,
        operational_effort=3
    ),
    BookingOption(
        option_id="LOCAL_C",
        price=98000,
        refundable=False,
        supplier_reliability=0.55,
        operational_effort=6
    )
]

what_if = simulate_budget_change(
    constraints,
    options,
    delta_percent=5
)

print("\nWHAT-IF: Budget +5%\n")
print(what_if["recommended_option"])

agent = AgentState(constraints)
evaluate_options(agent, options)
select_best_option(agent)

print("\nFINAL AGENT OUTPUT\n")
print(agent.final_recommendation)
print("\nFULL EVALUATION\n")
for e in agent.evaluations:
    print(e)

final_output = build_final_output(agent)

print("\nFINAL OUTPUT (FRONTEND READY)\n")
print(json.dumps(final_output, indent=2))

from backend.app.domain.credit import credit_stress
from backend.app.domain.policy import POLICY

def calculate_bsi(option, constraints, conflicts, trace):
    score = POLICY["bsi"]["base_score"]

    if not option.refundable:
        score -= POLICY["bsi"]["penalties"]["non_refundable"]

    budget_slack = constraints.client_budget - option.price
    if budget_slack < 0:
        score -= POLICY["bsi"]["penalties"]["budget_overflow"]
    elif budget_slack < constraints.client_budget * 0.1:
        score -= POLICY["bsi"]["penalties"]["low_budget_slack"]

    credit_status = credit_stress(option.price, constraints)
    credit_penalties = POLICY["credit"]

    if credit_status == "hard_breach":
        score -= credit_penalties["hard_breach_penalty"]
    elif credit_status == "high_stress":
        score -= credit_penalties["high_stress_penalty"]
    elif credit_status == "moderate_stress":
        score -= credit_penalties["moderate_stress_penalty"]

    score += option.supplier_reliability * POLICY["bsi"]["rewards"]["supplier_reliability_weight"]
    score -= option.operational_effort * POLICY["bsi"]["operational_effort_weight"]
    score -= len(conflicts) * POLICY["bsi"]["penalties"]["conflict_penalty"]

    final_score = max(score, 0)

    trace.log("bsi_calculation", {
        "option_id": option.option_id,
        "final_bsi": final_score
    })

    return final_score

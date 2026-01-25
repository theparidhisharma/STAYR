from fastapi import APIRouter
from backend.app.domain.constraints import validate_constraints
from backend.app.domain.conflicts import detect_conflicts
from backend.app.domain.bsi import calculate_bsi
from backend.app.domain.decision import make_decision
from backend.app.domain.nudges import risk_nudge
from backend.app.copilot.explain import generate_explanation

router = APIRouter()

@router.post("/evaluate")
def evaluate(constraints, options):
    errors = validate_constraints(constraints)
    if errors:
        return {"errors": errors}

    results = []

    for option in options:
        conflicts = detect_conflicts(option, constraints)
        bsi = calculate_bsi(option, constraints, conflicts)
        decision = make_decision(bsi, conflicts)
        nudge = risk_nudge(bsi)

        explanation = generate_explanation(
            type("Eval", (), {
                "bsi": bsi,
                "conflicts": conflicts,
                "decision": decision,
                "risk_nudge": nudge
            })
        )

        confirmed = {
            "option_id": option.option_id,
            "bsi": bsi,
            "conflicts": conflicts,
            "decision": decision,
            "risk_nudge": nudge,
            "explanation": explanation
        }

        results.append(confirmed)

    return sorted(results, key=lambda x: x["bsi"], reverse=True)

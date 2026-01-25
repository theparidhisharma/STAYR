from backend.app.domain.conflicts import detect_conflicts
from backend.app.domain.bsi import calculate_bsi
from backend.app.domain.decision import make_decision
from backend.app.domain.nudges import risk_nudge

def evaluate_options(agent_state, options):
    for option in options:
        conflicts = detect_conflicts(option, agent_state.constraints, agent_state.trace)
        bsi = calculate_bsi(option, agent_state.constraints, conflicts, agent_state.trace)
        decision = make_decision(bsi, conflicts)

        agent_state.add_evaluation({
            "option_id": option.option_id,
            "bsi": bsi,
            "conflicts": conflicts,
            "decision": decision,
            "risk_nudge": risk_nudge(bsi),
            "raw": option
        })

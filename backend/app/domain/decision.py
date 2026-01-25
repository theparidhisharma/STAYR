from backend.app.domain.policy import POLICY

def make_decision(bsi, conflicts):
    if bsi < POLICY["decision_thresholds"]["reject_bsi_below"]:
        return "Reject"

    if len(conflicts) > POLICY["decision_thresholds"]["reject_conflicts_above"]:
        return "Reject"

    return "Rank"

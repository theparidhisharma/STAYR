def detect_conflicts(constraints):
    conflicts = []

    if constraints.max_budget < 7000 and constraints.refundable_required:
        conflicts.append("Budget-refundability conflict")

    if constraints.urgency >= 4 and constraints.refundable_required:
        conflicts.append("Urgency-refundability risk")

    return conflicts

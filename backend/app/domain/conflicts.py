from backend.app.domain.credit import credit_stress

def detect_conflicts(option, constraints, trace):
    conflicts = []

    if constraints.requires_refundability and not option.refundable:
        conflicts.append("Refundability required but option is non-refundable")

    if constraints.urgency_level >= 8 and option.operational_effort >= 7:
        conflicts.append("High urgency combined with high operational effort")

    credit_status = credit_stress(option.price, constraints)
    if credit_status == "hard_breach":
        conflicts.append("Exceeds remaining agency credit limit")
    elif credit_status == "high_stress":
        conflicts.append("High credit exposure increases reversal risk")

    trace.log("conflict_detection", {
        "option_id": option.option_id,
        "conflicts": conflicts
    })

    return conflicts

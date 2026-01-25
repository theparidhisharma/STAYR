def rejection_reasons(option, constraints):
    reasons = []

    if option.price > constraints.max_budget:
        reasons.append("Budget breach")

    if constraints.refundable_required and not option.refundable:
        reasons.append("Non-refundable")

    if option.supplier_reliability < 0.6:
        reasons.append("Supplier volatility")

    return reasons

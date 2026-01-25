def credit_stress(option_price, constraints):
    remaining_credit = (
        constraints.credit_limit - constraints.current_credit_used
    )

    if option_price > remaining_credit:
        return "hard_breach"

    utilization_ratio = option_price / remaining_credit

    if utilization_ratio > 0.8:
        return "high_stress"
    if utilization_ratio > 0.5:
        return "moderate_stress"

    return "low_stress"

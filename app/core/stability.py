def compute_ssi(option, constraints, client, weights):
    score = 100.0

    # HARD BUDGET BREACH
    if option.price > constraints.max_budget:
        score -= 40  # non-negotiable risk penalty

    # Soft price pressure
    score -= (option.price / constraints.max_budget) * 15 * weights.price

    # Supplier reliability
    score += option.supplier_reliability * 30 * weights.supplier

    # Refundability
    if constraints.refundable_required and not option.refundable:
        score -= 35 * weights.refund

    # Operational + behavioral
    score -= option.operational_effort * 4 * weights.ops
    score -= client.cancellation_rate * 20

    return max(round(score, 2), 0)

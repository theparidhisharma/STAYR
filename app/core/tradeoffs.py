def suggest_tradeoffs(conflicts):
    suggestions = []

    for c in conflicts:
        if "Budget-refundability" in c:
            suggestions.append("Increase budget slightly or relax refundability")
        if "Urgency-refundability" in c:
            suggestions.append("Consider non-refundable premium suppliers")

    return suggestions

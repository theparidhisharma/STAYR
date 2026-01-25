def risk_nudge(bsi):
    if bsi < 50:
        return "High risk booking — consider adjusting constraints"
    if bsi < 70:
        return "Moderate risk — review refund and supplier terms"
    return "Low risk — stable booking"

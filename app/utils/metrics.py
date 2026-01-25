def hallucination_rate(total, failures):
    if total == 0:
        return 0.0
    return round((failures / total) * 100, 2)

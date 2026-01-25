def band(ssi):
    if ssi >= 80:
        return "HIGH"
    if ssi >= 55:
        return "MEDIUM"
    return "LOW"

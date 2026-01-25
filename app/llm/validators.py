FORBIDDEN_TOKENS = ["$", "guaranteed", "always", "never"]

def validate_output(text: str) -> bool:
    lowered = text.lower()
    for token in FORBIDDEN_TOKENS:
        if token in lowered:
            return False
    return True

def validate_constraints(constraints):
    errors = []

    if constraints.client_budget <= 0:
        errors.append("Client budget must be positive")

    if constraints.urgency_level < 1 or constraints.urgency_level > 10:
        errors.append("Urgency level must be between 1 and 10")

    return errors

def update_failure_history(history, booking_outcome):
    if booking_outcome.failed:
        history[booking_outcome.supplier] = history.get(booking_outcome.supplier, 0) + 1
    return history

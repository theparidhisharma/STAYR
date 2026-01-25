from backend.app.domain.decision import make_decision


def test_reject_low_bsi():
    assert make_decision(30, []) == "Reject"

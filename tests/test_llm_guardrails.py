from app.llm.validators import validate_output

def test_validator_blocks_strong_claims():
    text = "This booking is guaranteed and will never fail"
    assert validate_output(text) is False

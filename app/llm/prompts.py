def explanation_prompt(decision):
    return f"""
Explain this decision clearly.

FACTS:
- Option ID: {decision.option_id}
- Stability Score: {decision.ssi}
- Confidence: {decision.confidence}
- Risks: {decision.risks}

Do not invent new facts.
"""

def build_final_output(agent_state):
    ranked = sorted(
        agent_state.evaluations,
        key=lambda x: x["bsi"],
        reverse=True
    )

    recommended = agent_state.final_recommendation

    rejected = [
        {
            "option_id": e["option_id"],
            "bsi": e["bsi"],
            "reasons": e["conflicts"]
        }
        for e in ranked
        if e["decision"] == "Reject"
    ]

    return {
        "recommended_option": {
            "option_id": recommended["option_id"],
            "rationale": recommended["rationale"],
            "confidence_level": (
                "High" if ranked[0]["bsi"] >= 75 else "Moderate"
            )
        },
        "ranked_options": [
            {
                "option_id": e["option_id"],
                "bsi": e["bsi"],
                "risk_nudge": e["risk_nudge"]
            }
            for e in ranked
            if e["decision"] == "Rank"
        ],
        "rejected_options": rejected,
        "decision_trace": agent_state.trace.steps
    }

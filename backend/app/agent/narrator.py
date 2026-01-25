def build_agent_summary(agent_state):
    return {
        "recommended_option": agent_state.final_recommendation,
        "all_options": agent_state.evaluations
    }

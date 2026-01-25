def build_replay_bundle(agent_state, options, policy):
    return {
        "constraints": agent_state.constraints.dict(),
        "options": [o.dict() for o in options],
        "policy": policy,
        "decision_trace": agent_state.trace.steps
    }

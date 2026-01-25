def select_best_option(agent_state):
    ranked = sorted(
        agent_state.evaluations,
        key=lambda x: x["bsi"],
        reverse=True
    )

    best = ranked[0]
    second = ranked[1] if len(ranked) > 1 else None

    rationale = (
        f"Selected {best['option_id']} due to highest stability score "
        f"({best['bsi']})."
    )

    if second:
        rationale += (
            f" Next best option ({second['option_id']}) ranked lower due to "
            f"{', '.join(second['conflicts']) or 'lower overall stability'}."
        )

    agent_state.set_final(best["option_id"], rationale)

    agent_state.trace.log("final_decision", {
        "recommended_option": best["option_id"],
        "bsi": best["bsi"]
    })

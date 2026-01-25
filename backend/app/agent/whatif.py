from copy import deepcopy
from backend.app.agent.evaluator import evaluate_options
from backend.app.agent.comparator import select_best_option
from backend.app.agent.state import AgentState

def simulate_budget_change(constraints, options, delta_percent):
    new_constraints = deepcopy(constraints)
    new_constraints.client_budget *= (1 + delta_percent / 100)

    agent = AgentState(new_constraints)
    evaluate_options(agent, options)
    select_best_option(agent)

    return {
        "new_budget": new_constraints.client_budget,
        "recommended_option": agent.final_recommendation,
        "evaluations": agent.evaluations
    }

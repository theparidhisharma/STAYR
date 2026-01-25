class DecisionTrace:
    def __init__(self):
        self.steps = []

    def log(self, step, data):
        self.steps.append({
            "step": step,
            "data": data
        })


class AgentState:
    def __init__(self, constraints):
        self.constraints = constraints
        self.evaluations = []
        self.final_recommendation = None
        self.trace = DecisionTrace()

    def add_evaluation(self, evaluation):
        self.evaluations.append(evaluation)

    def set_final(self, option_id, rationale):
        self.final_recommendation = {
            "option_id": option_id,
            "rationale": rationale
        }

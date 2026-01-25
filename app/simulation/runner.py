from app.simulation.stress_cases import STRESS_CASES

def run_stress_tests(engine, inventory):
    results = []

    for case in STRESS_CASES:
        result = engine(case, inventory)
        results.append(result)

    return results

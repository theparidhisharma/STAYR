from app.simulation.runner import run_stress_tests

def dummy_engine(case, inventory):
    return {
        "case": case,
        "status": "processed"
    }

inventory = []

results = run_stress_tests(dummy_engine, inventory)

for r in results:
    print(r)

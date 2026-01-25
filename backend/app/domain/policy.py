import yaml
from pathlib import Path

_POLICY_PATH = Path(__file__).resolve().parents[2] / "config" / "decision_policy.yaml"

with open(_POLICY_PATH, "r") as f:
    POLICY = yaml.safe_load(f)

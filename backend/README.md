# TBO Agent Copilot

A stability-first decision support system for B2B travel agents.

## Problem
Travel booking is a constrained decision problem, not a search problem.
Optimizing for cheapest price often leads to cancellations, rework, and credit stress.

## Solution
TBO Agent Copilot evaluates booking options based on:
- Refundability
- Budget slack
- Supplier reliability
- Credit exposure
- Operational effort

The system produces:
- A Booking Stability Index (BSI)
- Explicit conflict detection
- Risk-aware nudges
- Clear agent-facing explanations

## Architecture
AgentInput
→ Constraint Validation
→ Conflict Detection
→ BSI Calculation
→ Decision Engine
→ Explanation Layer
→ Agent Output

## Why No ML?
This system prioritizes explainability, controllability, and trust.
BSI is a relative decision-support metric, not a predictive model.

## Running the Agent (No Server Required)
```bash
PYTHONPATH=backend python backend/scripts/simulate_agent_flow.py

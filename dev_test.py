from app.core.stability import compute_ssi
from app.core.confidence import band
from app.core.rejection import rejection_reasons
from app.feedback.decay import apply_supplier_decay
from app.llm.guarded_llm import guarded_generate
from app.llm.validators import validate_output
from app.utils.scoring import Weights
from app.models.agent import AgentConstraints, ClientProfile
from app.models.inventory import InventoryOption

# ---- SETUP MOCK DATA ----

constraints = AgentConstraints(
    max_budget=9000,
    refundable_required=True,
    urgency=4
)

client = ClientProfile(
    cancellation_rate=0.15
)

option = InventoryOption(
    id="HOTEL_X",
    price=8200,
    refundable=True,
    supplier="FastRooms",
    supplier_reliability=0.75,
    operational_effort=3
)

# ---- CORE ENGINE TEST ----

ssi = compute_ssi(option, constraints, client, Weights)
confidence = band(ssi)
rejections = rejection_reasons(option, constraints)

print("SSI:", ssi)
print("Confidence:", confidence)
print("Rejection reasons:", rejections)

# ---- FEEDBACK LOOP TEST ----

history = {"FastRooms": 3}
option = apply_supplier_decay(option, history)
print("Adjusted supplier reliability:", option.supplier_reliability)

# ---- LLM SAFETY TEST ----

prompt = "Explain decision"
response = guarded_generate(prompt, validate_output)
print("LLM response:", response)

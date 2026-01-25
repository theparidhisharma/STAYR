from fastapi import FastAPI
from backend.app.api.evaluate import router

app = FastAPI(title="TBO Agent Copilot")
app.include_router(router)

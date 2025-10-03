from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

tenders = []

class Tender(BaseModel):
    title: str
    buyer: str

@app.get("/tenders")
def list_tenders():
    return tenders

@app.post("/tenders")
def create_tender(tender: Tender):
    tenders.append(tender.dict())
    return tender

# Healthcheck endpoint
@app.get("/health")
def health():
    return {"status": "ok"}

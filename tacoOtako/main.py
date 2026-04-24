from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"mensaje":"Python funcionando desde VS Code"}
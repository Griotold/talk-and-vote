# pyright: reportMissingImports=false
from fastapi import FastAPI

app = FastAPI()

# @ 는 데코레이터
@app.get("/")
async def root():
    return {"message": "Hello, fastAPI!"}
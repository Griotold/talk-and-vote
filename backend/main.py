# pyright: reportMissingImports=false
import os
import uvicorn
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.database import Base, async_engine
from fastapi.concurrency import asynccontextmanager
from app.routers import user
from app.middleware.token_refresh import TokenRefreshMiddleware

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), "..", ".env"))


@asynccontextmanager
async def lifespan(app: FastAPI):
    print("🚀 Application starting...")
    async with async_engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    print("👋 Application shutting down...")
    await async_engine.dispose()


app = FastAPI(lifespan=lifespan)

app.add_middleware(TokenRefreshMiddleware)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user.router)


if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)

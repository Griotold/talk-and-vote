# pyright: reportMissingImports=false

import uuid
import jwt
from datetime import datetime, timedelta, timezone
from passlib.context import CryptContext
from app.core.settings import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


async def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


async def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def create_token(uid: int, expires_delta: timedelta, **kwargs) -> str:
    to_encode = kwargs.copy()
    expire = datetime.now(timezone.utc) + expires_delta
    to_encode.update({"exp": expire, "uid": uid})
    encoded_jwt = jwt.encode(to_encode, settings.secret_key, algorithm=settings.jwt_algorithm)
    return encoded_jwt

def create_access_token(uid: int) -> str:
    return create_token(uid=uid, expires_delta=settings.access_token_expire)


def create_refresh_token(uid: int) -> str:
    return create_token(
        uid=uid, jti=str(uuid.uuid4()), expires_delta=settings.refresh_token_expire
    )


def decode_token(token: str) -> dict:
    return jwt.decode(
        token,
        settings.secret_key,
        algorithms=[settings.jwt_algorithm],
    )


def verify_token(token: str) -> int:
    payload = decode_token(token)
    return payload.get("uid")
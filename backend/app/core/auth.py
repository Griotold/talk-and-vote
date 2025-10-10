# pyright: reportMissingImports=false

from fastapi import Request, Response, HTTPException
from jwt import ExpiredSignatureError, InvalidTokenError
from app.core.settings import settings
from app.core.jwt_handler import verify_token
from typing import Optional

def set_auth_cookies(response: Response, access_token: str, refresh_token: str) -> None:
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=False,
        samesite="Lax",
        max_age=int(settings.access_token_expire.total_seconds()),
    )
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=False,
        samesite="Lax",
        max_age=int(settings.refresh_token_expire.total_seconds()),
    )
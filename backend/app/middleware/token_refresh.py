# pyright: reportMissingImports=false

# app/middleware/token_refresh.py
from starlette.middleware.base import BaseHTTPMiddleware
from fastapi import Request, Response
from jwt import ExpiredSignatureError, InvalidTokenError
from app.db.database import get_db
from app.core.jwt_handler import verify_token, create_access_token, create_refresh_token
from app.db.crud import UserCrud
from app.core.auth import set_auth_cookies


class TokenRefreshMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        access_token = request.cookies.get("access_token")
        refresh_token = request.cookies.get("refresh_token")
        
        new_access_token = None
        new_refresh_token = None
        
        # 1. access_token 검증
        access_token_valid = False
        if access_token:
            try:
                verify_token(access_token)
                access_token_valid = True
            except ExpiredSignatureError:
                # 만료됨 - refresh 시도
                pass
            except InvalidTokenError:
                # 잘못된 토큰
                pass
        
        # 2. access_token이 만료되었고 refresh_token이 있으면 갱신
        if not access_token_valid and refresh_token:
            try:
                user_id = verify_token(refresh_token)
                
                # 새 토큰 생성
                new_access_token = create_access_token(user_id)
                new_refresh_token = create_refresh_token(user_id)
                
                # DB에 새 refresh_token 저장
                db = None
                try:
                    db = await anext(get_db())
                    await UserCrud.update_refresh_token_by_id(db, user_id, new_refresh_token)
                    await db.commit()
                except Exception as e:
                    if db:
                        await db.rollback()
                    raise
                finally:
                    if db:
                        await db.close()
                
                # request state에 저장 (선택사항 - 라우트에서 사용 가능)
                request.state.user_id = user_id
                
            except (ExpiredSignatureError, InvalidTokenError):
                # refresh_token도 만료됨 - 로그인 필요
                pass
        
        # 3. 라우트 핸들러 실행
        response = await call_next(request)
        
        # 4. 새 토큰이 생성되었으면 쿠키에 설정
        if new_access_token and new_refresh_token:
            set_auth_cookies(response, new_access_token, new_refresh_token)
        
        return response

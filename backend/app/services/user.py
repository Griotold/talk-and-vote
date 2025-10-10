# pyright: reportMissingImports=false

from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException
from app.db.crud import UserCrud
from app.db.models import User
from app.db.schemas.users import UserLogin, UserCreate
from app.core.jwt_handler import (
    create_access_token,
    create_refresh_token,
    get_password_hash,
    verify_password,
)
import logging

logger = logging.getLogger(__name__)


class UserService:

    @staticmethod
    async def signup(db: AsyncSession, user: UserCreate) -> User:
        
        if await UserCrud.get_by_username(db, user.username):
            raise HTTPException(status_code=400, detail="이미 사용 중인 사용자 이름입니다.")
        
        if await UserCrud.get_by_email(db, user.email):
            raise HTTPException(status_code=400, detail="이미 사용 중인 이메일입니다.")
        
        hashed_pw = await get_password_hash(user.password)
        user_info = UserCreate(username=user.username, password=hashed_pw, email=user.email)
        
        try:
            db_user = await UserCrud.create(db, user_info)
            await db.commit()
            await db.refresh(db_user)
            return db_user
    
        except Exception as e:
            # ===== 예상치 못한 시스템 오류 (DB, 네트워크 등) =====
            await db.rollback()
            logger.error(f"Signup failed for user {user.email}: {e}", exc_info=True)
            raise HTTPException(
                status_code=500,
                detail="회원가입 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
            )

    @staticmethod
    async def login(db: AsyncSession, user: UserLogin) -> tuple:
        db_user = await UserCrud.get_by_email(db, user.email)
        if not db_user or not await verify_password(user.password, db_user.password):
            raise HTTPException(status_code=401, detail="잘못된 이메일 또는 비밀번호")
        

        refresh_token = create_refresh_token(db_user.user_id)
        access_token = create_access_token(db_user.user_id)

        updated_user = await UserCrud.update_refresh_token_by_id(db, db_user.user_id, refresh_token)
        await db.commit()
        await db.refresh(updated_user)

        return updated_user, access_token, refresh_token
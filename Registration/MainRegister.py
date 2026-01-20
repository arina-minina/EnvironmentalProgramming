'''
Зелёные - это TO DO
# - это комментарии.
'''
# ❓ здесь мне помогала нейросеть, но я пока совсем не понимаю что тут происхрдит
import re

from fastapi import Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from db.engine import engine
from db.models import User
from passlib.context import CryptContext

from fastapi import FastAPI
from pydantic import BaseModel

from Registration.Exceptions import OriginError, FormatNameError, QualityError, NotFoundUserError, ServerException, \
    RegistrationException

app = FastAPI()


class User(BaseModel):
    name: str
    password: str


async def get_db() -> AsyncSession:
    async with engine() as session:
        yield session


'''
TO DO НА ПОТОМ
Улучшить с диверсификацией
'''


def password_security_check(password) -> bool:
    if len(password) < 8 or not re.search(r"[A-Z]", password) or not re.search(r"[a-z]", password) or not re.search(
            r"\d", password) or not re.search(r"[:@$!%*?&#_-]", password):
        return False
    return True


pwd_context = CryptContext(schemes=["bcrypt"])


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(password: str, hashed: str) -> bool:
    return pwd_context.verify(password, hashed)


@app.post("/auth/register")
async def add_new_user(user: User, db: AsyncSession = Depends(get_db)):
    if not user.name.isalpha():
        raise HTTPException(400, "Имя пользователя может содержать только буквы")

    if not password_security_check(user.password):
        raise HTTPException(400, "Пароль слишком простой")
    result = await db.execute(select(User).where(User.login == user.name))
    if result.scalar_one_or_none():
        raise HTTPException(400, "Это имя пользователя уже занято")

    new_user = User(login=user.name, password=hash_password(user.password), name=user.name)
    db.add(new_user)
    await db.commit()

    return {"status": "registered"}


@app.post("/auth/login")
async def login_user(user: User, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.login == user.name))
    db_user = result.scalar_one_or_none()
    if not db_user:
        raise HTTPException(404, "Пользователь не найден")

    if not verify_password(user.password, db_user.password):
        raise HTTPException(401, "Неверный пароль")

    return {"status": "success"}

'''
Зелёные - это TO DO
# - это комментарии.
'''
import re

import uvicorn
from fastapi import Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select

from db.engine import engine, async_session_maker
from db.models import User
from passlib.context import CryptContext

from fastapi import FastAPI
from schemas import UserSchema, UserEdit

from Registration.Exceptions import OriginError, FormatNameError, QualityError, NotFoundUserError, ServerException, \
    RegistrationException

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Указываем конкретные адреса вместо ["*"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


async def get_db() -> AsyncSession:
    async with async_session_maker() as session:
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


@app.put("/edit-profile")
async def edit_profile(data: UserEdit, db: AsyncSession = Depends(get_db)):
    # TODO 1) Валидация данных, 2) Добавление в бд(У тебя вроде уже прописано). 3) Возвращаешь ошибку/успех
    query = select(User).where(User.id == data.user_id)
    result = await db.execute(query)
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="Пользователь не найден")
    if data.login:
        user.login = data.login
    if data.password:
        if not password_security_check(data.password):
            raise HTTPException(status_code=400, detail="Пароль слишком простой")
        user.password = hash_password(data.password)
    if data.name:
        user.name = data.name
    if data.phone_number:
        user.phone_number = data.phone_number
    if data.email:
        user.email = data.email

    try:
        await db.commit()
    except Exception:
        raise HTTPException(status_code=400, detail="Ошибка сохранения.")

    return {"status": "success", "message": "Профиль обновлен"}


@app.get("/profile")
async def profile(login: str, db: AsyncSession = Depends(get_db)):
    # На входе - логин. (потом регистрационный токен добавим)
    # TODO 1) Найти в бд данные, 2) Сформировать JSON с этими данными 3) Вернуть JSON
    query = select(User).where(User.login == login)
    result = await db.execute(query)
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="Пользователь не найден")
    return {
        "id": user.id,
        "login": user.login,
        "password": user.password,
        "name": user.name,
        "phone_number": user.phone_number,
        "email": user.email
    }


@app.post("/auth/register")
async def add_new_user(user: UserSchema, db: AsyncSession = Depends(get_db)):
    if not user.username.isalpha():
        raise HTTPException(400, "Имя пользователя может содержать только буквы")

    if not password_security_check(user.password):
        raise HTTPException(400, "Пароль слишком простой")
    result = await db.execute(select(User).where(User.login == user.username))
    if result.scalar_one_or_none():
        raise HTTPException(400, "Это имя пользователя уже занято")

    print(user.username)
    new_user = User(login=user.username, password=hash_password(user.password), name=user.username)
    print(new_user.id)
    db.add(new_user)
    await db.commit()

    return {"status": "registered"}  # TODO Поменять на success потом


@app.post("/auth/login")
async def login_user(user: UserSchema, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.login == user.username))
    db_user = result.scalar_one_or_none()
    if not db_user:
        raise HTTPException(404, "Пользователь не найден")

    if not verify_password(user.password, db_user.password):
        raise HTTPException(401, "Неверный пароль")

    return {"status": "success"}


if __name__ == "__main__":
    uvicorn.run(app)

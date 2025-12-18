'''
Зелёные - это TO DO
# - это комментарии.
'''

import re

from fastapi import FastAPI
from pydantic import BaseModel

from Registration.Exceptions import OriginError, FormatNameError, QualityError, NotFoundUserError, ServerException, \
    RegistrationException

app = FastAPI()


class User(BaseModel):
    name: str
    password: str


users = []  # типа БД

'''
TO DO НА ПОТОМ
Улучшить с диверсификацией
'''


def password_security_check(password) -> bool:
    if len(password) < 8 or not re.search(r"[A-Z]", password) or not re.search(r"[a-z]", password) or not re.search(
            r"\d", password) or not re.search(r"[:@$!%*?&#_-]", password):
        return False
    return True


@app.post("/auth/register")
async def add_new_user(user: User) -> User:
    try:
        for us in users:
            if user.name == us.name:
                raise OriginError("Это имя пользователя уже занято.")
        if not user.name.isalpha():
            raise FormatNameError("Имя пользователя может содержать только буквы.")
        if not password_security_check(user.password):
            raise QualityError("Пароль слишком простой.")
    except (OriginError, FormatNameError, QualityError) as e:
        return e.message
    except RegistrationException as e:
        print(e)
    except Exception as e:
        return ServerException(f"Произошла внутренняя ошибка сервера: {e}.")
    else:
        users.append(user)
        return user


@app.get("/auth/login")
async def find_user(user: User) -> User:
    try:
        if user not in users:
            raise NotFoundUserError()
    except NotFoundUserError as e:
        return str(e)
    else:
        return user

from pydantic import BaseModel, Field
from typing import Optional


class UserSchema(BaseModel):
    username: str
    password: str


class UserEdit(BaseModel):
    user_id: int
    login: Optional[str] = Field(None, max_length=50)
    password: Optional[str] = Field(None, min_length=8)
    name: Optional[str] = None
    phone_number: Optional[str] = None
    email: Optional[str] = None

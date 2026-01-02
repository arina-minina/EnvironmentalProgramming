# таблицы
# ❓ реализация статуса пользователя (5, 10-13, 23 строки)
# ❓ реализация платного и бесплатного статуса курса (5, 31-33, 41 строки)
from base import Base
from enum import Enum  # python Enum — задаёт набор допустимых значений
from sqlalchemy import String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship


class UserRole(Enum):
    ADMIN = "admin"
    STUDENT = "student"
    AUTHOR = "author"


class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True)
    # unique=True -> уникальность
    login: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(255), nullable=False)  # хранит хэши паролей
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    status: Mapped[UserRole] = mapped_column(Enum(UserRole), nullable=False, default=UserRole.STUDENT)
    email: Mapped[str] = mapped_column(String(150), unique=True, nullable=True)
    # связь с Course
    connect_course: Mapped[list["Course"]] = relationship("Course", back_populates="author")

    connect_sub: Mapped[list["CourseSubscriptions"]] = relationship("CourseSubscriptions", back_populates="user")


class CourseStatus(Enum):
    PAID = "paid"
    FREE = "free"


class Course(Base):
    __tablename__ = "courses"
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(100), nullable=False)
    description: Mapped[str] = mapped_column(String(500), nullable=False)
    status: Mapped[CourseStatus] = mapped_column(Enum(CourseStatus), nullable=False)

    # внешний ключ на User.id
    author_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)

    # связь с объектом User
    author: Mapped["User"] = relationship("User", back_populates="connect_course")


class CourseSubscriptions(Base):
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    user: Mapped["User"] = relationship("User", back_populates="connect_sub")

    ...

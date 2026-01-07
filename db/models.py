# таблицы
# ❓ 130-131, (canvas.py::24-25 - нужно ли мне это прописывать?), где мне нужно создавать все таблицы?
# роль и статус - это разное
from base import Base
from enum import Enum  # python Enum — задаёт набор допустимых значений
from sqlalchemy import String, Integer, Boolean, Date, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import date


# Mapped[...] — новый синтаксис SQLAlchemy 2.0

class UserRole(Enum):  # роли
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
    role: Mapped[UserRole] = mapped_column(Enum(UserRole), nullable=False, default=UserRole.STUDENT)
    email: Mapped[str] = mapped_column(String(150), unique=True, nullable=True)
    is_del: Mapped[bool] = mapped_column(Boolean, default=False)
    # связь с Course
    connect_course: Mapped[list["Course"]] = relationship("Course", back_populates="author")

    connect_sub: Mapped[list["CourseSubscriptions"]] = relationship("CourseSubscriptions", back_populates="user")

    connect_progress: Mapped[list["LessonProgress"]] = relationship("LessonProgress", back_populates="user")

    connect_user_review: Mapped[list["Review"]] = relationship("Review", back_populates="user")

    connect_answer: Mapped[list["Answer"]] = relationship("Answer", back_populates="user")


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

    connect_sub: Mapped[list["CourseSubscriptions"]] = relationship("CourseSubscriptions", back_populates="course")

    connect_lesson: Mapped[list["Lesson"]] = relationship("Lesson", back_populates="course")

    connect_course_review: Mapped[list["Review"]] = relationship("Review", back_populates="course")


class SubscriptionStatus(Enum):
    ACTIVE = "active"
    COMPLETED = "completed"
    DROPPED = "dropped"


class CourseSubscriptions(Base):
    __tablename__ = "courses_subscriptions"
    id: Mapped[int] = mapped_column(primary_key=True)

    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    user: Mapped["User"] = relationship("User", back_populates="connect_sub")

    course_id: Mapped[int] = mapped_column(ForeignKey("courses.id"))
    course: Mapped["Course"] = relationship("Course", back_populates="connect_sub")

    status: Mapped[SubscriptionStatus] = mapped_column(Enum(SubscriptionStatus), nullable=False)


class Lesson(Base):
    __tablename__ = "lessons"
    id: Mapped[int] = mapped_column(primary_key=True)
    course_id: Mapped[int] = mapped_column(ForeignKey("courses.id"))
    course: Mapped["Course"] = relationship("Course", back_populates="connect_lesson")
    title: Mapped[str] = mapped_column(String(100), nullable=False)
    order_index: Mapped[int] = mapped_column(Integer)  # порядковый номер урока в курсе

    connect_les_con: Mapped[list["LessonContent"]] = relationship("LessonContent", back_populates="lesson")

    connect_les_prog: Mapped[list["LessonProgress"]] = relationship("LessonProgress", back_populates="lesson")


class ContentType(Enum):
    THEORY = "theory"
    VIDEO = "video"


class LessonContent(Base):
    __tablename__ = "lesson_content"
    id: Mapped[int] = mapped_column(primary_key=True)
    lesson_id: Mapped[int] = mapped_column(ForeignKey("lessons.id"))
    lesson: Mapped["Lesson"] = relationship("Lesson", back_populates="connect_les_con")
    type: Mapped[ContentType] = mapped_column(Enum(ContentType), nullable=False)
    file_path: Mapped[str] = mapped_column(String(500), nullable=False)

    connect_les_cont: Mapped[list["Task"]] = relationship("Task", back_populates="lesson_content")


class ProgressStatus(Enum):
    NOT_STARTED = "not_started"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"


class FileType(Enum):
    JSON = "json"
    TEXT = "text"


class LessonProgress(Base):
    __tablename__ = "lesson_progress"
    id: Mapped[int] = mapped_column(primary_key=True)
    status: Mapped[ProgressStatus] = mapped_column(Enum(ProgressStatus), nullable=False)
    score: Mapped[int] = mapped_column(Integer)  # полученный балл
    submission_file_path: Mapped[str] = mapped_column(
        String(255))  # ❓json/text (ответ) *что делать, если хочу файл здесь?*

    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    user: Mapped["User"] = relationship("User", back_populates="connect_progress")

    lesson_id: Mapped[int] = mapped_column(ForeignKey("lessons.id"))
    lesson: Mapped["Lesson"] = relationship("Lesson", back_populates="connect_les_prog")


class CheckType(Enum):
    MANUAL = "manual"
    AUTO = "auto"
    AI_CHECK = "ai_check"


class TaskType(Enum):
    SHORT_ANSWER = "short_answer"
    LONG_ANSWER = "long_answer"
    CHOICES = "choices"


class Task(Base):
    __tablename__ = "tasks"
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(100), nullable=False)
    description: Mapped[str] = mapped_column(String(1000), nullable=False)
    max_score: Mapped[int] = mapped_column(Integer)  # максимальный балл за задание

    type_check: Mapped[CheckType] = mapped_column(Enum(CheckType), nullable=False)
    task_type: Mapped[TaskType] = mapped_column(Enum(TaskType), nullable=False)

    lesson_content_id: Mapped[int] = mapped_column(ForeignKey("lesson_content.id"))
    lesson_content: Mapped["LessonContent"] = relationship("LessonContent", back_populates="connect_les_cont")

    connect_answer: Mapped[list["Answer"]] = relationship("Answer", back_populates="task")

    connect_cor_ans: Mapped[list["CorrectAnswer"]] = relationship("CorrectAnswer", back_populates="task")


class Rating(Enum):
    ONE = 1
    TWO = 2
    THREE = 3
    FOUR = 4
    FIVE = 5


class Review(Base):
    __tablename__ = "reviews"

    id: Mapped[int] = mapped_column(primary_key=True)
    comment: Mapped[str] = mapped_column(String(300), nullable=False)
    created_at: Mapped[date] = mapped_column(Date, default=date.today, nullable=False)

    rating: Mapped[Rating] = mapped_column(Enum(Rating), nullable=False)

    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    user: Mapped["User"] = relationship("User", back_populates="connect_user_review")

    course_id: Mapped[int] = mapped_column(ForeignKey("courses.id"))
    course: Mapped["Course"] = relationship("Course", back_populates="connect_course_review")


class AnswerStatus(Enum):
    EMPTY = "empty"
    UPLOADED = "uploaded"
    SENT = "sent"
    RECEIVED = "received"
    CREDITED = "credited"
    NEEDS_REVISION = "needs_revision"


class Answer(Base):
    __tablename__ = "answers"

    id: Mapped[int] = mapped_column(primary_key=True)
    file_path: Mapped[str] = mapped_column(String(255), nullable=False)
    comment: Mapped[str] = mapped_column(String(500), nullable=False)

    status: Mapped[AnswerStatus] = mapped_column(Enum(AnswerStatus), nullable=False)

    task_id: Mapped[int] = mapped_column(ForeignKey("tasks.id"))
    task: Mapped["Task"] = relationship("Task", back_populates="connect_answer")

    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    user: Mapped["User"] = relationship("User", back_populates="connect_answer")


# только для коротких и выборных ответов
class CorrectAnswer(Base):
    __tablename__ = "correct_answers"

    id: Mapped[int] = mapped_column(primary_key=True)
    cor_ans: Mapped[str] = mapped_column(String(100), nullable=False)

    task_id: Mapped[int] = mapped_column(ForeignKey("tasks.id"))
    task: Mapped["Task"] = relationship("Task", back_populates="connect_cor_ans")

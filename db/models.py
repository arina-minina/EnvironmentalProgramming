# таблицы
# ❓ я тут пока переносила enum в другой файл, поняла, что у меня нигде не используется FileType (7 строка), что с этим делать? Я уже не помню где хотела его использовать
from db.base import Base
from sqlalchemy import String, Text, Integer, Boolean, Date, ForeignKey, Enum, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import date
from db.enums import UserRole, CourseStatus, SubscriptionStatus, ContentType, ProgressStatus, FileType, CheckType, \
    TaskType, Rating, AnswerStatus


# Mapped[...] — новый синтаксис SQLAlchemy 2.0


class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True)
    # unique=True -> уникальность
    login: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(255), nullable=False)  # хранит хэши паролей
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    role: Mapped[UserRole] = mapped_column(Enum(UserRole), nullable=False, default=UserRole.STUDENT)
    phone_number: Mapped[str] = mapped_column(String(50), nullable=True)
    email: Mapped[str] = mapped_column(String(150), unique=True, nullable=True)
    is_del: Mapped[bool] = mapped_column(Boolean, default=False)
    # связь с Course
    courses: Mapped[list["Course"]] = relationship("Course", back_populates="author")

    subscriptions: Mapped[list["CourseSubscriptions"]] = relationship("CourseSubscriptions", back_populates="user")

    progress: Mapped[list["LessonProgress"]] = relationship("LessonProgress", back_populates="user")

    reviews: Mapped[list["Review"]] = relationship("Review", back_populates="user")

    answers: Mapped[list["Answer"]] = relationship("Answer", back_populates="user")


class Course(Base):
    __tablename__ = "courses"
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(100), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    short_description: Mapped[str] = mapped_column(Text, nullable=False)
    status: Mapped[CourseStatus] = mapped_column(Enum(CourseStatus), nullable=False)

    # внешний ключ на User.id
    author_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)

    # связь с объектом User
    author: Mapped["User"] = relationship("User", back_populates="courses")

    subscriptions: Mapped[list["CourseSubscriptions"]] = relationship("CourseSubscriptions", back_populates="course")

    lessons: Mapped[list["Lesson"]] = relationship("Lesson", back_populates="course")

    reviews: Mapped[list["Review"]] = relationship("Review", back_populates="course")


class CourseSubscriptions(Base):
    __tablename__ = "courses_subscriptions"
    id: Mapped[int] = mapped_column(primary_key=True)

    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    user: Mapped["User"] = relationship("User", back_populates="subscriptions")

    course_id: Mapped[int] = mapped_column(ForeignKey("courses.id"))
    course: Mapped["Course"] = relationship("Course", back_populates="subscriptions")

    status: Mapped[SubscriptionStatus] = mapped_column(Enum(SubscriptionStatus), nullable=False)


class Lesson(Base):
    __tablename__ = "lessons"
    id: Mapped[int] = mapped_column(primary_key=True)
    course_id: Mapped[int] = mapped_column(ForeignKey("courses.id"))
    course: Mapped["Course"] = relationship("Course", back_populates="lessons")
    title: Mapped[str] = mapped_column(String(100), nullable=False)
    order_index: Mapped[int] = mapped_column(Integer)  # порядковый номер урока в курсе

    __table_args__ = (UniqueConstraint("course_id", "order_index"),)

    content: Mapped[list["LessonContent"]] = relationship("LessonContent", back_populates="lesson")

    progress: Mapped[list["LessonProgress"]] = relationship("LessonProgress", back_populates="lesson")


class LessonContent(Base):
    __tablename__ = "lesson_content"
    id: Mapped[int] = mapped_column(primary_key=True)
    lesson_id: Mapped[int] = mapped_column(ForeignKey("lessons.id"))
    lesson: Mapped["Lesson"] = relationship("Lesson", back_populates="content")
    type: Mapped[ContentType] = mapped_column(Enum(ContentType), nullable=False)
    file_path: Mapped[str] = mapped_column(String(500), nullable=False)

    content: Mapped[list["Task"]] = relationship("Task", back_populates="lesson_content")


class LessonProgress(Base):
    __tablename__ = "lesson_progress"
    id: Mapped[int] = mapped_column(primary_key=True)
    status: Mapped[ProgressStatus] = mapped_column(Enum(ProgressStatus), nullable=False)
    score: Mapped[int] = mapped_column(Integer)  # полученный балл
    submission_file_path: Mapped[str] = mapped_column(
        String(500))  # json/text (ответ)
    text_answer: Mapped[str] = mapped_column(Text)

    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    user: Mapped["User"] = relationship("User", back_populates="progress")

    lesson_id: Mapped[int] = mapped_column(ForeignKey("lessons.id"))
    lesson: Mapped["Lesson"] = relationship("Lesson", back_populates="progress")


class Task(Base):
    __tablename__ = "tasks"
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(100), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    input_data: Mapped[str] = mapped_column(Text)
    output_data: Mapped[str] = mapped_column(Text)
    max_score: Mapped[int] = mapped_column(Integer)  # максимальный балл за задание

    type_check: Mapped[CheckType] = mapped_column(Enum(CheckType), nullable=False)
    task_type: Mapped[TaskType] = mapped_column(Enum(TaskType), nullable=False)

    lesson_content_id: Mapped[int] = mapped_column(ForeignKey("lesson_content.id"))
    lesson_content: Mapped["LessonContent"] = relationship("LessonContent", back_populates="content")

    answers: Mapped[list["Answer"]] = relationship("Answer", back_populates="task")

    correct_answers: Mapped[list["CorrectAnswer"]] = relationship("CorrectAnswer", back_populates="task")


class Review(Base):
    __tablename__ = "reviews"

    id: Mapped[int] = mapped_column(primary_key=True)
    comment: Mapped[str] = mapped_column(String(100), nullable=False)
    created_at: Mapped[date] = mapped_column(Date, default=date.today, nullable=False)

    rating: Mapped[Rating] = mapped_column(Enum(Rating), nullable=False)

    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    user: Mapped["User"] = relationship("User", back_populates="reviews")

    course_id: Mapped[int] = mapped_column(ForeignKey("courses.id"))
    course: Mapped["Course"] = relationship("Course", back_populates="reviews")


class Answer(Base):
    __tablename__ = "answers"

    id: Mapped[int] = mapped_column(primary_key=True)
    file_path: Mapped[str] = mapped_column(String(500), nullable=False)
    comment: Mapped[str] = mapped_column(String(500), nullable=False)

    status: Mapped[AnswerStatus] = mapped_column(Enum(AnswerStatus), nullable=False)

    task_id: Mapped[int] = mapped_column(ForeignKey("tasks.id"))
    task: Mapped["Task"] = relationship("Task", back_populates="answers")

    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    user: Mapped["User"] = relationship("User", back_populates="answers")


# только для коротких и выборных ответов
class CorrectAnswer(Base):
    __tablename__ = "correct_answers"

    id: Mapped[int] = mapped_column(primary_key=True)
    cor_ans: Mapped[str] = mapped_column(String(300), nullable=False)

    task_id: Mapped[int] = mapped_column(ForeignKey("tasks.id"))
    task: Mapped["Task"] = relationship("Task", back_populates="correct_answers")

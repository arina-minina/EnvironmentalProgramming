import asyncio
from db.engine import engine
from db.base import Base
from db.models import User, Course, Lesson, LessonContent, Task, Review, Answer, CorrectAnswer, CourseSubscriptions, \
    LessonProgress


async def create_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)

    print("✅ База данных и таблицы успешно созданы!")


if __name__ == "__main__":
    asyncio.run(create_tables())
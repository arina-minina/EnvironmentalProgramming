from enum import Enum as pyEnum
from enum import IntEnum


class UserRole(pyEnum):  # роли
    ADMIN = "admin"
    STUDENT = "student"
    AUTHOR = "author"


class CourseStatus(pyEnum):
    PAID = "paid"
    FREE = "free"


class SubscriptionStatus(pyEnum):
    ACTIVE = "active"
    COMPLETED = "completed"
    DROPPED = "dropped"


class ContentType(pyEnum):
    THEORY = "theory"
    VIDEO = "video"


class ProgressStatus(pyEnum):
    NOT_STARTED = "not_started"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"


class FileType(pyEnum):
    JSON = "json"
    TXT = "txt"


class CheckType(pyEnum):
    MANUAL = "manual"
    AUTO = "auto"
    AI_CHECK = "ai_check"


class TaskType(pyEnum):
    SHORT_ANSWER = "short_answer"
    LONG_ANSWER = "long_answer"
    CHOICES = "choices"

class Rating(IntEnum):
    ONE = 1
    TWO = 2
    THREE = 3
    FOUR = 4
    FIVE = 5

class AnswerStatus(pyEnum):
    EMPTY = "empty"
    UPLOADED = "uploaded"
    SENT = "sent"
    RECEIVED = "received"
    CREDITED = "credited"
    NEEDS_REVISION = "needs_revision"

class RegistrationException(Exception):
    pass


class ServerException(RegistrationException):
    pass


class UserException(RegistrationException):
    pass


class InputNameException(UserException):
    pass


class InputPasswordException(UserException):
    pass

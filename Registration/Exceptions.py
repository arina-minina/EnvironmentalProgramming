class RegistrationException(Exception):
    pass


class ServerException(RegistrationException):
    def __init__(self, message):
        super().__init__(message)
        self.code = 'red'


class UserException(RegistrationException):
    pass


class InputNameException(UserException):
    pass


class InputPasswordException(UserException):
    pass


# --------------------------------
# ------------ Errors ------------
# --------------------------------


class InputNewUserError(ServerException):
    pass


class NotFoundUserError(ServerException):
    def __init__(self, message):
        super().__init__(message)
        self.code = 'red'


class FormatNameError(InputNameException):
    def __init__(self, message):
        super().__init__(message)
        self.code = 'yellow'


class OriginError(InputNameException):
    def __init__(self, message):
        super().__init__(message)
        self.code = 'red'


class FormatPasswordError(InputPasswordException):
    pass


class QualityError(InputPasswordException):
    def __init__(self, message):
        super().__init__(message)
        self.code = 'yellow'

from Exceptions import ServerException, InputNameException, InputPasswordException


class InputNewUserError(ServerException):
    pass


class NotFoundUserError(ServerException):
    pass


class FormatNameError(InputNameException):
    pass


class OriginError(InputNameException):
    pass


class FormatPasswordError(InputPasswordException):
    pass


class QualityError(InputPasswordException):
    pass

from marshmallow import fields,Schema,ValidationError
from marshmallow.validate import Length
from app.utils.helper import isObjectIdValid

class MongoId(fields.Field):
    def _deserialize(self, value, attr, data, **kwargs):
        if not isObjectIdValid(value):
            raise ValidationError("Not a valid Object Id.")


class SignupSchema(Schema):
    username = fields.Str(required=True,validate=Length(min=3,max=64))
    email = fields.Email(required=True,validate=Length(max=128))
    password = fields.Str(required=True,validate=Length(max=32,min=8))

    class Meta:
        fields = ("email", "password", "username")

signup_schema = SignupSchema()

class LoginSchema(Schema):
    email = fields.Email(required=True,validate=Length(max=128))
    password = fields.Str(required=True,validate=Length(max=32,min=8))

    class Meta:
        fields = ("email", "password")

login_schema = LoginSchema()

class CreateGroup(Schema):
    group_name = fields.Str(required=True,validate=Length(min=3))
    participants = fields.List(MongoId(),required=True)

    class Meta:
        fields = ("group_name","participants")

create_group = CreateGroup()
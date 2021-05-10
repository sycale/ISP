from jsonschema import validate
from jsonschema.exceptions import ValidationError
from jsonschema.exceptions import SchemaError

message_schema = {
    "type": "object",
    "properties": {
        "name": {
            'type': "string",
        },
        "description": {
            "type": "string",
            "minLength": 5
        }
    },
    "required": ["name", "description"],
    "additionalProperties": False
}


def validate_place(data):
    try:
        validate(data, message_schema)
    except ValidationError as e:
        return {'ok': False, 'message': e}
    except SchemaError as e:
        return {'ok': False, 'message': e}
    return {'ok': True, 'data': data}

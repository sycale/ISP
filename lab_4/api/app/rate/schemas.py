from jsonschema import validate
from jsonschema.exceptions import ValidationError
from jsonschema.exceptions import SchemaError

message_schema = {
    "type": "object",
    "properties": {
        "place_id": {
            "type": "integer",
        },
        "price_rate": {
            "type": "integer",
        },
        "food_rate": {
            "type": "integer",
        },
        "service_rate": {
            "type": "integer",
        },
        "message": {
            "type": "string",
        }
    },
    "required": ["place_id", "message", "food_rate", "service_rate", "price_rate"],
    "additionalProperties": False
}

message_update_schema = {
    "type": "object",
    "properties": {
        "value": {
            "type": "integer",
        },
        "message": {
            "type": "string",
        }
    },
    "required": ["value", "message"],
    "additionalProperties": False
}



def validate_rate(data):
    try:
        validate(data, message_schema)
    except ValidationError as e:
        return {'ok': False, 'message': e}
    except SchemaError as e:
        return {'ok': False, 'message': e}
    return {'ok': True, 'data': data}

def validate_update_rate(data):
    try:
        validate(data, message_update_schema)
    except ValidationError as e:
        return {'ok': False, 'message': e}
    except SchemaError as e:
        return {'ok': False, 'message': e}
    return {'ok': True, 'data': data}

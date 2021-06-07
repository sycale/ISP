import re
import json
import inspect
import types

from decimal import Decimal, ROUND_UP

from CustomClass import CustomClass 

def process_function(func):
    source_code = inspect.getsource(func)
    vars = re.search("global [aA-zZ\n, ]+\n", source_code).group(0).replace(" ", "").replace("global", "").split(',')
    vars = list(map(lambda string: string.replace('\n', ""), vars))
    vars = list(map(lambda var: f'{var} = {globals()[var]}', vars))
    vars_string = ""
    print(vars_string)
    for var in vars:
        index = vars.index(var)
        if index != 0:
            vars_string += (f'    {var}\n')
        else:
            vars_string += (f'{var}\n')
    return re.sub("global [aA-zZ\n, ]+\n", vars_string, source_code)

class JSONEncoder(json.JSONEncoder):

    def default(self, obj):
        if isinstance(obj, Decimal):
            return float(Decimal(obj).quantize(Decimal("0.01"), ROUND_UP))
        else:
             if isinstance(obj, CustomClass):
                return JSONEncoder().encode(obj.__dict__).replace("  ", "")
        if inspect.isclass(obj):
            return JSONEncoder().encode({obj.__name__ : inspect.getsource(obj)})
        if isinstance(obj, types.FunctionType):
            print(process_function(obj))
            return JSONEncoder().encode({obj.__name__: process_function(obj)})
        if isinstance(obj, types.LambdaType):
            source_code = re.search('\(lambda [aA-zZ\, ]+: (.*){1,10}\)', inspect.getsource(obj))
            if source_code:
                return JSONEncoder().encode({'lambda': source_code.group(0)[1:-1]})
            else:
                source_code = re.search('lambda [aA-zZ\, ]+: (.*){1,10}', inspect.getsource(obj))
                if source_code:
                    return JSONEncoder().encode({'lambda': source_code.group(0)})
            return JSONEncoder().encode({'lambda': source_code})

        return json.JSONEncoder.default(self, obj)


class JSONDecoder(json.JSONDecoder):
    def __init__(self, *args, **kwargs):
        json.JSONDecoder.__init__(self, object_hook=self.object_hook, *args, **kwargs)

    def object_hook(self, obj):

        if isinstance(obj, dict):
            if "fname" in obj and "lname" in obj and "age" in obj:
                return CustomClass(obj.get("fname"), obj.get("lname"), obj.get("age"))

        if isinstance(obj, dict):
            for key in list(obj):
                obj[key] = self.object_hook(obj[key])

            return obj

        if isinstance(obj, list):
            for i in range(0, len(obj)):
                obj[i] = self.object_hook(obj[i])

            return obj
        return obj

def json_encode(data):
    return JSONEncoder().encode(data)


def json_decode(string):
    return JSONDecoder().decode(string)

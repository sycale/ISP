from Handlers import JsonHandler
import json
import inspect
import ast
import re

class TypeCreator:
    def __init__(self, handler_type):
        self.handler_type = handler_type

    def get_handler(self):
        if self.handler_type == 'JSON':
            return JsonHandler

handler = TypeCreator('JSON').get_handler()

b = 2
a = 1

def func():
    global a, b
    return a + b

def process_function(func):
    source_code = inspect.getsource(func)
    vars = re.search("global [aA-zZ\n, ]+\n", source_code).group(0).replace(" ", "").replace("global", "").split(',')
    vars = list(map(lambda string: string.replace('\n', ""), vars))
    vars = list(map(lambda var: f'{var} = {globals()[var]}', vars))
    vars_string = ""
    for var in vars:
        index = vars.index(var)
        if index != 0:
            vars_string += (f'    {var}\n')
        else:
            vars_string += (f'{var}\n')
    return re.sub("global [aA-zZ\n, ]+\n", vars_string, source_code)

#TODO lambda class json handler
# lambda_foo = lambda x: x*3 

# print(handler.dumps(lambda_foo))
# print(handler.dumps(lambda x: {"x": x}))
# print(handler.dumps(TypeCreator))

# handler.dump(func, './test.json')

handler.dump({'func' : process_function(func)}, './test.json')
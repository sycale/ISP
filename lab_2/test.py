from Handlers import JsonHandler

json = JsonHandler()

exec(json.load('./test.json')['func'])
print(func())

print(eval('lambda x: x')(4))
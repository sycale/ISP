from Json import json_encode, json_decode
from decimal import Decimal
from CustomClass import CustomClass

from Handlers import JsonHandler

import unittest

global_var = "privet"

def test_foo():
    return global_var

class JsonTestMethod(unittest.TestCase):
    def test_dict_decode(self):
        self.assertEqual(json_decode('{"name": "Paul", "float_number": 14.456, "int_number": 122}'), {u"name": u"Paul", u"float_number": 14.456, u"int_number": 122})

    def test_nested_dict_decode(self):
        self.assertEqual(json_decode('{"name": "Paul", "decimal_number": 14.46, "float_number": 14.456, "int_number": 122, "my_dict": {"value_1": 1, "value_2": "2"}, "list": [{"value_1": 1, "value_2": "2"}, {"value_1": 1, "value_2": "2"}, {"value_1": 1, "value_2": "2"}]}'), {u"name":u"Paul", u"decimal_number":14.46,u"float_number":14.456,u"int_number":122,u"my_dict":{u"value_1":1,u"value_2":u"2"},u"list":[{u"value_1":1,u"value_2":u"2"},{u"value_1":1,u"value_2":u"2"},{u"value_1":1,u"value_2":u"2"}]})

    def test_class_decode(self):        
        obj = json_decode("{\"fname\": \"Valerii\", \"lname\": \"Jmyshenko\", \"age\": 54}")
        self.assertTrue(obj.fname == 'Valerii' and obj.lname == 'Jmyshenko' and obj.age == 54)

    def test_foo_decode(self):
        exec(json_decode("{\"foo\": \"def foo():\\n    return global_var\\n\"}")['foo'], globals())
        return_statement = foo()
        self.assertEqual(return_statement, "privet")

    def test_dict_encode(self):
        self.assertEqual(json_encode({"name": "Gena Bukin", "float_number": 14.5644, "int_number": 4}), "{\"name\": \"Gena Bukin\", \"float_number\": 14.5644, \"int_number\": 4}")    

    def test_nested_dict_encode(self):
        self.assertEqual(json_encode( {u"name":u"Paul", u"decimal_number":14.46,u"float_number":14.456,u"int_number":122,u"my_dict":{u"value_1":1,u"value_2":u"2"},u"list":[{u"value_1":1,u"value_2":u"2"},{u"value_1":1,u"value_2":u"2"},{u"value_1":1,u"value_2":u"2"}]}),'{"name": "Paul", "decimal_number": 14.46, "float_number": 14.456, "int_number": 122, "my_dict": {"value_1": 1, "value_2": "2"}, "list": [{"value_1": 1, "value_2": "2"}, {"value_1": 1, "value_2": "2"}, {"value_1": 1, "value_2": "2"}]}')

    def test_class_encode(self):
        obj = CustomClass("Valerii", "Jmyshenko", 54)
        self.assertEqual(json_encode(obj), '"{\\"fname\\": \\"Valerii\\", \\"lname\\": \\"Jmyshenko\\", \\"age\\": 54}"')
        
class MainTestMethod(unittest.TestCase):
    def test_json_dumps(self):
        self.assertEqual(JsonHandler.dumps({
            "name": "Paul",
            "decimal_number": Decimal(14.456),
            "float_number": 14.456,
            "int_number": 122
        }), '{"name": "Paul", "decimal_number": 14.46, "float_number": 14.456, "int_number": 122}')

    def test_json_dump(self):
        JsonHandler.dump({
            "name": "Paul",
            "decimal_number": Decimal(14.456),
            "float_number": 14.456,
            "int_number": 122
        }, './test.json')

        f = open('./test.json', 'r')
        fstr = f.read()
        f.close()
        self.assertEqual(fstr, '{"name": "Paul", "decimal_number": 14.46, "float_number": 14.456, "int_number": 122}')
    
    def test_json_loads(self):
        self.assertEqual(JsonHandler.load('./test.json'), {u"int_number": 122, u"name": u"Paul", u"float_number": 14.456, u"decimal_number": 14.46})

    def test_json_load(self):
        self.assertEqual(JsonHandler.loads("{\"decimal_number\": 14.46, \"name\": \"Paul\", \"float_number\": 14.456, \"int_number\": 122}"), {u"int_number": 122, u"name": u"Paul", u"float_number": 14.456, u"decimal_number": 14.46})

def start_tests():
    unittest.main()

start_tests()
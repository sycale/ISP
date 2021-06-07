from decimal import Decimal
from Json import json_encode, json_decode

class JsonHandler():
    @staticmethod
    def dump(obj, fp):
        try:
            f = open(fp, 'w')
            f.write(json_encode(obj))
            f.close()
        except Exception as e:
            print('error')            

    @staticmethod
    def dumps(obj):
        return json_encode(obj)
    
    @staticmethod
    def load(fp):
        try:
            f = open(fp, 'r')
            fstr = f.read()
            f.close()
            return json_decode(fstr)
        except Exception as e:
            print('error')            
    @staticmethod
    def loads(s):
        return json_decode(s)

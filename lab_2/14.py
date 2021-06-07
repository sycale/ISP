#coding: utf-8

import os
import re

class Storage:
    def __init__(self, iterable=set()):
        self.__storage__ = set((str(i) for i in iterable))

    def add(self, values):
        for v in values:
            self.__storage__.add(v)

    def remove(self, values):
        for v in values:
            if v in self.__storage__:
                self.__storage__.remove(v)

    def find(self, values):
        for v in values:
            if not v in self.__storage__:
                return False
        return True

    def __str__(self):
        string = 'Storage values:\n'
        for i in self.__storage__:
            string += str(i)
            string += ', '
        return string.rstrip(' ,')  + '\n\n'

    def __repr__(self):
        string = str()
        for i in self.__storage__:
            string += str(i)
            string += ', '
        return string.rstrip(' ,')

    def save(self, path):
        with open(path, 'w') as fp:
            fp.write(repr(self))

    def load(self, path):
        with open(path, 'r') as fp:
            string = fp.read()
        self.__storage__ = set((str(i) for i in string.split(', ') if i))

    def grep(self, reg_exp):
        string = str()
        for i in self.__storage__:
            if re.search(reg_exp, i):
                string += i + '\n'
        return 'No matches :(' if len(string) == 0 else string

_list_ = [5, 1, -1, 0, 4, 5, 1]

storage = Storage(_list_) 

while(True):
    user_input = input("available commands: add,remove, find, list, grep, save, load, quit\n")

    if user_input == "add":
        val = input()
        storage.add(val)
    elif user_input == "remove":
        val = input()
        storage.remove(val)
    elif user_input == "find":
        val = input()
        storage.find(val)
    elif user_input == "grep":
        pattern = input()
        storage.grep(pattern)
    elif user_input == "save":
        path = input()
        storage.save(path)
    elif user_input == "load":
        path = input()
        storage.load(path)
    elif user_input == "quit":
        break
    elif user_input == "list":
        print(storage.__str__())
    else:
        print("unavailable command")
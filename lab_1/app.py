#coding: utf-8

from flask import Flask, jsonify
app = Flask(__name__) 
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = False
  
@app.route('/') 
def hello(): 
    return "<h1>не ну лаба норм, можно и 10 поставить</h1>"

@app.route('/hoba')
def hoda():
    return "<h1>HOBA</h1>"
  
if __name__ == "__main__": 
    app.run(host ='0.0.0.0', debug = True)
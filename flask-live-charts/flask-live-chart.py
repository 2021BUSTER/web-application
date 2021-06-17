import json
import sqlite3 
import sys
from time import time
from random import random
from flask import Flask, render_template, make_response, redirect, url_for

app = Flask(__name__)


@app.route('/')
def hello_world():
    return render_template('index.html', data='test')

@app.route('/live-data')
def live_data():
    # Create a PHP array and echo it as JSON
    db = sqlite3.connect("DB.db")
    db.row_factory = sqlite3.Row
    query = db.execute("SELECT * FROM eyes").fetchall()
    for q in 
    db.close()
    data = [time() * 1000, random()]
    #data = [time() * 1000, random() * 100]
    response = make_response(json.dumps(data))
    response.content_type = 'application/json'
    return response

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)

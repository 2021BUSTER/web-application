import json
import sqlite3 
import sys
from time import time
from random import random
from flask import Flask, render_template, make_response, redirect, url_for

app = Flask(__name__)

@app.route('/')
def hello_world():
    db = sqlite3.connect("DB2.db")
    #db.row_factory = sqlite3.Row
    query = db.execute("SELECT posture,datetime FROM pose ORDER BY datetime DESC LIMIT 1").fetchall()
    db.close()
    for q in query:
        pose_v=q[0]
        pose_d=q[1]
    return render_template('index.html', data='test', pose_v=pose_v, pose_d=pose_d)

def live_data(concen_v,concen_d):
    # Create a PHP array and echo it as JSON
    data = [concen_d,concen_v]
    response = make_response(json.dumps(data))
    response.content_type = 'application/json'
    return response

@app.route('/live-data')
def db_query():
    db = sqlite3.connect("DB2.db")
    #db.row_factory = sqlite3.Row
    query = db.execute("SELECT value,datetime FROM concentration ORDER BY datetime DESC LIMIT 1").fetchall()
    db.close()

    for q in query:
        concen_v=q[0]
        concen_d=q[1]
    resopnse=live_data(concen_v,concen_d)
    return resopnse

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)

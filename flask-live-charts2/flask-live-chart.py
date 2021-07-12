import json
import sqlite3 
import sys
from time import time
from random import randint
from flask import Flask, render_template, make_response, redirect, url_for

app = Flask(__name__)

@app.route('/')
def hello_world():
    return render_template('index.html', data='test')

@app.route('/live-data',methods=["GET", "POST"])
def live_data():    
    db = sqlite3.connect("DB2.db")
    #db.row_factory = sqlite3.Row
    query = db.execute("SELECT value,datetime FROM concentration ORDER BY datetime DESC LIMIT 1").fetchall()
    query_pose = db.execute("SELECT value,datetime FROM concentration ORDER BY datetime DESC LIMIT 1").fetchall()


    for q in query:
        concen_v=q[0]
        concen_d=q[1]
    
    for q in query_pose:
        pose_v=q[0]
        pose_d=q[1] 
    print("hi~~~~",concen_d,concen_v,pose_d,pose_v,"hi~~~")

    #data = [concen_d,concen_v,pose_d,pose_v]
    #data = [time() * 1000,concen_v,time() * 1000,pose_v]
   
    data = [time() * 1000, randint(0,4)*5,time() * 1000, randint(0,4)*5]
    #data=[5,5,8,8]
    response = make_response(json.dumps(data))
    response.content_type = 'application/json'
    
    db.close()

    return response


if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)

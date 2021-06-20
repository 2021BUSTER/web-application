import sqlite3 
import sys
from flask import Flask, render_template, make_response, redirect, url_for

app = Flask(__name__)

@app.route('/',methods=['GET','POST'])
def hello_world():
    return render_template('stem_chart.html')

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)

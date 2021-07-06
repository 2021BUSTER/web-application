import sqlite3
from sqlite3.dbapi2 import Date
import datetime
from random import random

conn = sqlite3.connect('DB2.db')
cur = conn.cursor() # 커서 열기
cur.execute("INSERT INTO concentration (value,datetime) VALUES(?,?)",(5,datetime.datetime.now()))
"""
m = cur.execute("SELECT * FROM concentration")
for i in m:
    print(i[0],i[1])
"""
conn.commit()
conn.close()
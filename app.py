from flask import Flask
from flask import render_template
from flask import jsonify
from flask import request
import sqlite3
import csv
import os

app = Flask(__name__)

def connect_db():
    db_path = os.path.join(os.path.dirname(__file__), 'customer_sales3.db')
    return sqlite3.connect(db_path)

def setup_db():
    connection = connect_db()
    cursor = connection.cursor()
    command1 = """
    CREATE TABLE IF NOT EXISTS customer_sales(
        index_i INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_id TEXT,
        first_name TEXT,
        last_name TEXT,
        company TEXT,
        city TEXT,
        country TEXT,
        phone_1 TEXT,
        phone_2 TEXT,
        email TEXT,
        subscription_date TEXT,
        website TEXT,
        sales_2021 INTEGER,
        sales_2022 INTEGER
    )
    """

    cursor.execute(command1)

    cursor.execute("SELECT COUNT(*) FROM customer_sales")
    count = cursor.fetchone()[0]


    if count == 0:
        csv_file = os.path.join(os.path.dirname(__file__), 'customers_sales_2021_2022.csv')
        with open(csv_file, 'r') as file:
            csv_reader = csv.reader(file, delimiter=';')
            next(csv_reader)  # Skip header row
            for row in csv_reader:
                cursor.execute("INSERT INTO customer_sales (customer_id, first_name, last_name, company, city, country, phone_1, phone_2, email, subscription_date, website, sales_2021, sales_2022) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)", row[1:])

        connection.commit()

    connection.close()

@app.route("/")
def index():
    if request.is_json:
        first_name = request.args.get('first_name')
        last_name = request.args.get('last_name')
        connection = connect_db()
        cursor = connection.cursor()
        cursor.execute("SELECT sales_2021, sales_2022 FROM customer_sales WHERE first_name LIKE ? AND last_name LIKE ?", ('%' + first_name + '%', '%' + last_name + '%'))
        sales = cursor.fetchone()
        connection.close()
        return jsonify({'sales_2021': sales[0],
                        'sales_2022':sales[1]
                       })    

    connection = connect_db()
    cursor = connection.cursor()
    cursor.execute("SELECT first_name, last_name FROM customer_sales")
    rows = cursor.fetchall()
    connection.close()    
    unique_names = set()
    for row in rows:
        unique_names.add((row[0], row[1]))
    unique_names_list = sorted(list(unique_names))
    return render_template("index.html", rows = unique_names_list)


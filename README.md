# Drei_App

Hello,

Thank you for assigning me such an engaging task. It proved to be quite challenging, as it was my first experience utilizing Python for the backend of my applications; previously, I had only worked with PHP. The knowledge I gained during this exercise is incredibly valuable to me, and I believe it demonstrates my ability to adapt and learn quickly.

The heart of my application resides in the "app.py" file. The initial section focuses on creating an SQLite database and populating it with data from a CSV file. While I understand it might have been more appropriate to create a separate Python function for this task, I opted to handle it directly within "app.py."

In the subsequent section, the index() function manages the rendering of the HTML file and handles AJAX calls.

The "index.html" comprises a dropdown button listing the names of all customers in alphabetical order. Users can search for a specific customer, and upon clicking on the name, a pie chart displaying sales data from 2021 and 2022, along with a line chart, is presented. To retrieve the required data from the database, an AJAX call is initiated (refer to /static/main.js), which sends a GET request to the backend. Here, sales data from both years are selected from the database, formatted into JSON, and sent back to the frontend to generate the charts.

Once again, I express my gratitude for entrusting me with this task and for your consideration.
Best Regards
Juraj Priscak

PS: You can run the app from the terminal using the following steps:

	python3 -m venv venv
	source venv/bin/activate
	python3 -m pip install --upgrade pip
	python3 -m pip install flask

	in venv :
 	export FLASK_APP=app
 	flask run

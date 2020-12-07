from flask import Flask, make_response

from db_updater import query

app = Flask(__name__)

database_path = "covid.db"


@app.route("/api/hello")
def hello():
    return "Hello, World!"


@app.route("/api/countries/active-per-million")
def get_countries_latest_active_per_population_data():
    script = "SELECT c.iso3, cl.active_per_one_million FROM countries_latest cl, countries c WHERE cl.id = c.id AND cl.date='yesterday'"
    data = query(script, (), database_path)
    data = {item[0]: item[1] for item in data}
    maxim = max(data.values())
    print(data)
    return make_response({
        "countries": data,
        "max": maxim
    })


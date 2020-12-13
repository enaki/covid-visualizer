from flask import Flask, make_response
from unidecode import unidecode

from db_updater import query

app = Flask(__name__)

database_path = "covid.db"


@app.route("/api/hello")
def hello():
    return "Hello, World!"


@app.route("/api/maps/countries")
def get_countries_map_data():
    script = "SELECT c.iso3, cl.active_per_one_million FROM countries_latest cl, countries c WHERE cl.id = c.id AND cl.date='yesterday'"
    data = query(script, (), database_path)
    data = {item[0]: item[1] for item in data}
    maxim = max(data.values())
    print(data)
    return make_response({
        "countries": data,
        "max": maxim
    })


@app.route("/api/maps/regions/ro")
def get_ro_regions_map_data():
    script = "SELECT c.county_code, cl.cases, c.population FROM counties c, counties_latest cl WHERE cl.id = c.id"
    data = query(script, (), database_path)
    data = {unidecode(item[0]): 100*item[1]/item[2] for item in data}
    maxim = max(data.values())
    print(data)
    return make_response({
        "counties": data,
        "max": maxim
    })


from flask import Flask, make_response, request, jsonify
from unidecode import unidecode

from db_updater import query
from routes.mappers import world_latest_mapper, country_latest_mapper

app = Flask(__name__)

database_path = "covid.db"


@app.route("/api/hello")
def hello():
    return "Hello, World!"


@app.route("/api/maps/countries")
def get_countries_map_data():
    # return make_response(jsonify({}))
    script = """SELECT c.name, c.iso2, c.iso3, c.flag, cl.date, cl.updated, cl.cases, cl.today_cases, cl.deaths, cl.today_deaths, cl.recovered, cl.today_recovered, cl.active, cl.critical, cl.cases_per_one_million,
                        cl.deaths_per_one_million, cl.tests, cl.tests_per_one_million, cl.population, cl.active_per_one_million, cl.recovered_per_one_million, cl.critical_per_one_million, c.id
                        FROM countries_latest cl, countries c WHERE cl.id = c.id;"""
    if len(request.args) > 0:
        if 'name' in request.args:
            script = """SELECT c.name, c.iso2, c.iso3, c.flag, cl.date, cl.updated, cl.cases, cl.today_cases, cl.deaths, cl.today_deaths, cl.recovered, cl.today_recovered, cl.active, cl.critical, cl.cases_per_one_million,
                                   cl.deaths_per_one_million, cl.tests, cl.tests_per_one_million, cl.population, cl.active_per_one_million, cl.recovered_per_one_million, cl.critical_per_one_million, c.id
                                   FROM countries_latest cl, countries c WHERE cl.id = c.id AND lower(c.name) LIKE lower(?)"""
            data = query(script, (request.args["name"],), database_path)
        elif 'iso2' in request.args:
            script = """SELECT c.name, c.iso2, c.iso3, c.flag, cl.date, cl.updated, cl.cases, cl.today_cases, cl.deaths, cl.today_deaths, cl.recovered, cl.today_recovered, cl.active, cl.critical, cl.cases_per_one_million,
                                   cl.deaths_per_one_million, cl.tests, cl.tests_per_one_million, cl.population, cl.active_per_one_million, cl.recovered_per_one_million, cl.critical_per_one_million, c.id
                                   FROM countries_latest cl, countries c WHERE cl.id = c.id AND c.iso2 = ?"""
            data = query(script, (request.args["iso2"],), database_path)
        elif 'iso3' in request.args:
            script = """SELECT c.name, c.iso2, c.iso3, c.flag, cl.date, cl.updated, cl.cases, cl.today_cases, cl.deaths, cl.today_deaths, cl.recovered, cl.today_recovered, cl.active, cl.critical, cl.cases_per_one_million,
                                   cl.deaths_per_one_million, cl.tests, cl.tests_per_one_million, cl.population, cl.active_per_one_million, cl.recovered_per_one_million, cl.critical_per_one_million, c.id
                                   FROM countries_latest cl, countries c WHERE cl.id = c.id AND c.iso3 = ?"""
            data = query(script, (request.args["iso3"],), database_path)
        else:
            data = query(script, (), database_path)
    else:
        data = query(script, (), database_path)

    data = country_latest_mapper(data)
    return make_response(jsonify(data))
    #return make_response(jsonify([{}, {}]))


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


@app.route("/api/latest/world")
def get_world_latest_data():
    script = "SELECT * FROM world_latest;"
    data = query(script, (), database_path)
    data = world_latest_mapper(data)
    print(data)
    return make_response(data)




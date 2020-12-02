from db_updater.continents import continents
from db_updater.utils import execute_many, get_json_from_web
from db_updater.utils.db_utils import query


GET_HISTORICAL_COUNTRY_DATA_URL = "https://disease.sh/v3/covid-19/historical?lastdays=all"
GET_LATEST_COUNTRY_URL = "https://disease.sh/v3/covid-19/countries"


def insert_countries(db_path):
    latest_countries = get_json_from_web(GET_LATEST_COUNTRY_URL)
    countries_tuples = [(country["countryInfo"]["_id"], country["country"], country["countryInfo"]["iso2"],
                         country["countryInfo"]["iso3"], country["countryInfo"]["lat"], country["countryInfo"]["long"],
                         country["countryInfo"]["flag"], country["continent"])
                        for country in latest_countries]
    countries_sql_script = """INSERT OR REPLACE INTO "countries" ("id", "name", "iso2", "iso3", "lat", "long", "flag", "continent_id") VALUES (?, ?, ?, ?, ?, ?, ?, (SELECT id FROM continents WHERE name=?)) """
    execute_many(countries_sql_script, countries_tuples, database_path=db_path, message="countries")


def insert_countries_history(db_path):
    countries_history = get_json_from_web(GET_HISTORICAL_COUNTRY_DATA_URL)
    reformated_countries_history = []
    for country in countries_history:
        reformated_country_history = {"name": country["country"], "timeline": []}
        for date in countries_history[0]["timeline"]["cases"].keys():
            split = date.split('/')
            new_date = "20{}/{}/{}".format(split[2], split[0], split[1])
            reformated_country_history["timeline"].append({"date": new_date,
                                                           "cases": country["timeline"]["cases"][date],
                                                           "deaths": country["timeline"]["deaths"][date],
                                                           "recovered": country["timeline"]["recovered"][date]})
        reformated_countries_history.append(reformated_country_history)

    # print(reformated_countries_history)
    country_id_sql_script = """SELECT id FROM "countries" WHERE name=? """
    countries_history_tuples = []
    countries_history_sql_script = """INSERT OR REPLACE INTO "countries_history" ("id", "date", "cases", "deaths", "recovered") VALUES (?, ?, ?, ?, ?) """
    for country in reformated_countries_history:
        try:
            _id = query(country_id_sql_script, (country["name"],), db_path)[0][0]
            # print(_id)
            countries_history_tuples.extend([(_id, timeline["date"], timeline["cases"],
                                              timeline["deaths"], timeline["recovered"])
                                             for timeline in country["timeline"]])
        except IndexError:
            print("Error inserting country: {}".format(country["name"]))

    execute_many(countries_history_sql_script, countries_history_tuples, database_path=db_path, message="insert countries history")


def insert_latest_countries(db_path, yesterday=False, two_days_ago=False):
    url = "{}?yesterday={}&twoDaysAgo={}".format(GET_LATEST_COUNTRY_URL, 1 if yesterday else 0, 1 if two_days_ago else 0)
    latest_countries = get_json_from_web(url)
    country_id_sql_script = """SELECT id FROM "countries" WHERE name=? """
    countries_tuples = []
    date = 'twoDaysAgo' if two_days_ago else 'yesterday' if yesterday else 'today'
    for country in latest_countries:
        try:
            _id = query(country_id_sql_script, (country["country"],), db_path)[0][0]
            continent = continents[country["continent"]] if country["continent"] != '' else None
            countries_tuples.append((_id, date, country["updated"], country["cases"], country["todayCases"], country["deaths"],
                                    country["todayDeaths"], country["recovered"], country["todayRecovered"], country["active"],
                                    country["critical"], country["casesPerOneMillion"], country["deathsPerOneMillion"],
                                    country["tests"], country["testsPerOneMillion"], country["population"],
                                    continent, country["activePerOneMillion"],
                                    country["recoveredPerOneMillion"], country["criticalPerOneMillion"]))
        except IndexError:
            print("Error inserting country: {}".format(country["name"]))

    latest_countries_sql_script = """INSERT OR REPLACE INTO "countries_latest" ("id", "date", "updated", "cases", "today_cases", "deaths", "today_deaths", "recovered", "today_recovered", "active", "critical", "cases_per_one_million", "deaths_per_one_million", "tests", "tests_per_one_million", "population", "continent_id", "active_per_one_million", "recovered_per_one_million", "critical_per_one_million") VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) """
    execute_many(latest_countries_sql_script, countries_tuples, database_path=db_path, message="latest countries")


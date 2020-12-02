from db_updater.utils import execute_many, get_json_from_web
from db_updater.utils.db_utils import query

GET_LATEST_CONTINENT_URL = "https://disease.sh/v3/covid-19/continents"

continents = {
    "North America": None,
    "Asia": None,
    "South America": None,
    "Europe": None,
    "Africa": None,
    "Australia/Oceania": None
}


def insert_continents(db_path):
    latest_continents = get_json_from_web(GET_LATEST_CONTINENT_URL)
    continents_tuples = [(continent["continent"], continent["continentInfo"]["lat"], continent["continentInfo"]["long"])
                         for continent in latest_continents]
    continents_sql_script = """INSERT OR REPLACE INTO "continents" ("name", "lat", "long") VALUES (?, ?, ?) """
    execute_many(continents_sql_script, continents_tuples, database_path=db_path, message="continents")


def update_continents_ids(db_path):
    global continents
    continents_id_sql_script = """SELECT * FROM "continents" WHERE name=?"""
    for continent in continents.keys():
        _id = query(continents_id_sql_script, (continent,), db_path)[0][0]
        continents[continent] = _id


def insert_latest_continents(db_path, yesterday=False, two_days_ago=False):
    url = "{}?yesterday={}&twoDaysAgo={}".format(GET_LATEST_CONTINENT_URL, 1 if yesterday else 0, 1 if two_days_ago else 0)
    latest_continents = get_json_from_web(url)
    continents_tuples = []
    date = 'twoDaysAgo' if two_days_ago else 'yesterday' if yesterday else 'today'
    for continent in latest_continents:
        continent_id = continents[continent["continent"]]
        continents_tuples.append((continent_id, date, continent["updated"], continent["cases"], continent["todayCases"], continent["deaths"],
                                continent["todayDeaths"], continent["recovered"], continent["todayRecovered"], continent["active"],
                                continent["critical"], continent["casesPerOneMillion"], continent["deathsPerOneMillion"],
                                continent["tests"], continent["testsPerOneMillion"], continent["population"],
                                continent["activePerOneMillion"], continent["recoveredPerOneMillion"],
                                continent["criticalPerOneMillion"]))

    latest_continents_sql_script = """INSERT OR REPLACE INTO "continents_latest" ("id", "date", "updated", "cases", "today_cases", "deaths", "today_deaths", "recovered", "today_recovered", "active", "critical", "cases_per_one_million", "deaths_per_one_million", "tests", "tests_per_one_million", "population", "active_per_one_million", "recovered_per_one_million", "critical_per_one_million") VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) """
    execute_many(latest_continents_sql_script, continents_tuples, database_path=db_path, message="latest continents")


from db_updater.utils import execute_many, get_json_from_web

GET_HISTORICAL_world_URL = "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
GET_LATEST_world_URL = "https://disease.sh/v3/covid-19/all"


def insert_world_history(db_path):
    world_history = get_json_from_web(GET_HISTORICAL_world_URL)
    timeline = []
    for date in world_history["cases"].keys():
        split = date.split('/')
        new_date = "20{}/{}/{}".format(split[2], split[0], split[1])
        timeline.append({"date": new_date, "cases": world_history["cases"][date],
                         "deaths": world_history["deaths"][date],
                         "recovered": world_history["recovered"][date]})

    world_history_tuples = []
    world_history_sql_script = """INSERT OR REPLACE INTO "world_history" ("date", "cases", "deaths", "recovered") VALUES (?, ?, ?, ?) """
    world_history_tuples.extend([(date["date"], date["cases"],
                                   date["deaths"], date["recovered"])
                                  for date in timeline])

    execute_many(world_history_sql_script, world_history_tuples, database_path=db_path,
                 message="insert world history")


def insert_latest_world(db_path, yesterday=False, two_days_ago=False):
    url = "{}?yesterday={}&twoDaysAgo={}".format(GET_LATEST_world_URL, 1 if yesterday else 0, 1 if two_days_ago else 0)
    latest_world = get_json_from_web(url)
    date = 'twoDaysAgo' if two_days_ago else 'yesterday' if yesterday else 'today'
    world_tuples = [
        (date, latest_world["updated"], latest_world["cases"], latest_world["todayCases"], latest_world["deaths"],
         latest_world["todayDeaths"], latest_world["recovered"], latest_world["todayRecovered"],
         latest_world["active"],
         latest_world["critical"], latest_world["casesPerOneMillion"], latest_world["deathsPerOneMillion"],
         latest_world["tests"], latest_world["testsPerOneMillion"], latest_world["population"],
         latest_world["activePerOneMillion"], latest_world["recoveredPerOneMillion"],
         latest_world["criticalPerOneMillion"], latest_world["affectedCountries"])]

    latest_world_sql_script = """INSERT OR REPLACE INTO "world_latest" ("date", "updated", "cases", "today_cases", "deaths", "today_deaths", "recovered", "today_recovered", "active", "critical", "cases_per_one_million", "deaths_per_one_million", "tests", "tests_per_one_million", "population", "active_per_one_million", "recovered_per_one_million", "critical_per_one_million", "affected_countries") VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) """
    execute_many(latest_world_sql_script, world_tuples, database_path=db_path, message="latest world")


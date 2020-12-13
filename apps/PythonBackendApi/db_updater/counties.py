from db_updater.utils import extract_romania_counties_data
from db_updater.utils import get_json_from_web, execute_many

GET_HISTORY_COUNTY_URL = "https://www.graphs.ro/json.php"
GET_LATEST_COUNTY_URL = "https://covid19.geo-spatial.org/"
GET_COUNTIES_URL = "https://raw.githubusercontent.com/virgil-av/judet-oras-localitati-romania/master/judete.json"


def get_counties(debug=True):
    covid_romania = get_json_from_web(GET_HISTORY_COUNTY_URL, debug=debug)
    counties = covid_romania["covid_romania"][0]["county_data"]
    return counties


def insert_ro_counties(db_path, debug=True, update_diacritics=True):
    counties = get_counties(debug)
    counties_tuples = [(county["county_id"], county["county_name"], county["county_population"])
                       for county in counties]
    counties_sql_script = """INSERT OR REPLACE INTO "counties" ("county_code", "name", "population", "country_id") 
    VALUES (?, ?, ?, (SELECT id from countries where iso3="ROU")) """
    execute_many(counties_sql_script, counties_tuples, database_path=db_path, message="counties")
    if update_diacritics:
        update_ro_counties_diacritics(db_path, debug=debug)


def change_old_diacritics(word: str):
    diacritics_dictionary = {
        'ş': 'ș',
        'Ş': 'Ș',
        'ţ': 'ț',
        'Ţ': 'Ț'
    }
    for key, value in diacritics_dictionary.items():
        word = word.replace(key, value)
    return word


def update_ro_counties_diacritics(db_path, debug=True):
    counties = get_json_from_web(GET_COUNTIES_URL, debug=debug)
    counties_tuples = [(change_old_diacritics(county["nume"]), county["auto"]) for county in counties["judete"]]
    counties_sql_script = """UPDATE "counties" SET name=? WHERE county_code=? """
    execute_many(counties_sql_script, counties_tuples, database_path=db_path, message="counties")


def update_latest_ro_counties_data(database_path, web_driver_folder_path):
    latest_counties = extract_romania_counties_data(web_driver_folder_path)
    counties_tuples = []

    counties_tuples.extend([(county["name"], latest_counties["updated"], county["total_cases"], county["new_cases"],
                             county["recovered"], county["deaths"]) for county in latest_counties["counties"]])
    latest_counties_sql_script = """INSERT OR REPLACE INTO "counties_latest" ("id", "date", "cases", "today_cases", "deaths", "recovered") VALUES ((SELECT id FROM counties WHERE name=?), ?, ?, ?, ?, ?)"""
    print(counties_tuples)
    execute_many(latest_counties_sql_script, counties_tuples, database_path=database_path, message="counties")


def insert_ro_counties_history(db_path, debug=True):
    covid_romania = get_json_from_web(GET_HISTORY_COUNTY_URL, debug=debug)
    registrations = covid_romania["covid_romania"]
    counties_tuples = []
    for registration in registrations:
        if "county_data" not in registration:
            continue
        date = registration["reporting_date"]
        counties = registration["county_data"]
        counties_tuples.extend([(county["county_id"], date, county["total_cases"], county["county_population"])
                                for county in counties])
    counties_sql_script = """INSERT OR REPLACE INTO "counties_history" ("id", "date", "total_cases", "population") 
    VALUES ((SELECT id from counties where county_code=?), ?, ?, ?) """
    execute_many(counties_sql_script, counties_tuples, database_path=db_path, message="counties", debug=debug)


if __name__ == '__main__':
    pass
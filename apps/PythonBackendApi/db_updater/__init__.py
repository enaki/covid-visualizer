# https://disease.sh/docs/#/COVID-19
import os
import time
from multiprocessing import Process

from db_updater.continents import insert_continents, insert_latest_continents
from db_updater.counties import insert_ro_counties, insert_ro_counties_history, update_latest_ro_counties_data, \
    update_ro_counties_diacritics, insert_latest_ro_counties
from db_updater.countries import insert_countries_history, insert_countries, insert_latest_countries
from db_updater.utils import execute_many, get_json_from_web
from db_updater.utils.db_utils import delete_data, query, execute_script
from db_updater.utils.web_utils import extract_romania_counties_data
from db_updater.world import insert_latest_world, insert_world_history


def update_latest_data(database_path, debug=True):
    insert_latest_countries(database_path, debug=debug)
    insert_latest_countries(database_path, yesterday=True, debug=debug)
    insert_latest_countries(database_path, two_days_ago=True, debug=debug)

    insert_latest_continents(database_path, debug=debug)
    insert_latest_continents(database_path, yesterday=True, debug=debug)
    insert_latest_continents(database_path, two_days_ago=True, debug=debug)

    insert_latest_world(database_path, debug=debug)
    insert_latest_world(database_path, yesterday=True, debug=debug)
    insert_latest_world(database_path, two_days_ago=True, debug=debug)

    insert_latest_ro_counties(database_path, debug=debug)


def update_history_data(database_path, days=None, debug=True):
    insert_ro_counties_history(database_path, debug=debug)
    insert_countries_history(database_path, days=days, debug=debug)
    insert_world_history(database_path, days=days, debug=debug)


def init_database(database_path, drop_script_path, create_script_path, web_driver_folder_path):
    recreate_tables(database_path, drop_script_path, create_script_path)
    insert_continents(database_path)
    insert_countries(database_path)
    insert_ro_counties(database_path)
    update_ro_counties_diacritics(database_path)

    update_history_data(database_path)
    update_latest_data(database_path)
    update_latest_ro_counties_data(database_path, web_driver_folder_path=web_driver_folder_path)


def recreate_tables(db_path, drop_script_path, create_script_path):
    execute_script(db_path, drop_script_path, "dropping tables")
    execute_script(db_path, create_script_path, "creating tables")


def schedule_updating_latest_data(database_path, interval_minutes=20):
    from datetime import datetime
    interval = 60 * interval_minutes
    # interval = 5
    while True:
        dt_string = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        update_latest_data(database_path, debug=False)
        print("[PROCESS {}] [ {} ] - Updated latest data. Next update after {} minutes.".format(os.getpid(), dt_string, interval_minutes))
        time.sleep(interval)


def schedule_updating_history_data(database_path, interval_hours=6):
    from datetime import datetime
    interval = 3600 * interval_hours
    # interval = 5
    while True:
        dt_string = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        update_history_data(database_path, days=3, debug=False)
        print("[PROCESS {}] [ {} ] - Updated history data. Next update after {} hours.".format(os.getpid(), dt_string, interval_hours))
        time.sleep(interval)


def initialize_database_workers(database_path):
    p1 = Process(target=schedule_updating_latest_data, args=(database_path, 20), daemon=True)
    p2 = Process(target=schedule_updating_history_data, args=(database_path, 6), daemon=True)
    p1.start()
    p2.start()


if __name__ == '__main__':
    database_path = "../covid.db"
    drop_script_path = "../sql_scripts/drop_covid.db.sql"
    create_script_path = "../sql_scripts/covid.db.sql"
    init_database(database_path, drop_script_path, create_script_path, "utils/")
    #initialize_database_workers(database_path)
    while True:
        pass

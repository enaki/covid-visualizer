# https://disease.sh/docs/#/COVID-19
from db_updater.continents import insert_continents, update_continents_ids, continents, insert_latest_continents
from db_updater.countries import insert_countries_history, insert_countries, insert_latest_countries
from db_updater.utils import execute_many, get_json_from_web
from db_updater.utils.db_utils import delete_data, query, execute_script
from db_updater.world import insert_latest_world, insert_world_history


def init_database():
    database_path = "../covid.db"
    drop_script_path = "../scripts/drop_covid.db.sql"
    create_script_path = "../scripts/covid.db.sql"
    delete_data(database_path, ["countries_latest", "countries_history", "countries",
                                "continents_latest", "continents"])
    recreate_tables(database_path, drop_script_path, create_script_path)

    insert_continents(database_path)
    update_continents_ids(database_path)
    print(continents)
    insert_countries(database_path)

    insert_countries_history(database_path)
    insert_world_history(database_path)

    insert_latest_countries(database_path)
    insert_latest_countries(database_path, yesterday=True)
    insert_latest_countries(database_path, two_days_ago=True)

    insert_latest_continents(database_path)
    insert_latest_continents(database_path, yesterday=True)
    insert_latest_continents(database_path, two_days_ago=True)

    insert_latest_world(database_path)
    insert_latest_world(database_path, yesterday=True)
    insert_latest_world(database_path, two_days_ago=True)


def recreate_tables(db_path, drop_script_path, create_script_path):
    execute_script(db_path, drop_script_path, "dropping tables")
    execute_script(db_path, create_script_path, "creating tables")


if __name__ == '__main__':
    init_database()

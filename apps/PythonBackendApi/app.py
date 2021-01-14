from db_updater import init_database, initialize_database_workers
from routes import app


if __name__ == '__main__':
    database_path = "covid.db"
    drop_script_path = "sql_scripts/drop_covid.db.sql"
    create_script_path = "sql_scripts/covid.db.sql"
    web_driver_folder_path = "db_updater/utils/"
    # init_database(database_path, drop_script_path, create_script_path, web_driver_folder_path)
    print("***********BEGINNING OF THE INITIALIZATION OF THE DATABASE WORKERS")
    initialize_database_workers(database_path, web_driver_folder_path)

    app.run(host='0.0.0.0', debug=True, port=2020)


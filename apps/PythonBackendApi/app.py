from db_updater import init_database, initialize_database_workers
from routes import app


if __name__ == '__main__':
    database_path = "covid.db"
    drop_script_path = "sql_scripts/drop_covid.db.sql"
    create_script_path = "sql_scripts/covid.db.sql"
    # init_database(database_path, drop_script_path, create_script_path)
    # initialize_database_workers(database_path)

    app.run(debug=True, port=2020, ssl_context='adhoc')


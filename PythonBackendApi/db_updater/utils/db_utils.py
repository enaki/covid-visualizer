import sqlite3
import time


def execute_many(script, tuples, database_path, message="data", method=1):
    start = time.time()
    print("\nInserting {} ...".format(message))

    conn = sqlite3.connect(database_path)
    cur = conn.cursor()

    if method == 1:
        cur.executemany(script, tuples)
    else:
        for item in tuples:
            cur.execute(script, item)

    conn.commit()
    conn.close()
    end = time.time()
    print("Finished inserting {} in {} seconds".format(message, end - start))


def query(script, tuples, database_path, message="data", debug=False):
    if debug:
        start = time.time()
        print("\nQuerying {} ...".format(message))

    conn = sqlite3.connect(database_path)
    cur = conn.cursor()
    row = cur.execute(script, tuples).fetchall()
    conn.commit()
    conn.close()
    if debug:
        end = time.time()
        print("Finished querying {} in {} seconds".format(message, end - start))
    return row


def execute_script(db_path, script_path, message=""):
    start = time.time()
    print("\n*** STARTING SCRIPT FOR {} ***".format(message.upper()))

    conn = sqlite3.connect(db_path)
    cur = conn.cursor()

    try:
        with open(script_path, "r") as script_file:
            cur.executescript(script_file.read())
    except sqlite3.OperationalError as e:
        print(e)
    finally:
        conn.commit()
        conn.close()
        end = time.time()
        print("Finished {} in {} seconds".format(message.upper(), end - start))


def delete_data(db_path, tables=[]):
    start = time.time()
    print("\nDeleting data from languages ...")

    conn = sqlite3.connect(db_path)
    cur = conn.cursor()

    for table in tables:
        cur.execute(" DELETE FROM {} ".format(table))
    conn.commit()
    conn.close()

    end = time.time()
    print("Finished deleting data in {} seconds".format(end - start))
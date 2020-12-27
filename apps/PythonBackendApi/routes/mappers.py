import datetime
from collections import OrderedDict


def milliseconds_to_date(milliseconds):
    return datetime.datetime.fromtimestamp(milliseconds / 1000.0).strftime("%Y-%d-%m %H:%M:%S")


def world_latest_mapper(world_tuples):
    return {world_tuple[0]: {
        "update": milliseconds_to_date(world_tuple[1]),
        "cases": world_tuple[2],
        "today_cases": world_tuple[3],
        "deaths": world_tuple[4],
        "today_deaths": world_tuple[5],
        "recovered": world_tuple[6],
        "today_recovered": world_tuple[7],
        "active": world_tuple[8],
        "critical": world_tuple[9],
        "cases_per_one_million": world_tuple[10],
        "deaths_per_one_million": world_tuple[11],
        "tests": world_tuple[12],
        "tests_per_one_million": world_tuple[13],
        "population": world_tuple[14],
        "active_per_one_million": world_tuple[15],
        "recovered_per_one_million": world_tuple[16],
        "critical_per_one_million": world_tuple[17],
        "affected_countries": world_tuple[18]
    } for world_tuple in world_tuples}


def country_latest_mapper(country_tuples):
    countries_dict = {}
    for country in country_tuples:
        if country[0] not in countries_dict:
            countries_dict[country[0]] = OrderedDict({
                "id": country[22],
                "name": country[0],
                "iso2": country[1],
                "iso3": country[2],
                "flag": country[3],
                country[4]: {
                    "update": milliseconds_to_date(country[5]),
                    "cases": country[6],
                    "today_cases": country[7],
                    "deaths": country[8],
                    "today_deaths": country[9],
                    "recovered": country[10],
                    "today_recovered": country[11],
                    "active": country[12],
                    "critical": country[13],
                    "cases_per_one_million": country[14],
                    "deaths_per_one_million": country[15],
                    "tests": country[16],
                    "tests_per_one_million": country[17],
                    "population": country[18],
                    "active_per_one_million": country[19],
                    "recovered_per_one_million": country[20],
                    "critical_per_one_million": country[21],
                },
            })
        else:
            countries_dict[country[0]][country[4]] = {
                "update": milliseconds_to_date(country[5]),
                "cases": country[6],
                "today_cases": country[7],
                "deaths": country[8],
                "today_deaths": country[9],
                "recovered": country[10],
                "today_recovered": country[11],
                "active": country[12],
                "critical": country[13],
                "cases_per_one_million": country[14],
                "deaths_per_one_million": country[15],
                "tests": country[16],
                "tests_per_one_million": country[17],
                "population": country[18],
                "active_per_one_million": country[19],
                "recovered_per_one_million": country[20],
                "critical_per_one_million": country[21],
            }
    return list(countries_dict.values())


def counties_latest_mapper(county_tuples):
    counties_dict = OrderedDict({
            "country": "Romania",
            "counties": []
        })
    for county in county_tuples:
        counties_dict["counties"].append({
            "id": county[0],
            "county_code": county[1],
            "name": county[2],
            "population": county[3],
            "cases": county[4],
            "today_cases": county[5],
            "deaths": county[6],
            "recovered": county[7],
            "date": county[8],
        })
    return counties_dict
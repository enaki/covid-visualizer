import json
import time
from utils import get_json_from_web

GET_HISTORY_COUNTY_URL = "https://www.graphs.ro/json.php"

county_name_exceptions = {
    "Bistrita-Nasaud": "Bistrita Nasaud",
    "Caras-Severin": "Caras Severin"
}


def geo_parse(filename):
    print("\n************************")
    print("\tStarting parsing file <input/{}> ...".format(filename))
    start = time.time()
    with open("input/{}".format(filename), mode="r") as input_file:
        data = json.load(input_file)
        parsed_data = {}
        for feature in data["features"]:
            feature_dict = {
                "type": data["type"],
                "features": [feature]
            }
            parsed_data[feature["properties"]["iso_a3"]] = feature_dict
        with open("output/parsed.{}".format(filename), mode="w") as output_file:
            json.dump(parsed_data, output_file, indent=2)

    end = time.time()
    print("\tFinished parsing file <input/{}> in {} seconds".format(filename, end - start))


def extract_counties_codes():
    covid_romania = get_json_from_web(GET_HISTORY_COUNTY_URL)
    counties = covid_romania["covid_romania"][0]["county_data"]
    return {county["county_name"]: county["county_id"] for county in counties}


def ro_counties_geo_parse(filename, by_county_code=True):
    county_codes = extract_counties_codes()
    print("\n************************")
    print("\tStarting parsing file <input/{}> ...".format(filename))
    start = time.time()
    with open("input/{}".format(filename), mode="r") as input_file:
        data = json.load(input_file)
        parsed_data = {}
        for feature in data["features"]:
            feature_dict = {
                "type": data["type"],
                "features": [feature]
            }
            if by_county_code:
                county_name = feature["properties"]["name"]
                if county_name in county_name_exceptions.keys():
                    county_name = county_name_exceptions[county_name]
                county_code = county_codes[county_name]
                parsed_data[county_code] = feature_dict
            else:
                parsed_data[feature["properties"]["name"]] = feature_dict
        with open("output/parsed.{}".format(filename), mode="w") as output_file:
            json.dump(parsed_data, output_file, indent=2)

    end = time.time()
    print("\tFinished parsing file <input/{}> in {} seconds".format(filename, end - start))


if __name__ == '__main__':
    #geo_parse("low.geo.json")
    #geo_parse("medium.geo.json")
    #geo_parse("high.geo.json")
    print(extract_counties_codes())
    ro_counties_geo_parse("ro_counties.geo.json", by_county_code=True)

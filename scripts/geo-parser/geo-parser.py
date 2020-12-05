import json
import time


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


if __name__ == '__main__':
    geo_parse("low.geo.json")
    geo_parse("medium.geo.json")
    geo_parse("high.geo.json")

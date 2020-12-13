from .web_utils import get_json_from_web, extract_romania_counties_data
from .db_utils import execute_many


if __name__ == '__main__':
    GET_HISTORICAL_DATA_URL = "https://disease.sh/v3/covid-19/historical?lastdays=all"
    print(get_json_from_web(GET_HISTORICAL_DATA_URL))

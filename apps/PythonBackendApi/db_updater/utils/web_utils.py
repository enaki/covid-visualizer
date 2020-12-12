import json
import time
import urllib
import urllib.request

from unidecode import unidecode

COVID_RO_COUNTIES_URL = "https://covid19.geo-spatial.org/"


def get_json_from_web(url=None, debug=True):
    if url is None:
        print('Invalid URL')
        return
    start, end = None, None
    if debug:
        print("\n************************")
        print("\tURL: {}".format(url))
        print("\tDownloading raw data from specified url ...")
        start = time.time()
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0',
                                               'Content-type': 'application/json'})
    response = urllib.request.urlopen(req)
    data_json = json.loads(response.read().decode("utf-8"))

    if debug:
        end = time.time()
        print("\tDownloading data finished in {} seconds".format(end - start))
    return data_json


def extract_digits(string):
    return ''.join([char for char in string if char.isdigit()]).rstrip()


def dumb_american_format_data_to_normal(string_data):
    terms = string_data.replace(" ", "-").split("-")
    return "{}-{}-{} {}".format(terms[2], terms[0], terms[1], terms[3]).rstrip()


def get_index_of_first_digit(string):
    for index in range(len(string)):
        if string[index].isdigit():
            return index
    return -1


def extract_romania_counties_data(web_driver_folder_path):
    from bs4 import BeautifulSoup
    from selenium import webdriver
    from sys import platform

    def normalize_county_name(county: str):
        if '-' in county:
            county = "-".join([part.capitalize() for part in county.split("-")])
        elif ' ' in county:
            county = " ".join([part.capitalize() for part in county.split()])
        else:
            county = county.capitalize()
        return county

    driver_path = None
    if platform == "linux" or platform == "linux2":
        driver_path = '{}webdriver/linux_firefox_geckodriver'.format(web_driver_folder_path)
    elif platform == "win32":
        driver_path = '{}webdriver/win_firefox_geckodriver.exe'.format(web_driver_folder_path)
    browser = webdriver.Firefox(executable_path=driver_path)

    browser.get(COVID_RO_COUNTIES_URL)
    html = browser.page_source
    soup = BeautifulSoup(html, 'html.parser')
    update_tag = soup.select_one("app-footer div").get_text()
    update_tag = update_tag[get_index_of_first_digit(update_tag):]
    update_tag = dumb_american_format_data_to_normal(update_tag)

    tables = soup.find_all('table')
    latest_counties_dict = {}
    for table in tables:
        table_name = table.thead.tr.th.get_text()
        items = table.find_all('span')
        if "cazuri confirmate" in table_name.lower():
            for index in range(0, len(items), 4):
                total_cases = items[index].get_text().strip()
                new_cases = extract_digits(items[index + 1].get_text())
                county_name = items[index + 2].get_text().strip()
                if "necunoscut" not in county_name.lower():
                    county_name = normalize_county_name(county_name)
                    latest_counties_dict[county_name] = {
                        "total_cases": int(total_cases),
                        "new_cases": int(new_cases)
                    }
                # print("{} : {} {} {}".format(index//4, total_cases, new_cases, county_name))
        elif "vindecari" in unidecode(table_name.lower()):
            # print(table_name)
            for index in range(0, len(items), 2):
                recovered = items[index].get_text().strip()
                county_name = items[index + 1].get_text().strip()
                if "necunoscut" not in county_name.lower():
                    county_name = normalize_county_name(county_name)
                    latest_counties_dict[county_name]["recovered"] = int(recovered)
        elif "decese" in table_name.lower():
            # print(table_name)
            for index in range(0, len(items), 2):
                deaths = items[index].get_text().strip()
                county_name = items[index + 1].get_text().strip()
                if "necunoscut" not in county_name.lower():
                    county_name = normalize_county_name(county_name)
                    latest_counties_dict[county_name]["deaths"] = int(deaths)
    browser.close()
    array_counties = [{
        "name": key,
        "total_cases": value["total_cases"],
        "new_cases": value["new_cases"],
        "recovered": value["recovered"],
        "deaths": value["deaths"]
    } for key, value in latest_counties_dict.items()]

    return {"updated": update_tag,
            "counties": array_counties}


if __name__ == '__main__':
    data = extract_romania_counties_data()
    print(data)
    with open("ro_counties_latest_data", mode="w", encoding="utf-8") as output:
        json.dump(data, output, indent=2, ensure_ascii=False)

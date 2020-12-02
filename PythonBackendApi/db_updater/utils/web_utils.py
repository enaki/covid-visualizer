import json
import time
import urllib
import urllib.request


def get_json_from_web(url=None):
    if url is None:
        print('Invalid URL')
        return

    print("\n************************")
    print("\tURL: {}".format(url))
    print("\tDownloading raw data from specified url ...")
    start = time.time()
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0',
                                               'Content-type': 'application/json'})
    response = urllib.request.urlopen(req)
    data_json = json.loads(response.read().decode("utf-8"))

    end = time.time()
    print("\tDownloading data finished in {} seconds".format(end - start))
    return data_json
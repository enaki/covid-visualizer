# Covid visualizer apk


## Description

The “_Covid visualizer_” application is a mobile application that helps the user to visualize
the latest data on the status of the __Covid-19__ virus. Through the application, the user can
visualize the state of the country in which it is located, as well as the state of each country in the world, along with the state
Romania specifically.

In the application are provided general information, tips related to the virus Covid-19 and
news. All of the above are offered in Romanian and English.

The user can use the application without logging in, as the application does not offer anything
personalized. Only access to the location is used to provide data from the country in which it is located
the user.

The mobile application was written in __react-native__ and the backend server was written in __Python__ using __Flask__.
The database used is __SQLite__.

## Application Architecture 

![Mobile Pages](https://github.com/enaky/covid-visualiser/blob/main/documentation/diagram/architecture-diagram.png) 

The mobile application communicates with: 
* **the flask server** to retrieve the covid data (running on port 2020)
* **a news api** to retrieve latest covid news

The Flask Server has 2 processes (with multiprocessing package) in order to update its data.

__The latest data__ is updated by 1 process each 20 minutes and __the brief history data__ is updated by the another process each 6 hours.

`Note`: Romania's data is parsed using the [mozzila geckodriver](https://github.com/mozilla/geckodriver/releases) (Scripted page is loaded, then html is parsed)

#### E-R Diagram

![ER diagram](https://github.com/enaky/covid-visualiser/blob/main/documentation/database/er-diagram_2.png) 


## Mobile Pages

![Mobile Pages](https://github.com/enaky/covid-visualiser/blob/main/documentation/diagram/app_views.png) 

#### Home Page

When starting the application, it will request user's location. If user accepts then in this page will be displayed user's country location information about covid and the top 15 countries sorted by active cases. Otherwise, only the top-15 countries will be displayed.

![Home Page](https://github.com/enaky/covid-visualiser/blob/main/documentation/mobile_views/home_united.png)

 
#### Analytics Page

The analytics page retrieves and displays latest covid data. 

The retrieved data are put in the Async Storage and are updated only if they are older than an hour.

![Analytics Page](https://github.com/enaky/covid-visualiser/blob/main/documentation/mobile_views/analytics/analytics_1.png)


##### Maps

The package used for maps is [react-native-maps](https://github.com/react-native-maps/react-native-maps)

The maps are displayed using a geojson parsed for both _world country maps_ and _romania map_ using the python script located in _scripts_ folder.

The gradient used is:

![Gradient](https://github.com/enaky/covid-visualiser/blob/main/documentation/mobile_views/analytics/world_map/gradient.png)

The gradient can be changed in `MapWorldColorService.js` (World Map) and `MapRoCountyColorService` (Romania County Map).

Both maps are displayed after the number of active cases.

- The world map is scaled using a logarithmic scale
- The Romania map is scaled using a linear scale

When you press on a country in the _World Map_, its location (latitude and longitude) will be sent to the backend and retrieved its data.
If the country is invalid, a pop-up message will be displayed.

![Maps](https://github.com/enaky/covid-visualiser/blob/main/documentation/mobile_views/maps_united.png)


##### Statistics

The package used for maps is [Victory Native](https://formidable.com/open-source/victory/docs/native/)

Statistics displayed:
- last 3 days statistics (new deaths, new recovered, new actives)
- last 3 days overall statistics (total deaths, total recovered, total actives)
- last 3 days number of tests

![Statistics](https://github.com/enaky/covid-visualiser/blob/main/documentation/mobile_views/statistics_united.png)

 
#### News Page

News are retrieved from a news API with covid related topic in english and romanian. 

Fetched news are put in Async Storage and are used next time accessing the news page if they are not older than an hour.

`Note`: If the user wants to get the latest news (not from the async storage), the user can swipe down and it will update the async storage.


![News Page](https://github.com/enaky/covid-visualiser/blob/main/documentation/mobile_views/news_united.png)


#### Help Page

Here are displayed useful information about covid-19 in english and romanian.

![Help Page](https://github.com/enaky/covid-visualiser/blob/main/documentation/mobile_views/help_united.png)


## How to run the project

First you will need to install [expo](https://docs.expo.io/get-started/installation/).

Second, you will need to create a mobile [emulator](https://developer.android.com/studio/run/managing-avds)

In order to run the app on your own device (not on an emulator), you will need to change the Backend IP Address from WebInfo.js to your private local machine IP. (example 192.168.1.113)

In order to run the application, you need to:
1. **Run the python3 server**
   - ```pip install -r requirements.txt``` (it's recommended to create a [python virtual environment](https://docs.python.org/3/tutorial/venv.html) first)
   - ```python3 app.py``` (first run will take longer because database is being created)
   
`Note`: Next time you run the server comment the line 10 from app.py: ```init_database(...)``` in order to speed up the server's start, as the creation of the database is no longer required.

2. **Run the react-native app**
   - ```npm install``` (on the first start)
   - ```npm start```
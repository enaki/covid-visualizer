BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "world_history" (
	"date"	DATE NOT NULL,
	"cases"	INTEGER NOT NULL,
	"deaths"	INTEGER NOT NULL,
	"recovered"	INTEGER NOT NULL,
	UNIQUE("date")
);
CREATE TABLE IF NOT EXISTS "world_latest" (
	"date"	TEXT NOT NULL,
	"updated"	INTEGER NOT NULL,
	"cases"	INTEGER NOT NULL,
	"today_cases"	INTEGER NOT NULL,
	"deaths"	INTEGER NOT NULL,
	"today_deaths"	INTEGER NOT NULL,
	"recovered"	INTEGER NOT NULL,
	"today_recovered"	INTEGER NOT NULL,
	"active"	INTEGER NOT NULL,
	"critical"	INTEGER,
	"cases_per_one_million"	INTEGER,
	"deaths_per_one_million"	INTEGER,
	"tests"	INTEGER,
	"tests_per_one_million"	INTEGER,
	"population"	INTEGER,
	"active_per_one_million"	INTEGER,
	"recovered_per_one_million"	INTEGER,
	"critical_per_one_million"	INTEGER,
	"affected_countries"	INTEGER
);
CREATE TABLE IF NOT EXISTS "continents" (
	"id"	INTEGER NOT NULL,
	"name"	TEXT NOT NULL UNIQUE,
	"lat"	INTEGER NOT NULL,
	"long"	INTEGER NOT NULL,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "continents_latest" (
	"id"	INTEGER NOT NULL,
	"date"	TEXT NOT NULL,
	"updated"	INTEGER NOT NULL,
	"cases"	INTEGER NOT NULL,
	"today_cases"	INTEGER NOT NULL,
	"deaths"	INTEGER NOT NULL,
	"today_deaths"	INTEGER NOT NULL,
	"recovered"	INTEGER NOT NULL,
	"today_recovered"	INTEGER NOT NULL,
	"active"	INTEGER NOT NULL,
	"critical"	INTEGER,
	"cases_per_one_million"	INTEGER,
	"deaths_per_one_million"	INTEGER,
	"tests"	INTEGER,
	"tests_per_one_million"	INTEGER,
	"population"	INTEGER,
	"active_per_one_million"	INTEGER,
	"recovered_per_one_million"	INTEGER,
	"critical_per_one_million"	INTEGER,
	FOREIGN KEY ("id") REFERENCES "continents"("id"),
	UNIQUE("date","id")
);
CREATE TABLE IF NOT EXISTS "countries" (
	"id"	INTEGER NOT NULL,
	"name"	TEXT NOT NULL UNIQUE,
	"iso2"	TEXT,
	"iso3"	TEXT,
	"lat"	INTEGER NOT NULL,
	"long"	INTEGER NOT NULL,
	"flag"	INTEGER,
	"continent_id"	INTEGER,
	FOREIGN KEY ("continent_id") REFERENCES "continents"("id"),
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "countries_history" (
	"id"	INTEGER NOT NULL,
	"date"	DATE NOT NULL,
	"cases"	INTEGER NOT NULL,
	"deaths"	INTEGER NOT NULL,
	"recovered"	INTEGER NOT NULL,
	FOREIGN KEY ("id") REFERENCES "countries"("id"),
	UNIQUE("date","id")
);
CREATE TABLE IF NOT EXISTS "countries_latest" (
	"id"	INTEGER NOT NULL,
    "date"	TEXT NOT NULL,
	"updated"	INTEGER NOT NULL,
	"cases"	INTEGER NOT NULL,
	"today_cases"	INTEGER NOT NULL,
	"deaths"	INTEGER NOT NULL,
	"today_deaths"	INTEGER NOT NULL,
	"recovered"	INTEGER NOT NULL,
	"today_recovered"	INTEGER NOT NULL,
	"active"	INTEGER NOT NULL,
	"critical"	INTEGER,
	"cases_per_one_million"	INTEGER,
	"deaths_per_one_million"	INTEGER,
	"tests"	INTEGER,
	"tests_per_one_million"	INTEGER,
	"population"	INTEGER,
	"active_per_one_million"	INTEGER,
	"recovered_per_one_million"	INTEGER,
	"critical_per_one_million"	INTEGER,
	FOREIGN KEY ("id") REFERENCES "countries"("id"),
	UNIQUE("date","id")
);
COMMIT;

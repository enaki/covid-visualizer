BEGIN TRANSACTION;
DELETE FROM "county_latest";
DELETE FROM "counties_history";
DELETE FROM "counties";
DELETE FROM "countries_latest";
DELETE FROM "countries_history";
DELETE FROM "countries";
DELETE FROM "continents_latest";
DELETE FROM "continents";
DELETE FROM "world_history";
DELETE FROM "world_latest";
COMMIT;
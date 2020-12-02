BEGIN TRANSACTION;
DROP TABLE IF EXISTS "countries_latest";
DROP TABLE IF EXISTS "countries_history";
DROP TABLE IF EXISTS "countries";
DROP TABLE IF EXISTS "continents_latest";
DROP TABLE IF EXISTS "continents";
DROP TABLE IF EXISTS "world_history";
DROP TABLE IF EXISTS "world_latest";
COMMIT;

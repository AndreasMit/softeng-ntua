CREATE TABLE IF NOT EXISTS stations(
   stationID       VARCHAR(4) NOT NULL PRIMARY KEY
  ,stationProvider VARCHAR(13) NOT NULL
  ,stationName     VARCHAR(30) NOT NULL
);
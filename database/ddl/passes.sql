CREATE TABLE IF NOT EXISTS passes(
   passID     VARCHAR(10) NOT NULL PRIMARY KEY
  ,timestamp  VARCHAR(20) NOT NULL
  ,stationRef VARCHAR(4) NOT NULL
  ,vehicleRef VARCHAR(12) NOT NULL
  ,charge     NUMERIC(4,2) NOT NULL
  ,t          VARCHAR(4) NOT NULL
  ,v          VARCHAR(12) NOT NULL
  ,hn         VARCHAR(2) NOT NULL
  ,p          VARCHAR(4) NOT NULL
  ,status     VARCHAR(6) NOT NULL
);
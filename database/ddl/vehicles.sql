CREATE TABLE IF NOT EXISTS vehicles(
   vehicleID    VARCHAR(12) NOT NULL PRIMARY KEY
  ,tagID        VARCHAR(9) NOT NULL
  ,tagProvider  VARCHAR(13) NOT NULL
  ,providerAbbr VARCHAR(2) NOT NULL
  ,licenseYear  INTEGER  NOT NULL
  ,balance      NUMERIC(5,2) NOT NULL
);
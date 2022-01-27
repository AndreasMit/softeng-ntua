-- a. {baseURL}/PassesPerStation/:stationID/:date_from/:date_to
--------------------------------------------------------------
set @row_number = 0;
select (@row_number:=@row_number + 1) AS PassIndex,
P.passID as PassID,
STR_TO_DATE(P.timestamp,'%d/%m/%Y %H:%i') as PassTimeStamp,
P.vehicleRef as VehicleID,
V.tagProvider as TagProvider,
case when P.p <> 'home' then 'visitor' else 'home' end as PassType,
P.charge as PassCharge
from Passes as P inner join Vehicles as V
on P.vehicleRef = V.vehicleID
where P.stationRef = 'stationID'
and STR_TO_DATE(P.timestamp,'%d/%m/%Y %H:%i') >= DATE_FORMAT('date_from', "%Y-%m-%d %H:%i") and STR_TO_DATE(P.timestamp,'%d/%m/%Y %H:%i') <= DATE_FORMAT('date_to', "%Y-%m-%d %H:%i")
order by P.timestamp;


-- b. {baseURL}/PassesAnalysis/:op1_ID/:op2_ID/:date_from/:date_to
-----------------------------------------------------------------
select (@row_number:=@row_number + 1) AS PassIndex,
P.passID as PassID,
P.stationRef as StationID,
P.timestamp as PassTimeStamp,
P.vehicleRef as VehicleID,
P.charge as PassCharge
from Passes as P inner join Stations as S
on P.stationRef = S.stationID
where substring(S.stationID,1,2) = 'op1_ID' and P.hn = 'op2_ID'
and STR_TO_DATE(P.timestamp,'%d/%m/%Y %H:%i') >= DATE_FORMAT('date_from', "%Y-%m-%d %H:%i") and STR_TO_DATE(P.timestamp,'%d/%m/%Y %H:%i') <= DATE_FORMAT('date_to', "%Y-%m-%d %H:%i")
order by P.timestamp;


-- c. {baseURL}/PassesCost/:op1_ID/:op2_ID/:date_from/:date_to
-------------------------------------------------------------
select count(*) as NumberOfPasses,
sum(P.charge) as PassesCost
from Passes as P inner join Stations as S
on P.stationRef = S.stationID
where substring(S.stationID,1,2) = 'op1_ID' and P.hn = 'op2_ID'
and STR_TO_DATE(P.timestamp,'%d/%m/%Y %H:%i') >= DATE_FORMAT('date_from', "%Y-%m-%d %H:%i") and STR_TO_DATE(P.timestamp,'%d/%m/%Y %H:%i') <= DATE_FORMAT('date_to', "%Y-%m-%d %H:%i")
order by P.timestamp;


-- 2d. {baseURL}/ChargesBy/:op_ID/:date_from/:date_to
-----------------------------------------------------
select P.hn as VisitingOperator,
count(*) as NumberOfPasses,
sum(P.charge) as PassesCost
from Passes as P inner join Stations as S
on P.stationRef = S.stationID
where substring(S.stationID,1,2) = 'op1_ID' and P.hn <> 'op_ID'
and STR_TO_DATE(P.timestamp,'%d/%m/%Y %H:%i') >= DATE_FORMAT('date_from', "%Y-%m-%d %H:%i") and STR_TO_DATE(P.timestamp,'%d/%m/%Y %H:%i') <= DATE_FORMAT('date_to', "%Y-%m-%d %H:%i")
group by P.hn
order by VisitingOperator;

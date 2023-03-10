const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3001;
const routes = require("./routes");
const morgan = require("morgan");

const gisRouter = require("./router/gisRouter");
const facilityInfoRouter = require("./router/facilityInforRouter");
const logRouter = require("./router/logRouter");
const dashboardRouter = require("./router/dashboardRouter");
const { facilAlarmSetting } = require("./routes");
const alarmRouter = require("./router/alarmRouter");
const logController = require("./controller/logController");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

//1.실시간　관제　（지도）
app.get(routes.getErrorList, gisRouter); //장애　정보

//2.시설정보
app.post(routes.FacilInfoCRUD, facilityInfoRouter);
app.post(routes.getFacilInfo, facilityInfoRouter);
app.post(routes.selectFacilList, facilityInfoRouter);
app.get(routes.allFacilInfo, facilityInfoRouter)


//3.로그분석
app.post(routes.serverLogHistory, logRouter);
app.post(routes.netLogHistory, logRouter);
app.post(routes.sensorLogHistory, logRouter)
app.post(routes.routerLogHistory,logRouter)

//4.대시보드(엣지센터)0
app.get(routes.getEdgeInfo, dashboardRouter);

//5.알람설정
app.post(routes.alarmCRUD,alarmRouter)
app.post(routes.thresholdList,alarmRouter)

app.listen(port, () => {
  console.log(`express is running on ${port}`);
});

const express = require("express");
const routes = require("../routes");

const alarmController = require("../controller/alarmController");
const alarmRouter = express.Router();

//시설물　등록
// alarmRouter.post(routes.insertFacilInfo,alarmController.insertFacilInfo);
//시설물　조회
alarmRouter.post(routes.alarmCRUD, alarmController.alarmCRUD);
alarmRouter.post(routes.thresholdList, alarmController.thresholdList);
module.exports = alarmRouter;

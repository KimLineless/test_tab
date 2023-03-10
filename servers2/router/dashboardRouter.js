const express = require("express");
const routes = require("../routes");

const dashboardController = require("../controller/dashboardController");
const dashboardRouter = express.Router();

//시설물　등록
// dashboardRouter.post(routes.insertFacilInfo,dashboardController.insertFacilInfo);
//시설물　조회
dashboardRouter.get(routes.getEdgeInfo, dashboardController.getEdgeInfo);
module.exports = dashboardRouter;

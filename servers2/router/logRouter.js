const express = require("express")
const routes = require("../routes");

const logController = require("../controller/logController");
const logRouter = express.Router();

logRouter.post(routes.serverLogHistory,logController.serverLogHistory);
logRouter.post(routes.netLogHistory,logController.netLogHistory)
logRouter.post(routes.sensorLogHistory,logController.sensorLogHistory)
logRouter.post(routes.routerLogHistory,logController.routerLogHistory)
module.exports = logRouter;
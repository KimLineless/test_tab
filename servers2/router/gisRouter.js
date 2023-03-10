const express = require("express")
const routes = require("../routes");

const gisController = require("../controller/gisController");
const gisRouter = express.Router();

gisRouter.get(routes.getErrorList,gisController.getErrorList)

module.exports = gisRouter;
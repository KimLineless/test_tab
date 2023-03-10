const express = require("express")
const routes = require("../routes");

const facilityInforController = require("../controller/facilityInforController");
const facilityInfoRouter = express.Router();

//시설물　등록
facilityInfoRouter.post(routes.FacilInfoCRUD,facilityInforController.FacilInfoCRUD);
//시설물　조회
facilityInfoRouter.post(routes.getFacilInfo,facilityInforController.getFacilInfo);
//시설물　조회２
facilityInfoRouter.post(routes.selectFacilList,facilityInforController.selectFacilList)
//시설등록　옵션
facilityInfoRouter.get(routes.allFacilInfo,facilityInforController.allFacilInfo)
//시설알람설정
// facilityInfoRouter.get(routes.facilAlarmSetting,facilityInforController.facilAlarmSetting)
module.exports = facilityInfoRouter;
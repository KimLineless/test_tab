const routes = {
  // idCheck: "/api/idCheck",
  //1.gis
  getErrorList: "/api/getErrorList", //장애정보
  //2.시설정보
  FacilInfoCRUD: "/api/FacilInfoCRUD",
  getFacilInfo: "/api/getFacilInfo",
  selectFacilList: "/api/selectFacilList",
  allFacilInfo: "/api/allFacilInfo",


  //3.로그분석
  //서버
  serverLogHistory: "/api/serverLogHistory",
  netLogHistory: "/api/netLogHistory",
  sensorLogHistory: "/api/sensorLogHistory",
  routerLogHistory: "/api/routerLogHistory",

  //4. 대시보드 (엣지센터)
  getEdgeInfo: "/api/getEdgeInfo",

  //5.알람설정
  alarmCRUD: "/api/alarmCRUD",
  thresholdList: "/api/thresholdList",
};

module.exports = routes;

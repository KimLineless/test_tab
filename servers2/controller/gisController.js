const postgres = require("../postgres")

// const iniparser = require("iniparser");


const getErrorList = async (req, res) => {
  try {

    let currentAlarm = [];
    let historyAlarm = [];

    //현재이상
    let eventCurrentSql = `select DISTINCT(B.type) FROM "TB_EVENT_IT_CURRENT" as A LEFT JOIN "TB_RCV_MT_INFO" as B ON A.rcv_info_no = B.rcv_no`
    let eventCurrent = await postgres(eventCurrentSql)

    var eventCurrentData = [];
    for (let i = 0; eventCurrent.length > i; i++) {
      if (eventCurrent[i].type) {
        let type = eventCurrent[i].type;
        let upperType = type.toUpperCase();    //대문자　변환
        let eventCurrentSql2 = `SELECT * FROM "TB_EVENT_IT_CURRENT" as A 
        JOIN "TB_RCV_MT_INFO" as B ON A.rcv_info_no = B.rcv_no
        JOIN "TB_RCV_MT_${upperType}_INFO" as C ON B.rcv_no=C.rcv_info_no`
        let eventCurrent2 = await postgres(eventCurrentSql2)
        eventCurrentData.push(...eventCurrent2)

      }
    }

    // console.log(eventCurrentData,"eventCurrentData");

    //현재이상　끝


    //현재장애　
    let errorCurrentSql = `SELECT DISTINCT(B.type) FROM "TB_FAULT_IT_CURRENT" as A LEFT JOIN "TB_RCV_MT_INFO" as B ON A.rcv_info_no = B.rcv_no`
    let errorCurrent = await postgres(errorCurrentSql);

    var errorCurrentData = [];

    for (let i = 0; errorCurrent.length > i; i++) {
      if (errorCurrent[i].type) {
        let type = errorCurrent[i].type;
        let upperType = type.toUpperCase();    //대문자　변환
        let errorCurrentSql2 = `SELECT * FROM "TB_FAULT_IT_CURRENT" as A 
      JOIN "TB_RCV_MT_INFO" as B ON A.rcv_info_no = B.rcv_no
      JOIN "TB_RCV_MT_${upperType}_INFO" as C ON B.rcv_no=C.rcv_info_no`

        let errorCurrent2 = await postgres(errorCurrentSql2)
        errorCurrentData.push(...errorCurrent2)
      }
    }

    //현재장애　끝

    // console.log(errorCurrentData,"???");
    currentAlarm.push(...eventCurrentData, ...errorCurrentData)

    //이벤트이력
    let eventHistorySql = `SELECT DISTINCT(B.type) FROM "TB_EVENT_HT_HISTORY" as A JOIN "TB_RCV_MT_INFO" as B ON A.rcv_info_no = B.rcv_no`
    let eventHistory = await postgres(eventHistorySql);
    var eventHistoryData = [];

    for (let i = 0; eventHistory.length > i; i++) {
      if (eventHistory[i].type) {
        let type = eventHistory[i].type;
        let upperType = type.toUpperCase();    //대문자　변환
        let eventHistorySql2 = `SELECT * FROM "TB_EVENT_HT_HISTORY" as A 
        JOIN "TB_RCV_MT_INFO" as B ON A.rcv_info_no = B.rcv_no
        JOIN "TB_RCV_MT_${upperType}_INFO" as C ON B.rcv_no=C.rcv_info_no`

        // console.log(eventHistorySql2);
        let eventHistory2 = await postgres(eventHistorySql2)
        eventHistoryData.push(...eventHistory2)
      }
    }
    // console.log(eventHistoryData, ";;;");
    //이벤트　이력　끝


    //에러이력
    let errorHistorySql = `SELECT DISTINCT(B.type) FROM "TB_FAULT_HT_HISTORY" as A JOIN "TB_RCV_MT_INFO" as B ON A.rcv_info_no = B.rcv_no`
    let errorHistory = await postgres(errorHistorySql)
    var errorHistoryData = [];
    for (let i = 0; errorHistory.length > i; i++) {
      if (errorHistory[i].type) {
        let type = errorHistory[i].type;
        let upperType = type.toUpperCase();    //대문자　변환
        let errorHistorySql2 = `SELECT * FROM "TB_FAULT_HT_HISTORY" as A 
        JOIN "TB_RCV_MT_INFO" as B ON A.rcv_info_no = B.rcv_no
        JOIN "TB_RCV_MT_${upperType}_INFO" as C ON B.rcv_no=C.rcv_info_no`

        let errorHistory2 = await postgres(errorHistorySql2)
        errorHistoryData.push(...errorHistory2)
      }
    }
    historyAlarm.push(...errorHistoryData, ...eventHistoryData)


    // console.log(currentAlarm, historyAlarm, "확인");
    return res.json({ currentAlarm, historyAlarm })


  } catch (error) {
    console.log(error);
    return res.json(error)
  }
}

const gisController = {
  
  getErrorList
}
module.exports = gisController
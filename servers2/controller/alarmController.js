const postgres = require("../postgres");

// const iniparser = require("iniparser");

//안씀
const alarmCRUD = async (req, res) => {
  try {


    if (type == "insert") {
      let insertsql = `INSERT INTO public."TB_EVENT_THRESHOLD"(rcv_info_no, unit, facil_detail, threshold_point, reg_dt, chg_dt) VALUES(0, '', '', '', '', '')`
    }
    else if (type == "update") {
      let updatesql = `UPDATE public."TB_EVENT_THRESHOLD"
      SET idx=nextval('"TB_EVENT_THRESHOLD_idx_seq"'::regclass), rcv_info_no=0, unit='', facil_detail='', threshold_point='', reg_dt='', chg_dt='';`
    } else if (type == "delete") {
      let deletesql = `DELETE FROM public."TB_EVENT_THRESHOLD"
      WHERE idx=nextval('"TB_EVENT_THRESHOLD_idx_seq"'::regclass) AND rcv_info_no=0`
    }
    let selectsql = `SELECT * FROM public."TB_EVENT_THRESHOLD";`
    // let sql = `SELECT * FROM "TB_RCV_MT_EDGE_INFO";`;
    // let edgeInfoList = await postgres(sql);
    // // console.log(edgeInfoList, "확인");

    // return res.json({edgeInfoList})
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};
const thresholdList = async (req, res) => {
  try {
    console.log(req.body, "임계값");
    let dd = req.body
    let thresholdPoint = []
    let threshold
    for (let i = 0; i < dd.length; i++) {
      let sql = `SELECT threshold_point FROM public."TB_EVENT_THRESHOLD" WHERE rcv_info_no=${dd[i].rcv_info_no};`
      console.log(sql,"zxzz");
      threshold = await postgres(sql)
      // thresholdPoint.push()
    }
    // console.log(threshold, "???");

    return res.json({})
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
}

const alarmController = {
  alarmCRUD,
  thresholdList
};
module.exports = alarmController;

const postgres = require("../postgres");

// const iniparser = require("iniparser");

const getEdgeInfo = async (req, res) => {
  try {
    let sql = `SELECT * FROM "TB_RCV_MT_EDGE_INFO";`;
    let edgeInfoList = await postgres(sql);
    // console.log(edgeInfoList, "확인");

    return res.json({edgeInfoList})
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const dashboardController = {
  getEdgeInfo,
};
module.exports = dashboardController;

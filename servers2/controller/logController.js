const postgres = require("../postgres")
const postgresNeo = require("../postgresNeo")

const serverLogHistory = async (req, res) => {
    try {
        // console.log(req.body, "서버");
        if (req.body) {
            let dd = req.body
            var serverData = []
            var pieData = [];
            var pieevent = []
            // console.log(dd, "client　받는　값　확인");
            if (dd.type.length != 0 && dd.detail_type.length != 0 && dd.date.length != 0) {
                let type = (dd.type).toLowerCase();
                let detail_type = (dd.detail_type).toLowerCase();
                let start_date = dd.date.startDate;
                let end_date = dd.date.endDate


                //sql injection
                let sql = `select A.idx,A.rcv_info_no,A.ip_address,A.server_type,A.value,A.unit,A.reg_dt,B.facil_name 
                from "TB_HISTORY_HT_SERVER" as A left join "TB_RCV_MT_INFO" as B on A.rcv_info_no = B.rcv_no 
                where A.server_type ='${detail_type}' AND A.reg_dt::timestamp BETWEEN ('${start_date}')::timestamp AND ('${end_date}')::timestamp ORDER BY reg_dt`
                // console.log(sql, "확인");
                serverData = await postgres(sql)
                console.log(serverData,"??");


                let piefaultsql = `SELECT count(*) FROM "TB_FAULT_HT_HISTORY" as A
                JOIN "TB_RCV_MT_INFO" as B ON A.rcv_info_no = B.rcv_no WHERE description ='${type}' AND detail_type ='${detail_type}'
                AND A.reg_dt::date BETWEEN ('${start_date}')::timestamp AND ('${end_date}')::timestamp`
                let piefault = await postgres(piefaultsql);


                // console.log(piefault);

                let faultcount = piefault[0].count;
                let faultData = { name: '장애건수', value: faultcount }


                let pieeventsql = `SELECT *,A.reg_dt as reg_dt FROM "TB_EVENT_HT_HISTORY" as A
                JOIN "TB_RCV_MT_INFO" as B ON A.rcv_info_no = B.rcv_no WHERE description ='${type}' AND detail_type ='${detail_type}'
                AND A.reg_dt::date BETWEEN ('${start_date}')::timestamp AND ('${end_date}')::timestamp`
                pieevent = await postgres(pieeventsql)


                // console.log(pieeventsql,"이벤트");`

                let eventcount = pieevent.length;
                let eventData = { name: '이상건수', value: eventcount }


                pieData.push(faultData, eventData)

            }
            // console.log(serverData,pieData);

            return res.json({ serverData, pieData, pieevent })
        } else {
            return res.json([])
        }
    } catch (error) {
        console.log(error, "serverlog 오류");
        return res.status(400).json({ error })
    }
}

const netLogHistory = async (req, res) => {
    // console.log(req.body, "이거확인");

    try {
        if (req.body) {
            // console.log(req.body, "network");


            let dd = req.body
            var netData = []
            var pieData = [];
            // console.log(dd, "client　받는　값　확인");
            if (dd.type.length != 0 && dd.detail_type.length != 0 && dd.date.length != 0) {
                let type = (dd.type).toLowerCase();
                let detail_type = (dd.detail_type).toLowerCase();
                // if (type == 'l2') {
                //     type = 'L2 switch'
                // } else if (type == 'l3') {
                //     type = 'L3 switch'
                // }
                let start_date = dd.date.startDate;
                let end_date = dd.date.endDate

                let sql = `select A.idx,A.rcv_info_no,A.ip_address,A.network_type,A.value,A.unit,A.reg_dt,B.facil_name,A.divi 
                from "TB_HISTORY_HT_NETWORK" as A left join "TB_RCV_MT_INFO" as B on A.rcv_info_no = B.rcv_no 
                where  A.network_type ='${type}' and A.divi='${detail_type}' AND A.reg_dt::timestamp BETWEEN ('${start_date}')::timestamp AND ('${end_date}')::timestamp ORDER BY reg_dt`

                console.log(sql, "netData 확인");
                netData = await postgres(sql)


                let piefaultsql = `SELECT count(*) FROM "TB_FAULT_HT_HISTORY" as A
                JOIN "TB_RCV_MT_INFO" as B ON A.rcv_info_no = B.rcv_no WHERE description ='${type}' 
                AND A.reg_dt::date BETWEEN ('${start_date}')::timestamp AND ('${end_date}')::timestamp`


                let piefault = await postgres(piefaultsql);

                // console.log(piefault,"????");
                let faultcount = piefault[0].count;
                let faultData = { name: '장애건수', value: faultcount }


                let pieeventsql = `SELECT count(*) FROM "TB_EVENT_HT_HISTORY" as A
                JOIN "TB_RCV_MT_INFO" as B ON A.rcv_info_no = B.rcv_no WHERE description ='${type}' 
                AND A.reg_dt::date BETWEEN ('${start_date}')::timestamp AND ('${end_date}')::timestamp`
                let pieevent = await postgres(pieeventsql)

                let eventcount = pieevent[0].count;
                let eventData = { name: '이상건수', value: eventcount }


                pieData.push(faultData, eventData)
                // console.log(pieData,"?");`
                return res.json({ netData, pieData })
            }


        } else {
            return res.json([])
        }
    } catch (error) {
        console.log(error, "networklog 오류");
        return res.status(400).json(error)
    }


}


const sensorLogHistory = async (req, res) => {

    try {
        if (req.body) {
            // console.log(req.body, "sensor");


            let dd = req.body
            if (dd.type.length != 0 && dd.detail_type.length != 0 && dd.date.length != 0) {
                let start_date = dd.date.startDate;
                let end_date = dd.date.endDate
                let sensor_type_nm = ""
                let searchValue = "";
                if (dd.type == 'sensor1') {
                    sensor_type_nm = 'SG01CEN'
                } else if (dd.type == 'sensor2') {
                    sensor_type_nm = 'SG02CEN'
                }
                if (dd.detail_type == 'State') {
                    searchValue = "status"
                } else if (dd.detail_type == '변형률') {
                    searchValue = "value"
                } else if (dd.detail_type == '온도') {
                    searchValue = "value2"
                }


                let sql = `
                SELECT A.idx,rcv_info_no,B.ip_address,port,sensor_type,A.occur_dt,facil_name,monitoring,${searchValue} as value FROM "TB_HISTORY_HT_SENSOR" as A LEFT JOIN "TB_RCV_MT_INFO" as B ON A.rcv_info_no = B.rcv_no
                WHERE sensor_type='${sensor_type_nm}' AND A.occur_dt::timestamp BETWEEN ('${start_date}')::timestamp AND ('${end_date}')::timestamp ORDER BY reg_dt
                `
                let sensorData = await postgres(sql)
                // console.log(sensorData,"확인");
                return res.json({ sensorData })
            }


        } else {
            return res.json([])
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error })
    }


}


const routerLogHistory = async (req, res) => {

    try {
        if (req.body) {
            // console.log(req.body, "sensor");


            let dd = req.body
            if (dd.type.length != 0 && dd.detail_type.length != 0 && dd.date.length != 0) {
                let start_date = dd.date.startDate;
                let end_date = dd.date.endDate
                let sensor_type_nm = ""
                let searchValue = "";
                // if (dd.type == 'sensor1') {
                //     sensor_type_nm = 'SG01CEN'
                // } else if (dd.type == 'sensor2') {
                //     sensor_type_nm = 'SG02CEN'
                // }
                // if(dd.detail_type=='State'){
                //     searchValue = "status"
                // }else if(dd.detail_type == '변형률'){
                //     searchValue = "value"
                // }else if(dd.detail_type =='온도'){
                //     searchValue = "value2"
                // }

                let sql = `
                SELECT A.idx,rcv_info_no,B.ip_address,port,sensor_type,A.occur_dt,description,monitoring FROM "TB_HISTORY_HT_ROUTER" as A LEFT JOIN "TB_RCV_MT_INFO" as B ON A.rcv_info_no = B.rcv_no
                WHERE ap_type='${sensor_type_nm}' AND A.occur_dt::timestamp BETWEEN ('${start_date}')::timestamp AND ('${end_date}')::timestamp ORDER BY reg_dt
                `


                let sensorData = await postgres(sql)
                // console.log(sensorData,"확인");


                return res.json({ sensorData })

            }

        } else {
            return res.json([])
        }
    } catch (error) {
        console.log(error, "ap log 오류");
        return res.status(400).json(error)
    }


}








const logController = {
    serverLogHistory,
    netLogHistory,
    sensorLogHistory,
    routerLogHistory

}
module.exports = logController
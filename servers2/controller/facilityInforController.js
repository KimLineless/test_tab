const postgres = require("../postgres")
const postgresNeo = require("../postgresNeo")

// const iniparser = require("iniparser");

// function sqlReplace(str) {
//   let result = "";
//   if(str != null)
//       result = chkNull(replace(str, "'", ""));

//       result = chkNull(replace(str, ";", ""));

//       result = chkNull(replace(str, "--", ""));

//       result = chkNull(replace(str, "|", ""));

//       result = chkNull(replace(str, ":", ""));

//       result = chkNull(replace(str, "+", ""));

//       result = chkNull(replace(str, "/", ""));

//       result = chkNull(replace(str, "/", ""));

//       result = chkNull(replace(str.toLowerCase(), "select", ""));

//       result = chkNull(replace(str.toLowerCase(), "update", ""));

//       result = chkNull(replace(str.toLowerCase(), "delete", ""));

//       result = chkNull(replace(str.toLowerCase(), "insert", ""));

//       result = "'"+result+"'";

//      //필터 추가 ---
//   return result;
// }

//시설정보　등록수정삭제조회
const FacilInfoCRUD = async (req, res) => {
    try {
        console.log(req.body, "crud 확인");
        let dd = req.body;
        var insertsql
        var updatesql
        var thresholdsql = ";"


        let dbnm;
        let colnm
        let facil_type = dd.type;
        let facil_type2 = dd.type
        if (dd.type == "center") {
            facil_type = 'EDGE'
        } else if (dd.type == "server" || dd.type == "sensor") {
            facil_type = (dd.type).toUpperCase();
        } else if (dd.type == "ap") {
            facil_type = "ROUTER"
            facil_type2 = "router"
        } else if (dd.type == "switch") {
            facil_type = "NETWORK"
            facil_type2 = "network"
        }


        let severity = 1
        if (dd.monitoring !== 'Y') {
            severity = 4
        }

        let ap_id = 0
        let edge_id = 0
        let ict_id = 0

        if (dd.ap_id) {
            ap_id = dd.ap_id
        }
        if (dd.edgeId) {
            edge_id = dd.edgeId
        }
        if (dd.ict_id) {
            ict_id = dd.ictId
        }





        //등록
        if (dd.mode == "insert") {



            //엣지센터　아닐때　info저장　안함
            if (dd.type != "center") {
                let sql1 = `INSERT INTO public."TB_RCV_MT_INFO"
                (rcv_no, ip_address, "type", description, monitoring,severity,ict_id,edge_id,ap_id,reg_dt,facil_name)
                VALUES((SELECT max(rcv_no::int)+1 FROM "TB_RCV_MT_INFO"),'${dd.ip}', '${dd.type}', '${dd.name}', '${dd.monitoring}','${severity}',${ict_id},${edge_id},${ap_id},now(),'${dd.name}')returning rcv_no;`
                // console.log(sql1,"???");
                let idx = await postgres(sql1);
                var rcv_no = idx[0].rcv_no;
            }

            if (dd.type == "ap") {
                insertsql = `INSERT INTO public."TB_RCV_MT_ROUTER_INFO"
                (ap_mac, ap_serial, ap_vendor, ap_model, ap_name, ap_reg_time, ap_sido, ap_sigungu, ap_dong, ap_location, ap_lat, ap_lng, ap_description, ap_status, ap_memo, ap_ip, rcv_info_no)
                VALUES('mac','${dd.serial}', '${dd.vendor}', '${dd.model}', '${dd.name}', now(), '${dd.sido}', '${dd.sigungu}', '${dd.dong}', '${dd.location}', '${dd.lat}', '${dd.lang}', '${dd.description}', 'Online', '${dd.memo}', '${dd.ip}','${rcv_no}');`

            } else if (dd.type == "sensor") {
                insertsql = `INSERT INTO public."TB_RCV_MT_SENSOR_INFO"
                (rcv_info_no, sensor_serial, sensor_vendor, sensor_model, sensor_name, sensor_reg_time, sensor_sido, sensor_sigungu, sensor_dong, sensor_location, sensor_lat, sensor_lng, sensor_description, sensor_ip,sensor_id,sensor_pwd)
                VALUES('${rcv_no}','${dd.sensor_serial}', '${dd.vendor}', '${dd.model}', '${dd.name}', now(), '${dd.sido}', '${dd.sigungu}', '${dd.dong}', '${dd.location}', '${dd.lat}', '${dd.lang}', '${dd.description}', '${dd.ip}', '${dd.id}','${dd.pwd}');`
            } else if (dd.type == "server") {
                insertsql = `INSERT INTO public."TB_RCV_MT_SERVER_INFO"
                (rcv_info_no, server_serial, server_vendor, server_model, server_name, server_reg_time, server_sido, server_sigungu, server_dong, server_location, server_lat, server_lng, server_description,server_memo, server_ip, server_id, server_pwd)
                VALUES('${rcv_no}', '${dd.serial}', '${dd.vendor}', '${dd.model}', '${dd.name}', now(), '${dd.sido}', '${dd.sigungu}', '${dd.dong}', '${dd.location}', '${dd.lat}', '${dd.lang}', '${dd.description}','${dd.memo}', '${dd.ip}', '${dd.id}', '${dd.pwd}');`;



                if (dd.threshold && dd.scrap) {
                    if ((Number(dd.threshold.length) > 0) && (Number(dd.scrap.length) > 0)) {
                        let threshold_point = dd.threshold;
                        let scrap = dd.scrap
                        let facil_name = dd.name
                        let thressql = `INSERT INTO public."TB_EVENT_THRESHOLD"
                    (rcv_info_no, unit, threshold_point, reg_dt,scrap,facil_type,long_time)
                    VALUES($1, '%', $2, now(),$3,$4,$5)`
                        await postgresNeo(thressql, [rcv_no, threshold_point, scrap, facil_name, dd.arlamTime])

                    }
                }

            } else if (dd.type == "switch") {
                insertsql = `INSERT INTO public."TB_RCV_MT_NETWORK_INFO"
                (rcv_info_no, net_serial, net_vendor, net_model, net_name, net_reg_time, net_sido, net_sigungu, net_dong, net_location, net_lat, net_lng, net_description,  net_memo, net_ip, net_id, net_pwd)
                VALUES('${rcv_no}', '${dd.serial}', '${dd.vendor}', '${dd.model}', '${dd.name}', now(), '${dd.sido}', '${dd.sigungu}', '${dd.dong}', '${dd.location}', '${dd.lat}', '${dd.lang}', '${dd.description}',  '${dd.memo}', '${dd.ip}', '${dd.id}', '${dd.pwd}');`;



                if (dd.threshold && dd.scrap) {
                    if ((Number(dd.threshold.length) > 0) && (Number(dd.scrap.length) > 0)) {
                        let scrap = dd.scrap
                        let facil_name = dd.name

                        let thressql = `INSERT INTO public."TB_EVENT_THRESHOLD"
                    (rcv_info_no, unit, threshold_point, reg_dt,scrap,facil_type,long_time)
                    VALUES($1, '%', $2, now(),$3,$4,$5)`
                        await postgresNeo(thressql, [rcv_no, threshold_point, scrap, facil_name, dd.arlamTime])

                    }
                }

            } else if (dd.type == "center") {

                insertsql = `INSERT INTO public."TB_RCV_MT_EDGE_INFO"
                (edge_name, edge_group_info, severity, reg_dt, edge_type, edge_sido, edge_sigungu, edge_dong, edge_location, edge_lat, edge_lng, edge_description,monitoring)
                VALUES('${dd.edge_Name}', 1, '${severity}', now(), '${dd.edge_Type}', '${dd.edge_sido}', '${dd.edge_sigungu}', '${dd.edge_dong}', '${dd.edge_location}', '${dd.edge_lat}', '${dd.edge_Ing}', '${dd.edge_description}','${dd.monitoring}');`
            }

            // if (isNaN(dd.lat) || isNaN(dd.lang)) {
            //     console.log("숫자　아님");
            //     return res.json("위도，경도 값을　확인해주세요")
            // }else{

            // console.log(insertsql);
            await postgres(insertsql);
            let endInsert = 200;
            let mode = "insert"
            return res.json({ endInsert, mode })
            // }




        }
        //삭제
        else if (dd.mode == "delete") {
            let deletesql
            if (dd.type == "center") {
                deletesql = `DELETE FROM "TB_RCV_MT_EDGE_INFO" WHERE idx=${dd.idx}`
            } else {
                let rcv_no = dd.rcv_no
                deletesql = `DELETE FROM "TB_RCV_MT_${facil_type}_INFO" WHERE rcv_info_no='${rcv_no}';DELETE FROM public."TB_RCV_MT_INFO" WHERE rcv_no='${rcv_no}'; `
                thresql = `DELETE FROM public."TB_EVENT_THRESHOLD" WHERE  rcv_info_no=$1 ;`
                await postgresNeo(thresql, [rcv_no])
            }
            // console.log(deletesql);
            await postgres(deletesql);

            let mode = "delete"
            let endInsert = 200;
            return res.json({ endInsert, mode })

        }
        //수정
        else if (dd.mode == "modify") {


            let updateWheresql = `WHERE rcv_info_no='${dd.rcv_no}'`;
            if (dd.type !== 'center') {
                let infoupdatesql = `UPDATE public."TB_RCV_MT_INFO"
                SET ip_address='${dd.ip}',reg_dt=now(), description='${dd.description}', monitoring='${dd.monitoring}', severity='${severity}',ict_id=${ict_id}, edge_id=${edge_id}, ap_id=${ap_id}, facil_name='${dd.name}'
                 WHERE rcv_no ='${dd.rcv_no}';`

                await postgres(infoupdatesql)
            }
            if (dd.type == 'center') {

                if (dd.monitoring == 'N') {

                    let infoSql = `SELECT rcv_no FROM "TB_RCV_MT_INFO" WHERE edge_id =$1`
                    let infodata = await postgresNeo(infoSql, [dd.idx])
                    let update_rcv_no = [];
                    for (let i = 0; infodata.length > i; i++) {
                        update_rcv_no.push(infodata[i].rcv_no)
                    }

                    let monitoringupdateSql = `UPDATE "TB_RCV_MT_INFO" SET monitoring='N' WHERE rcv_no IN(${update_rcv_no});`
                    // console.log(monitoringupdateSql);
                    await postgres(monitoringupdateSql)
                }

                updatesql = `UPDATE  "TB_RCV_MT_EDGE_INFO" SET edge_name='${dd.edge_Name}', edge_type='${dd.edge_Type}', edge_sido='${dd.edge_sido}', 
                edge_sigungu='${dd.edge_sigungu}', edge_dong='${dd.edge_dong}', edge_location='${dd.edge_location}', edge_lat='${dd.edge_lat}', edge_lng='${dd.edge_Ing}',
                 edge_description='${dd.edge_description}',monitoring ='${dd.monitoring}',severity='${severity}' WHERE idx=${dd.idx};`



                // SET idx=nextval('"TB_RCV_MT_EDGE_INFO_idx_seq"'::regclass), edge_name='', edge_group_info='', edge_status='', reg_dt='', edge_type='', edge_sido='', edge_sigungu='', edge_dong='', edge_location='', edge_lat='', edge_lng='', edge_description='';
            } else if (dd.type == "server") {

                updatesql = `UPDATE public."TB_RCV_MT_SERVER_INFO"
                SET server_serial='${dd.serial}', server_vendor='${dd.vendor}', server_model='${dd.model}', server_name='${dd.name}', server_sido='${dd.sido}', server_sigungu='${dd.sigungu}', server_dong='${dd.dong}', server_location='${dd.location}', 
                server_lat='${dd.lat}', server_lng='${dd.lang}', server_description='${dd.description}', server_ip='${dd.ip}', server_id='${dd.id}', server_pwd='${dd.pwd}' ${updateWheresql};`



                if ((dd.threshold) && (dd.scrap)) {
                    if ((Number(dd.threshold.length) > 0) && (Number(dd.scrap.length) > 0)) {


                        let threshold_point = dd.threshold;
                        let scrap = dd.scrap
                        let rcv_no = dd.rcv_no
                        let facil_name = dd.name
                        let long_time = dd.arlamTime

                        let thressql = `INSERT INTO public."TB_EVENT_THRESHOLD"
                   (rcv_info_no, unit, threshold_point, reg_dt,scrap,facil_type,long_time)
                   VALUES($1, '%', $2, now(),$3,$4,$5) on conflict ON CONSTRAINT tb_event_threshold_uq DO UPDATE SET threshold_point=$2,  scrap=$3, chg_dt=now(),facil_type=$4, long_time =$5;`
                        await postgresNeo(thressql, [rcv_no, threshold_point, scrap, facil_name, long_time])
                        // let thressql = `UPDATE public."TB_EVENT_THRESHOLD"
                        // SET threshold_point=$1,  scrap=$2, chg_dt=now(),facil_type=$4 WHERE rcv_info_no =$3;`
                        // await postgresNeo(thressql, [threshold_point, scrap, rcv_no,facil_name])
                    } else {
                        let delthresql = `DELETE FROM public."TB_EVENT_THRESHOLD" WHERE  rcv_info_no='${dd.rcv_no}' ;`
                        console.log(delthresql, "?ZZ?Z??Z?Z");
                        await postgresNeo(delthresql)
                    }
                }
            } else if (dd.type == "switch") {
                updatesql = `UPDATE public."TB_RCV_MT_NETWORK_INFO"
                SET  net_serial='${dd.serial}', net_vendor='${dd.vendor}', net_model='${dd.model}', net_name='${dd.name}', net_sido='${dd.sido}', net_sigungu='${dd.sigungu}', net_dong='${dd.dong}', net_location='${dd.location}',
                 net_lat='${dd.lat}', net_lng='${dd.lang}', net_description='${dd.description}', net_memo='${dd.memo}', net_ip='${dd.ip}', net_id='${dd.id}', net_pwd='${dd.pwd}'  ${updateWheresql};`

                //임계값　처리

                if ((dd.threshold) && (dd.scrap)) {
                    if ((Number(dd.threshold.length) > 0) && (Number(dd.scrap.length) > 0)) {

                        // console.log("된거");
                        let threshold_point = dd.threshold;
                        let scrap = dd.scrap
                        let rcv_no = dd.rcv_no
                        let facil_name = dd.name

                        let thressql = `INSERT INTO public."TB_EVENT_THRESHOLD"
                   (rcv_info_no, unit, threshold_point, reg_dt,scrap,facil_type,long_time)
                   VALUES(${rcv_no}, 'Kbs', '${threshold_point}', now(),'${scrap}','${facil_name}','${dd.arlamTime}') on conflict ON CONSTRAINT tb_event_threshold_uq 
                   DO UPDATE SET threshold_point='${threshold_point}',  scrap='${scrap}', chg_dt=now(),facil_type='${facil_name}',long_time ='${dd.arlamTime}';`
                        await postgres(thressql)
                        // console.log(thressql, "??????????????????");


                        // NSERT INTO public."TB_EVENT_IT_CURRENT"(rcv_info_no, ip_address, event_nm, event_cnt, event_point, reg_dt, chg_dt,detail_type, status, severity,unit,threshold_no)
                        // VALUES('${rcv_info_no}', '${ip_address}', 'memory 값이상', 0, '${avg_user}', now(), now(), 'memory', '이상', '2', '%',${threshold_idx})
                        // ON conflict ON CONSTRAINT event_current_uq DO UPDATE SET chg_dt = now(),event_cnt="TB_EVENT_IT_CURRENT".event_cnt+1,event_point='${avg_user}';
                        // UPDATE "TB_RCV_MT_INFO" SET severity='2', reg_dt=now() WHERE rcv_no='${rcv_info_no}';  
                        // UPDATE "TB_RCV_MT_SERVER_INFO" SET server_status='이상';
                    }
                } else {
                    // console.log("d안된거");
                    let rcv_no = dd.rcv_no
                    let delthresql = `DELETE FROM public."TB_EVENT_THRESHOLD" WHERE  rcv_info_no=${rcv_no} ;`
                    // console.log(delthresql);
                    await postgres(delthresql)

                }

            } else if (dd.type == "ap") {

                if (dd.monitoring == 'N') {

                    let infoSql = `SELECT rcv_no FROM "TB_RCV_MT_INFO" WHERE ap_id =$1`
                    let infodata = await postgresNeo(infoSql, [dd.idx])
                    let update_rcv_no = [];
                    for (let i = 0; infodata.length > i; i++) {
                        update_rcv_no.push(infodata[i].rcv_no)
                    }
                    if (update_rcv_no.length > 0) {
                        let monitoringupdateSql = `UPDATE "TB_RCV_MT_INFO" SET monitoring='N' WHERE rcv_no IN(${update_rcv_no});`
                        await postgres(monitoringupdateSql)
                    }


                }

                updatesql = `UPDATE public."TB_RCV_MT_ROUTER_INFO"
                SET  ap_mac='', ap_serial='${dd.serial}', ap_vendor='${dd.vendor}', ap_model='${dd.model}', ap_name='${dd.name}',  ap_sido='${dd.sido}', ap_sigungu='${dd.sigungu}', ap_dong='${dd.dong}', ap_location='${dd.location}', 
                ap_lat='${dd.lat}', ap_lng='${dd.lang}', ap_description='${dd.description}', ap_memo='${dd.memo}', ap_ip='${dd.ip}',ap_id='${dd.id}',ap_pwd='${dd.pwd}' ${updateWheresql};`


            } else if (dd.type == "sensor") {
                updatesql = `UPDATE public."TB_RCV_MT_SENSOR_INFO"
                SET sensor_serial='${dd.sensor_serial}', sensor_vendor='${dd.vendor}', sensor_model='${dd.model}', sensor_name='${dd.name}', sensor_sido='${dd.sido}', sensor_sigungu='${dd.sigungu}', sensor_dong='${dd.dong}', sensor_location='${dd.location}',
                 sensor_lat='${dd.lat}', sensor_lng='${dd.lang}', sensor_description='${dd.description}', sensor_ip='${dd.ip}', sensor_id='${dd.id}',sensor_pwd='${dd.pwd}' ${updateWheresql} `
            }
            // if (isNaN(dd.lat) || isNaN(dd.lang)) {
            //     console.log("숫자　아님");
            //     return res.json("위도，경도 값을　확인해주세요")
            // }else{

            console.log(updatesql);
            await postgres(updatesql);
            let endInsert = 200;
            let mode = "modify"
            return res.json({ endInsert, mode })
            // }
        }


    } catch (error) {
        console.log(error);
        return res.status(400).json({ error })
    }
}

//전체　시설물　보여주기
const allFacilInfo = async (req, res) => {
    try {
        // console.log(req.body, "엣지센터　확인");

        let orderbySql = `ORDER BY rcv_no`
        // let routerSql = `SELECT *,A.idx as web_idx FROM "TB_RCV_MT_INFO" as A JOIN "TB_RCV_MT_ROUTER_INFO" as B ON A.rcv_no = B.rcv_info_no LEFT JOIN "TB_RCV_MT_EDGE_INFO" as C ON A.edge_id=C.idx ;`
        /////라우터
        let routerSql = `SELECT *,B.idx as web_idx,A.idx as ap_idx,A.ap_id as router_id  FROM "TB_RCV_MT_ROUTER_INFO" as A  
     LEFT JOIN "TB_RCV_MT_INFO" as B ON A.rcv_info_no = B.rcv_no  `
        let AllrouterSql = `${routerSql} ${orderbySql}`
        let routerInfo = await postgres(AllrouterSql);

        // console.log(routerInfo, "????????????????");

        let apName = []
        for (let i = 0; i < routerInfo.length; i++) {
            apName.push({ ap_name: routerInfo[i].ap_name, ap_idx: routerInfo[i].ap_idx, edge_id: routerInfo[i].edge_id })
        }

        //네트워크
        let networkSql = `  
     SELECT *,A.idx as web_idx FROM "TB_RCV_MT_NETWORK_INFO" as A 
     LEFT JOIN "TB_RCV_MT_INFO" as B ON A.rcv_info_no = B.rcv_no 
     LEFT JOIN "TB_EVENT_THRESHOLD" as C ON b.rcv_no::int = C.rcv_info_no `
        let AllnetworkSql = `${networkSql} ${orderbySql}`
        let networkInfo = await postgres(AllnetworkSql)

        //서버
        let serverSql = `SELECT *,A.idx as web_idx FROM "TB_RCV_MT_SERVER_INFO" as A 
     LEFT JOIN "TB_RCV_MT_INFO" as B ON A.rcv_info_no = B.rcv_no 
     LEFT JOIN "TB_EVENT_THRESHOLD" as C ON b.rcv_no::int = C.rcv_info_no `
        let AllserverSql = `${serverSql} ${orderbySql}`
        let serverInfo = await postgres(AllserverSql);


        //센서
        let sensorSql = `	SELECT *,B.idx as web_idx FROM "TB_RCV_MT_SENSOR_INFO" as A 
     LEFT JOIN "TB_RCV_MT_INFO" as B ON A.rcv_info_no = B.rcv_no `
        // let sensorSql = `SELECT *,A.idx as web_idx FROM "TB_RCV_MT_INFO" as A JOIN "TB_RCV_MT_SENSOR_INFO" as B ON A.rcv_no = B.rcv_info_no LEFT JOIN "TB_RCV_MT_EDGE_INFO" as C ON A.edge_id=C.idx;`
        let AllsensorSql = `${sensorSql} ${orderbySql}`
        let sensorInfo = await postgres(AllsensorSql);

        //엣지센터
        let edgeSql = `SELECT * FROM "TB_RCV_MT_EDGE_INFO" `
        let edgeInfo = await postgres(edgeSql);



        //ict센터
        let ictSql = `SELECT * FROM "TB_RCV_MT_ICT_INFO" `
        let ictInfo = await postgres(ictSql)


        // console.log(ict);

        // console.log(routerInfo);



        return res.json({ routerInfo, networkInfo, serverInfo, sensorInfo, apName, edgeInfo, ictInfo })

    } catch (error) {

        console.log(error);
        return res.status(400).json(error)

    }
}


//현재시설물　목록　데이터　（많이씀）
const getFacilInfo = async (req, res) => {
    try {
        // console.log(req.body, "엣지센터　확인");

        let monitoringSql = ` AND monitoring ='Y'`
        let monitoringSql2 = ` WHERE monitoring='Y'`
        let orderbySql = `ORDER BY rcv_no`
        // let routerSql = `SELECT *,A.idx as web_idx FROM "TB_RCV_MT_INFO" as A JOIN "TB_RCV_MT_ROUTER_INFO" as B ON A.rcv_no = B.rcv_info_no LEFT JOIN "TB_RCV_MT_EDGE_INFO" as C ON A.edge_id=C.idx ;`
        let routerSql = `SELECT *,B.idx as web_idx,A.idx as ap_idx,A.ap_id as router_id FROM "TB_RCV_MT_ROUTER_INFO" as A  
        LEFT JOIN "TB_RCV_MT_INFO" as B ON A.rcv_info_no = B.rcv_no WHERE edge_id=1 `
        let AllrouterSql = `${routerSql} ${orderbySql}`
        let routerInfo = await postgres(AllrouterSql);
        routerSql += `${monitoringSql}  ${orderbySql}`
        let YrouterInfo = await postgres(routerSql)

        // console.log(routerInfo, "????????????????");

        let apName = []
        for (let i = 0; i < routerInfo.length; i++) {
            apName.push({ ap_name: routerInfo[i].ap_name, ap_idx: routerInfo[i].ap_idx, edge_id: routerInfo[i].edge_id })
        }
        // console.log(apName, "????????????????");


        let networkSql = `  
		SELECT *,A.idx as web_idx FROM "TB_RCV_MT_NETWORK_INFO" as A 
		LEFT JOIN "TB_RCV_MT_INFO" as B ON A.rcv_info_no = B.rcv_no 
		LEFT JOIN "TB_EVENT_THRESHOLD" as C ON b.rcv_no::int = C.rcv_info_no WHERE edge_id=1 OR ict_id =1 `

        let AllnetworkSql = `${networkSql} ${orderbySql}`
        let networkInfo = await postgres(AllnetworkSql);
        networkSql += `${monitoringSql}  ${orderbySql}`
        let YnetworkInfo = await postgres(networkSql)

        let serverSql = `SELECT *,A.idx as web_idx FROM "TB_RCV_MT_SERVER_INFO" as A 
		LEFT JOIN "TB_RCV_MT_INFO" as B ON A.rcv_info_no = B.rcv_no 
		LEFT JOIN "TB_EVENT_THRESHOLD" as C ON b.rcv_no::int = C.rcv_info_no WHERE edge_id=1 `



        let AllserverSql = `${serverSql} ${orderbySql}`
        let serverInfo = await postgres(AllserverSql);
        serverSql += `${monitoringSql}  ${orderbySql}`
        let YserverInfo = await postgres(serverSql)

        let sensorSql = `	SELECT *,B.idx as web_idx FROM "TB_RCV_MT_SENSOR_INFO" as A 
		LEFT JOIN "TB_RCV_MT_INFO" as B ON A.rcv_info_no = B.rcv_no WHERE edge_id=1 `
        // let sensorSql = `SELECT *,A.idx as web_idx FROM "TB_RCV_MT_INFO" as A JOIN "TB_RCV_MT_SENSOR_INFO" as B ON A.rcv_no = B.rcv_info_no LEFT JOIN "TB_RCV_MT_EDGE_INFO" as C ON A.edge_id=C.idx;`
        let AllsensorSql = `${sensorSql} ${orderbySql}`
        let sensorInfo = await postgres(AllsensorSql);
        sensorSql += `${monitoringSql}  ${orderbySql}`
        let YsensorInfo = await postgres(sensorSql)

        let edgeSql = `SELECT * FROM "TB_RCV_MT_EDGE_INFO" `
        let edgeInfo = await postgres(edgeSql);
        edgeSql += `${monitoringSql2} `
        let YedgeInfo = await postgres(edgeSql);



        let ictSql = `SELECT * FROM "TB_RCV_MT_ICT_INFO" `
        // let ictfacilSql =`SELECT * FROM public."TB_RCV_MT_INFO" WHERE ict_id=1`
        let ictInfo = await postgres(ictSql)
        // let ictfacilInfo = await postgres(ictInfo)
        ictSql += `${monitoringSql2}`
        let YictInfo = await postgres(ictSql)

        // console.log(ict);

        // console.log(routerInfo);



        return res.json({ routerInfo, YrouterInfo, networkInfo, YnetworkInfo, serverInfo, YserverInfo, sensorInfo, YsensorInfo, apName, edgeInfo, YedgeInfo, ictInfo, YictInfo })


    } catch (error) {
        console.log(error);
        return res.status(400).json({ error })
    }
}

//현재　안씀
const selectFacilList = async (req, res) => {
    // try {
    //     console.log(req.body, "select req");
    //     let dd = req.body
    //     let table_nm = dd.facil_type.toUpperCase();
    //     var facilList
    //     var edgeList

    //     //엣지센터 전체일때　
    //     if (dd.edge_type == "all") {
    //         let facilsql = `SELECT * FROM "TB_RCV_MT_INFO" `
    //         let edgesql = `SELECT * FROM "TB_RCV_MT_EDGE_INFO" WHERE 1=1 `
    //         if (dd.facil_type != "all") {

    //             facilsql += `as A JOIN "TB_RCV_MT_${table_nm}_INFO" as B ON A.rcv_no = B.rcv_info_no AND type = '${dd.facil_type}'`

    //         } else {
    //             facilList = []
    //             let facilArr = ["SERVER", "NETWORK", "ROUTER", "SENSOR"]

    //             for (let i = 0; facilArr.length > i; i++) {
    //                 let facilsql1 = `SELECT * FROM "TB_RCV_MT_INFO" as A JOIN "TB_RCV_MT_${facilArr[i]}_INFO" as B ON A.rcv_no = B.rcv_info_no ORDER BY  A.idx`
    //                 let facilData = await postgres(facilsql1)
    //                 facilList.push(...facilData);
    //             }

    //         }
    //         edgeList = await postgres(edgesql);
    //         facilList = await postgres(facilsql)
    //     }
    //     //엣지센터 선택일때
    //     else {
    //         let facilsql = `SELECT * FROM "TB_RCV_MT_INFO"`
    //         let edgesql = `SELECT * FROM "TB_RCV_MT_EDGE_INFO" WHERE 1=1 AND idx=${dd.edge_type} ORDER BY  idx`
    //         if (dd.facil_type != "all") {

    //             facilsql += `as A JOIN "TB_RCV_MT_${table_nm}_INFO" as B ON A.rcv_no = B.rcv_info_no AND type = '${dd.facil_type}' AND A.edge_id =${dd.edge_type} ORDER BY A.idx `
    //         } else {
    //             facilList = []
    //             let facilArr = ["SERVER", "NETWORK", "ROUTER", "SENSOR"]

    //             for (let i = 0; facilArr.length > i; i++) {
    //                 let facilsql1 = `SELECT * FROM "TB_RCV_MT_INFO" as A JOIN "TB_RCV_MT_${facilArr[i]}_INFO" as B ON A.rcv_no = B.rcv_info_no WHERE A.edge_id=${dd.edge_type}`
    //                 let facilData = await postgres(facilsql1)
    //                 facilList.push(...facilData);
    //             }
    //         }
    //         edgeList = await postgres(edgesql);
    //         facilList = await postgres(facilsql)
    //     }

    //     // console.log(facilList, "시설물");
    //     return res.json({ edgeList, facilList })

    // } catch (error) {
    //     console.log(error);
    //     return res.status(400).json(error)
    // }
}



// const facilAlarmSetting = async(req,res)=>{
//     try{

//     }catch(error){
//         console.log(error);
//         return res.status(400).json(error)
//     }
// }


const facilityInforController = {
    FacilInfoCRUD,
    getFacilInfo,
    selectFacilList,
    allFacilInfo,

}
module.exports = facilityInforController
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import "./App.css";
import { Tab, Tabs, Table } from "react-bootstrap";
import Axios from "axios";
import Item from "antd/es/list/Item";

function App() {
  const [edge, setEdge] = useState([]);
  const [net, setNet] = useState([]);
  const [rou, setRou] = useState([]);
  const [sensor, setSensor] = useState([]);
  const [server, setServer] = useState([]);
  const [title, setTitle] = useState([]);
  const [name, setName] = useState([]);
  // const [edgeId, setEdgeId] = useState(1);

  useEffect(() => {
    Axios.get("/api/allFacilInfo")
      .then(res => {
        if (res.status === 200) {
          console.log(res.data);
          setEdge(res.data?.edgeInfo);
          setNet(
            res.data?.networkInfo.sort(function (a, b) {
              return a.rcv_no - b.rcv_no;
            }),
          );
          setRou(
            res.data?.routerInfo.sort(function (a, b) {
              return a.rcv_no - b.rcv_no;
            }),
          );
          setSensor(
            res.data?.sensorInfo.sort(function (a, b) {
              return a.rcv_no - b.rcv_no;
            }),
          );
          setServer(
            res.data?.serverInfo.sort(function (a, b) {
              return a.rcv_no - b.rcv_no;
            }),
          );
        }
      })
      .catch(e => {
        console.log(e, "error");
      });
  }, []);

  const mapToName = (arr, key) => arr.map(obj => ({ name: obj?.[key] }));

  const edgeName = mapToName(edge, "edge_name");
  // const serverName = mapToName(server, "edge_id");
  // const netName = mapToName(net, "edge_id");
  // const rouName = mapToName(rou, "edge_id");
  // const sensorName = mapToName(sensor, "edge_id");

  const edgeList = [{ name: "전체" }, ...edgeName];

  const renderTableRows = data => {
    console.log(data);
    let filteredDataArr = [];
    const filteredData =
      name === "전체"
        ? (filteredDataArr = data)
        : data?.map(item => {
            console.log(item);
            console.log(item.edge_id);
            if (item.edge_id === 1) {
              console.log(item);
              filteredDataArr.push(item);
            } else if (item.edge_id === 2) {
              filteredDataArr.push(item);
            } else if (item.edge_id === 3) {
              filteredDataArr.push(item);
            }
            console.log(filteredDataArr);
          });

    return filteredDataArr.map((a, i) => {
      return (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{a?.rcv_no || a?.idx}</td>
          <td>{a?.facil_name || a?.edge_name || "-"}</td>
        </tr>
      );
    });
  };

  const TopTable = (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>순번</th>
          <th>장치ID</th>
          <th>장비명칭</th>
        </tr>
      </thead>
      <tbody>
        {(() => {
          switch (title) {
            case "센터":
              return renderTableRows(edge);
            case "서버":
              return renderTableRows(server);
            case "스위치":
              return renderTableRows(net);
            case "라우터":
              return renderTableRows(rou);
            case "센서":
              return renderTableRows(sensor);
            default:
              return renderTableRows(edge);
          }
        })()}
      </tbody>
    </Table>
  );

  const botTable = (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody></tbody>
    </Table>
  );

  const tableTabClick = e => {
    // console.log(list, "1111111");
    setTitle(e.target.innerHTML);
  };

  const innerTabClick = (e, edge) => {
    console.log(e.target.id, "22222222");
    setName(e.target.innerHTML);
  };

  const tabList = [
    { value: "center", title: "센터" },
    { value: "server", title: "서버" },
    { value: "switch", title: "스위치" },
    { value: "router", title: "라우터" },
    { value: "sensor", title: "센서" },
  ];

  // 시설정보 tab01
  return (
    <div className="App">
      <h3>시설정보</h3>
      <Tabs
        defaultActiveKey="center"
        id="uncontrolled-tab-example"
        className="mb-3"
        onClick={tableTabClick}
      >
        {tabList?.map((list, i) => (
          <Tab
            eventKey={list.value}
            title={list.title}
            value={list.value}
            key={i}
            // onClick={e => {
            //   tableTabClick(e, list);
            // }}
          >
            <Tabs
              defaultActiveKey="전체"
              id="uncontrolled-tab-example"
              className="mb-3"
              onClick={innerTabClick}
            >
              {edgeList?.map((edge, i) => (
                <Tab
                  eventKey={edge.name}
                  title={edge.name}
                  value={i.edge_id}
                  key={i}
                  // onClick={e => {
                  //   innerTabClick(e, edge);
                  // }}
                >
                  {TopTable}
                  <h3>상세시설정보</h3>
                  {botTable}
                </Tab>
              ))}
            </Tabs>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}

export default App;

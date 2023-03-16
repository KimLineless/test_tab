import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import "./App.css";
import { Tab, Tabs, Table } from "react-bootstrap";
import Axios from "axios";

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

  const edgeName = edge.map((a, i) => ({ name: edge[i]?.edge_name }));
  const serverEdgeId = server.map((a, i) => ({ name: server[i]?.edge_id }));
  const netEdgeId = net.map((a, i) => ({ name: net[i]?.edge_id }));
  const rouEdgeId = rou.map((a, i) => ({ name: rou[i]?.edge_id }));
  const sensorEdgeId = sensor.map((a, i) => ({ name: sensor[i]?.edge_id }));

  const edgeList = [{ name: "전체" }, ...edgeName];

  const renderTableRows = data => {
    const filteredData =
      name === "전체" ? data : data.filter(item => item?.edge_name === name);
    return filteredData.map((a, i) => (
      <tr key={i}>
        <td>{i + 1}</td>
        <td>{a?.rcv_no || a?.idx}</td>
        <td>{a?.facil_name || a?.edge_name}</td>
      </tr>
    ));
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

  const innerTabClick = e => {
    console.log(e.target.innerHTML, "1111111111111111");
    setName(e.target.innerHTML);
  };

  const tableTabClick = e => {
    console.log(e.target.innerHTML, "22222222222222222");
    setTitle(e.target.innerHTML);
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
          >
            <Tabs
              defaultActiveKey="전체"
              id="uncontrolled-tab-example"
              className="mb-3"
              onClick={innerTabClick}
            >
              {edgeList?.map((edge, i) => (
                <Tab eventKey={edge.name} title={edge.name} key={i}>
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

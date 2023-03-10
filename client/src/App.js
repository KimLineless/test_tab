import 'bootstrap/dist/css/bootstrap.min.css';
import React, {  useEffect, useState } from "react"
import './App.css';
import { Tab,Tabs,Table } from 'react-bootstrap';
import Axios from "axios"

function App() {

const [edge,setEdge] = useState([])
const [net,setNet] = useState([])
const [rou,setRou] = useState([])
const [sensor,setSensor] = useState([])
const [server,setServer] = useState([])

  useEffect(() => {
    Axios.get("/api/allFacilInfo")
  .then((res) => {
    if (res.status === 200) {
      console.log(res.data)
      setEdge(res.data?.edgeInfo)
      setNet(res.data?.networkInfo)
      setRou(res.data?.routerInfo)
      setSensor(res.data?.sensorInfo)
      setServer(res.data?.serverInfo)
    }
  
  }).catch ((e) => {
    console.log(e, "error")
  
  })
  
  }, [])

  let i = 0

  const edgeTopTable = (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>순번</th>
          <th>장치ID</th>
          <th>장비명칭</th>
        </tr>
      </thead>
      <tbody>
      <tr>
          <td>{edge[i]?.idx}</td>
          <td>{edge[i]?.idx}</td>
          <td>{edge[i]?.edge_name}</td>
        </tr>
        <tr>
          <td>{edge[i+1]?.idx}</td>
          <td>{edge[i+1]?.idx}</td>
          <td>{edge[i+1]?.edge_name}</td>
        </tr>
        <tr>
          <td>{edge[i+2]?.idx}</td>
          <td>{edge[i+2]?.idx}</td>
          <td>{edge[i+2]?.edge_name}</td>
        </tr>
      </tbody>
    </Table>
  )

  const edgeInnerTab = (
    <Tabs
    defaultActiveKey="all"
    id="uncontrolled-tab-example"
    className="mb-3">
      <Tab eventKey="all" title="전체">
        {edgeTopTable}
      </Tab>
      <Tab eventKey="gonziam" title="곤지암 엣지센터">
        {edgeTopTable}
      </Tab>
      <Tab eventKey="edge2" title="엣지센터2">
        {edgeTopTable}
      </Tab>
      <Tab eventKey="edge3" title="엣지센터3">
        {edgeTopTable}
      </Tab>
    </Tabs>
  );
  

  return (
    <div className="App">
      <h3>시설정보</h3>
      <Tabs
      defaultActiveKey="center"
      id="uncontrolled-tab-example"
      className="mb-3">
        <Tab eventKey="center" title="센터">
          {edgeInnerTab}
        </Tab>
        <Tab eventKey="server" title="서버">
          {edgeInnerTab}
        </Tab>
        <Tab eventKey="switch" title="스위치">
          {edgeInnerTab}
        </Tab>
        <Tab eventKey="router" title="라우터">
          {edgeInnerTab}
        </Tab>
        <Tab eventKey="sensor" title="센서">
          {edgeInnerTab}
        </Tab>
      </Tabs>
    </div>
  );
}

export default App;

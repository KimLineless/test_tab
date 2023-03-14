import 'bootstrap/dist/css/bootstrap.min.css';
import React, {  useEffect, useState } from "react"
import './App.css';
import { Tab,Tabs,Table } from 'react-bootstrap';
import Axios from "axios"
import {rouBot} from './TableBotData';

function App() {

const [edge,setEdge] = useState([])
const [net,setNet] = useState([])
const [rou,setRou] = useState([])
const [sensor,setSensor] = useState([])
const [server,setServer] = useState([])
const [title ,setTitle] = useState([])
const [name , setName] = useState([])

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

  const edgeList = [
    {
      name: "전체"
    },
    {
      name:"곤지암 엣지센터"
    },
    {
      name:"엣지2"
    },
    {
      name:"엣지3"
    }
  ]

  const edge2= [1]
  const server2= [1,2]
  const switch2= [1,2,3]
  const sensor2= [1,2,3,4,5,6,7,8,9]
  
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
      {
        title === "센터" && name === "전체"?edge.map(function(a,i){
          return(
        <tr key={i}>
          <td>{i+1}</td>
          <td>{i+1}</td>
          <td>{a?.edge_name}</td>
        </tr>
          )
        }):title ==="센터" && name === "곤지암 엣지센터"?edge2.map(function(a,i){
          return(
        <tr key={i}>
          <td>{i+1}</td>
          <td>{i+1}</td>
          <td>{edge[0]?.edge_name}</td>
        </tr>
          )
        }):title ==="센터" && name === "엣지2"?edge2.map(function(a,i){
          return(
        <tr key={i}>
          <td>{i+2}</td>
          <td>{i+2}</td>
          <td>{edge[1]?.edge_name}</td>
        </tr>
          )
        }):title ==="센터" && name === "엣지3"?edge2.map(function(a,i){
          return(
        <tr key={i}>
          <td>{i+3}</td>
          <td>{i+3}</td>
          <td>{edge[2]?.edge_name}</td>
        </tr>
          )
        }):title === "센터"?edge.map(function(a,i){
          return(
        <tr key={i}>
          <td>{i+1}</td>
          <td>{i+1}</td>
          <td>{a?.edge_name}</td>
        </tr>
          )
        }):title ==="서버" && name === "전체"?server.map(function(a,i){
          return(
        <tr key={i}>
          <td>{i+1}</td>
          <td>{i+1}</td>
          <td>{a.facil_name}</td>
        </tr>
          )
        }):title ==="서버" && name === "곤지암 엣지센터"?server2.map(function(a,i){
          return(
        <tr key={i}>
          <td>{i+1}</td>
          <td>{i+1}</td>
          <td>{server[i].facil_name}</td>
        </tr>
          )
        }):title ==="서버" && name === "엣지2"?server2.map(function(a,i){
          return(
        <tr key={i}>
          <td>{i+3}</td>
          <td>{i+3}</td>
          <td>{server[i+2].facil_name}</td>
        </tr>
          )
        }):title ==="서버" && name === "엣지3"?server2.map(function(a,i){
          return(
        <tr key={i}>
          <td>{i+5}</td>
          <td>{i+5}</td>
          <td>{server[i+4].facil_name}</td>
        </tr>
          )
        }):title ==="서버"?server.map(function(a,i){
          return(
        <tr key={i}>
          <td>{i+1}</td>
          <td>{i+1}</td>
          <td>{a.facil_name}</td>
        </tr>
          )
        }):title ==="스위치" && name === "전체"?net.map(function(a,i){
          return(
        <tr key={i}>
          <td>{i+1}</td>
          <td>{i+1}</td>
          <td>{a.facil_name}</td>
        </tr>
          )
        }):title ==="스위치" && name === "곤지암 엣지센터"?switch2.map(function(a,i){
          return(
        <tr key={i}>
          <td>{i+1}</td>
          <td>{i+1}</td>
          <td>{net[i].facil_name}</td>
        </tr>
          )
        }):title ==="스위치" && name === "엣지2"?switch2.map(function(a,i){
          return(
        <tr key={i}>
          <td>{i+4}</td>
          <td>{i+4}</td>
          <td>{net[i+3].facil_name}</td>
        </tr>
          )
        }):title ==="스위치" && name === "엣지3"?switch2.map(function(a,i){
          return(
        <tr key={i}>
          <td>{i+7}</td>
          <td>{i+7}</td>
          <td>{net[i+6].facil_name}</td>
        </tr>
          )
        }):title ==="스위치"?net.map(function(a,i){
          return(
        <tr key={i}>
          <td>{i+1}</td>
          <td>{i+1}</td>
          <td>{a.facil_name}</td>
        </tr>
          )
        }):title ==="라우터" && name === "전체"?rou.map(function(a,i){
          return(
        <tr key={i}>
          <td>{i+1}</td>
          <td>{i+1}</td>
          <td>{a.facil_name}</td>
        </tr>
          )
        }):title ==="라우터" && name === "곤지암 엣지센터"?switch2.map(function(a,i){
          return(
        <tr key={i}>
          <td>{i}</td>
          <td>{i}</td>
          <td>{rou[i].facil_name}</td>
        </tr>
          )
        }):title ==="라우터" && name === "엣지2"?switch2.map(function(a,i){
          return(
        <tr key={i}>
          <td>{i+4}</td>
          <td>{i+4}</td>
          <td>{rou[i+3].facil_name}</td>
        </tr>
          )
        }):title ==="라우터" && name === "엣지3"?switch2.map(function(a,i){
          return(
        <tr key={i}>
          <td>{i+7}</td>
          <td>{i+7}</td>
          <td>{rou[i+6].facil_name}</td>
        </tr>
          )
        }):title ==="라우터"?rou.map(function(a,i){
          return(
        <tr key={i}>
          <td>{i+1}</td>
          <td>{i+1}</td>
          <td>{a.facil_name}</td>
        </tr>
          )
        }):title ==="센서" && name === "전체"?sensor.map(function(a,i){
          return(
        <tr key={i}>
          <td>{i+1}</td>
          <td>{i+1}</td>
          <td>{a.facil_name}</td>
        </tr>
          )
        }):title ==="센서" && name === "곤지암 엣지센터"?sensor2.map(function(a,i){
          return(
        <tr key={i}>
          <td>{i+1}</td>
          <td>{i+1}</td>
          <td>{sensor[i].facil_name}</td>
        </tr>
          )
        }):title ==="센서" && name === "엣지2"?sensor2.map(function(a,i){
          return(
        <tr key={i}>
          <td>{i+10}</td>
          <td>{i+10}</td>
          <td>{sensor[i+9].facil_name}</td>
        </tr>
          )
        }):title ==="센서" && name === "엣지3"?sensor2.map(function(a,i){
          return(
        <tr key={i}>
          <td>{i+19}</td>
          <td>{i+19}</td>
          <td>{sensor[i+8].facil_name}</td>
        </tr>
          )
        }):title ==="센서"?sensor.map(function(a,i){
          return(
        <tr key={i}>
          <td>{i+1}</td>
          <td>{i+1}</td>
          <td>{a.facil_name}</td>
        </tr>
          )
        }):edge.map(function(a,i){
  return(
<tr key={i}>
  <td>{i+1}</td>
  <td>{i+1}</td>
  <td>{a.edge_name}</td>
</tr>
  )
})}
      </tbody>
    </Table>
  )
  
  const botTable = (

    <Table striped bordered hover>
      <thead>
        <tr>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>

      {rouBot.title.map(function(j,k){
          return(
        <tr key={k}>
          <td>{rouBot.title[k]}</td>
          {/* <td>{rouBot.{`rou${k+1}`[k]}}</td> */}
          <td>{rouBot.rou1[k]}</td>
        </tr>
          )
        })}
      </tbody>
    </Table>
  )

const innerTabClick = (e) => {
  console.log(e.target.innerHTML,"2222222222")
  setName(e.target.innerHTML)
}

const tableTabClick = (e) => {
  console.log(e.target.innerHTML,"11111111111")
  setTitle(e.target.innerHTML)
}

const tabList = [
  {
    value : "center", 
    title : "센터"

  },
  {
    value : "server", 
    title : "서버"

  },
  {
    value : "switch", 
    title : "스위치"

  },
  {
    value : "router", 
    title : "라우터"

  },
  {
    value : "sensor", 
    title : "센서"

  }
]
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
      {tabList?.map((list,i) => 
        <Tab eventKey={list.value} title={list.title}  value= {list.value}
        >

          <Tabs
          defaultActiveKey="전체"
          id="uncontrolled-tab-example"
          className="mb-3"
          onClick={innerTabClick}
          >

          {edgeList?.map((edge,i) => 
          <Tab eventKey={edge.name} title={edge.name}>
            {TopTable}
            <h3>상세시설정보</h3>
            {botTable}
          </Tab>
          )}

          </Tabs>
        </Tab>
      )}

      </Tabs>
    </div>
  );
}

export default App;

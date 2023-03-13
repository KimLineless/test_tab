import 'bootstrap/dist/css/bootstrap.min.css';
import React, {  useEffect, useState } from "react"
import './App.css';
import { Tab,Tabs,Table } from 'react-bootstrap';
import Axios from "axios"
import {rouBot} from './TableBotData';

function App() {

const [data,setData] = useState([])
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
      setData(res.data)
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
      {edge.map(function(a,i){
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


  
  const gonEdge = (
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
          <td>1</td>
          <td>1</td>
          <td>{edge[0]?.edge_name}</td>
        </tr>
      </tbody>
    </Table>
  )
  const Edge2 = (
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
          <td>2</td>
          <td>2</td>
          <td>{edge[1]?.edge_name}</td>
        </tr>
      </tbody>
    </Table>
  )
  const Edge3 = (
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
          <td>3</td>
          <td>3</td>
          <td>{edge[2]?.edge_name}</td>
        </tr>
      </tbody>
    </Table>
  )

  const serverTopTable = (
    
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>순번</th>
          <th>장치ID</th>
          <th>장비명칭</th>
        </tr>
      </thead>
      <tbody>
        {server.map(function(a,i){
          return(
        <tr key={i}>
          <td>{i+1}</td>
          <td>{i+1}</td>
          <td>{a.facil_name}</td>
        </tr>
          )
        })}
      </tbody>
    </Table>
  )
  const gonServer = (
    
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
          <td>1</td>
          <td>1</td>
          <td>{server[0]?.facil_name}</td>
        </tr>
        <tr>
          <td>2</td>
          <td>2</td>
          <td>{server[1]?.facil_name}</td>
        </tr>
      </tbody>
    </Table>
  )
  const server2 = (
    
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
          <td>3</td>
          <td>3</td>
          <td>{server[2]?.facil_name}</td>
        </tr>
        <tr>
          <td>4</td>
          <td>4</td>
          <td>{server[3]?.facil_name}</td>
        </tr>
      </tbody>
    </Table>
  )
  const server3 = (
    
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
          <td>5</td>
          <td>5</td>
          <td>{server[4]?.facil_name}</td>
        </tr>
        <tr>
          <td>6</td>
          <td>6</td>
          <td>{server[5]?.facil_name}</td>
        </tr>
      </tbody>
    </Table>
  )
  const rouTopTable = (
    
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>순번</th>
          <th>장치ID</th>
          <th>장비명칭</th>
        </tr>
      </thead>
      <tbody>
      {rou.map(function(a,i){
          return(
        <tr key={i} onClick={()=>{
          console.log(i+1)
        }}>
          <td>{i+1}</td>
          <td>{i+1}</td>
          <td>{a.facil_name}</td>
        </tr>
          )
        })}
      </tbody>
    </Table>
  )
  const gonRou = (
    
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
          <td>1</td>
          <td>1</td>
          <td>{rou[0]?.facil_name}</td>
        </tr>
        <tr>
          <td>2</td>
          <td>2</td>
          <td>{rou[1]?.facil_name}</td>
        </tr>
        <tr>
          <td>3</td>
          <td>3</td>
          <td>{rou[2]?.facil_name}</td>
        </tr>
      </tbody>
    </Table>
  )
  const Rou2 = (
    
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
          <td>4</td>
          <td>4</td>
          <td>{rou[3]?.facil_name}</td>
        </tr>
        <tr>
          <td>5</td>
          <td>5</td>
          <td>{rou[4]?.facil_name}</td>
        </tr>
        <tr>
          <td>6</td>
          <td>6</td>
          <td>{rou[5]?.facil_name}</td>
        </tr>
      </tbody>
    </Table>
  )
  const Rou3 = (
    
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
          <td>7</td>
          <td>7</td>
          <td>{rou[6]?.facil_name}</td>
        </tr>
        <tr>
          <td>8</td>
          <td>8</td>
          <td>{rou[7]?.facil_name}</td>
        </tr>
        <tr>
          <td>9</td>
          <td>9</td>
          <td>{rou[8]?.facil_name}</td>
        </tr>
      </tbody>
    </Table>
  )
  const netTopTable = (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>순번</th>
          <th>장치ID</th>
          <th>장비명칭</th>
        </tr>
      </thead>
      <tbody>
      {net.map(function(a,i){
          return(
        <tr key={i}>
          <td>{i+1}</td>
          <td>{i+1}</td>
          <td>{a.facil_name}</td>
        </tr>
          )
        })}
      </tbody>
    </Table>
  )
  const gonNet = (
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
          <td>1</td>
          <td>1</td>
          <td>{net[0]?.facil_name}</td>
        </tr>
        <tr>
          <td>2</td>
          <td>2</td>
          <td>{net[1]?.facil_name}</td>
        </tr>
        <tr>
          <td>3</td>
          <td>3</td>
          <td>{net[2]?.facil_name}</td>
        </tr>
      </tbody>
    </Table>
  )
  const Net2 = (
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
          <td>4</td>
          <td>4</td>
          <td>{net[3]?.facil_name}</td>
        </tr>
        <tr>
          <td>5</td>
          <td>5</td>
          <td>{net[4]?.facil_name}</td>
        </tr>
        <tr>
          <td>6</td>
          <td>6</td>
          <td>{net[5]?.facil_name}</td>
        </tr>
      </tbody>
    </Table>
  )
  const Net3 = (
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
          <td>7</td>
          <td>7</td>
          <td>{net[6]?.facil_name}</td>
        </tr>
        <tr>
          <td>8</td>
          <td>8</td>
          <td>{net[7]?.facil_name}</td>
        </tr>
        <tr>
          <td>9</td>
          <td>9</td>
          <td>{net[8]?.facil_name}</td>
        </tr>
        <tr>
          <td>10</td>
          <td>10</td>
          <td>{net[9]?.facil_name}</td>
        </tr>
      </tbody>
    </Table>
  )
  const senTopTable = (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>순번</th>
          <th>장치ID</th>
          <th>장비명칭</th>
        </tr>
      </thead>
      <tbody>
      {sensor.map(function(a,i){
          return(
        <tr key={i}>
          <td>{i+1}</td>
          <td>{a.rcv_info_no}</td>
          <td>{a.facil_name}</td>
        </tr>
          )
        })}
      </tbody>
    </Table>
  )
  const gonSen = (
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
          <td>1</td>
          <td>6</td>
          <td>{sensor[0]?.facil_name}</td>
        </tr>
        <tr>
          <td>2</td>
          <td>7</td>
          <td>{sensor[1]?.facil_name}</td>
        </tr>
        <tr>
          <td>3</td>
          <td>9</td>
          <td>{sensor[2]?.facil_name}</td>
        </tr>
        <tr>
          <td>4</td>
          <td>10</td>
          <td>{sensor[3]?.facil_name}</td>
        </tr>
        <tr>
          <td>5</td>
          <td>11</td>
          <td>{sensor[4]?.facil_name}</td>
        </tr>
        <tr>
          <td>6</td>
          <td>12</td>
          <td>{sensor[5]?.facil_name}</td>
        </tr>
        <tr>
          <td>7</td>
          <td>13</td>
          <td>{sensor[6]?.facil_name}</td>
        </tr>
        <tr>
          <td>8</td>
          <td>14</td>
          <td>{sensor[7]?.facil_name}</td>
        </tr>
        <tr>
          <td>9</td>
          <td>15</td>
          <td>{sensor[8]?.facil_name}</td>
        </tr>
        <tr>
          <td>28</td>
          <td>68</td>
          <td>{sensor[27]?.facil_name}</td>
        </tr>
      </tbody>
    </Table>
  )
  const sen2 = (
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
          <td>10</td>
          <td>29</td>
          <td>{sensor[9]?.facil_name}</td>
        </tr>
        <tr>
          <td>11</td>
          <td>30</td>
          <td>{sensor[10]?.facil_name}</td>
        </tr>
        <tr>
          <td>12</td>
          <td>31</td>
          <td>{sensor[11]?.facil_name}</td>
        </tr>
        <tr>
          <td>13</td>
          <td>32</td>
          <td>{sensor[12]?.facil_name}</td>
        </tr>
        <tr>
          <td>14</td>
          <td>33</td>
          <td>{sensor[13]?.facil_name}</td>
        </tr>
        <tr>
          <td>15</td>
          <td>34</td>
          <td>{sensor[14]?.facil_name}</td>
        </tr>
        <tr>
          <td>16</td>
          <td>35</td>
          <td>{sensor[15]?.facil_name}</td>
        </tr>
        <tr>
          <td>17</td>
          <td>36</td>
          <td>{sensor[16]?.facil_name}</td>
        </tr>
        <tr>
          <td>18</td>
          <td>37</td>
          <td>{sensor[17]?.facil_name}</td>
        </tr>
      </tbody>
    </Table>
  )
  const sen3 = (
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
          <td>19</td>
          <td>46</td>
          <td>{sensor[18]?.facil_name}</td>
        </tr>
        <tr>
          <td>20</td>
          <td>47</td>
          <td>{sensor[19]?.facil_name}</td>
        </tr>
        <tr>
          <td>21</td>
          <td>48</td>
          <td>{sensor[20]?.facil_name}</td>
        </tr>
        <tr>
          <td>22</td>
          <td>49</td>
          <td>{sensor[21]?.facil_name}</td>
        </tr>
        <tr>
          <td>23</td>
          <td>50</td>
          <td>{sensor[22]?.facil_name}</td>
        </tr>
        <tr>
          <td>24</td>
          <td>51</td>
          <td>{sensor[23]?.facil_name}</td>
        </tr>
        <tr>
          <td>25</td>
          <td>52</td>
          <td>{sensor[24]?.facil_name}</td>
        </tr>
        <tr>
          <td>26</td>
          <td>53</td>
          <td>{sensor[25]?.facil_name}</td>
        </tr>
        <tr>
          <td>27</td>
          <td>54</td>
          <td>{sensor[26]?.facil_name}</td>
        </tr>
      </tbody>
    </Table>
  )

  let rouBotTable = (

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
          <td>{rouBot.rou1[k]}</td>
        </tr>
          )
        })}
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
          <h3>시설상세정보</h3>
      </Tab>
      <Tab eventKey="gonziam" title="곤지암 엣지센터">
        {gonEdge}
          <h3>시설상세정보</h3>
      </Tab>
      <Tab eventKey="edge2" title="엣지센터2">
        {Edge2}
          <h3>시설상세정보</h3>
      </Tab>
      <Tab eventKey="edge3" title="엣지센터3">
        {Edge3}
          <h3>시설상세정보</h3>
      </Tab>
    </Tabs>
  );
  const serverInnerTab = (
    <Tabs
    defaultActiveKey="all"
    id="uncontrolled-tab-example"
    className="mb-3">
      <Tab eventKey="all" title="전체">
        {serverTopTable}
          <h3>시설상세정보</h3>
      </Tab>
      <Tab eventKey="gonziam" title="곤지암 엣지센터">
        {gonServer}
          <h3>시설상세정보</h3>
      </Tab>
      <Tab eventKey="edge2" title="엣지센터2">
        {server2}
          <h3>시설상세정보</h3>
      </Tab>
      <Tab eventKey="edge3" title="엣지센터3">
        {server3}
          <h3>시설상세정보</h3>
      </Tab>
    </Tabs>
  );
  const netInnerTab = (
    <Tabs
    defaultActiveKey="all"
    id="uncontrolled-tab-example"
    className="mb-3">
      <Tab eventKey="all" title="전체">
        {netTopTable}
          <h3>시설상세정보</h3>
      </Tab>
      <Tab eventKey="gonziam" title="곤지암 엣지센터">
        {gonNet}
          <h3>시설상세정보</h3>
      </Tab>
      <Tab eventKey="edge2" title="엣지센터2">
        {Net2}
          <h3>시설상세정보</h3>
      </Tab>
      <Tab eventKey="edge3" title="엣지센터3">
        {Net3}
          <h3>시설상세정보</h3>
      </Tab>
    </Tabs>
  );
  const rouInnerTab = (
    <Tabs
    defaultActiveKey="all"
    id="uncontrolled-tab-example"
    className="mb-3">
      <Tab eventKey="all" title="전체">
        {rouTopTable}
        <h3>시설상세정보</h3>
        {rouBotTable}
      </Tab>
      <Tab eventKey="gonziam" title="곤지암 엣지센터">
        {gonRou}
          <h3>시설상세정보</h3>
        {rouBotTable}
      </Tab>
      <Tab eventKey="edge2" title="엣지센터2">
        {Rou2}
          <h3>시설상세정보</h3>
        {rouBotTable}
      </Tab>
      <Tab eventKey="edge3" title="엣지센터3">
        {Rou3}
          <h3>시설상세정보</h3>
        {rouBotTable}
      </Tab>
    </Tabs>
  );
  const sensorInnerTab = (
    <Tabs
    defaultActiveKey="all"
    id="uncontrolled-tab-example"
    className="mb-3">
      <Tab eventKey="all" title="전체">
        {senTopTable}
          <h3>시설상세정보</h3>
      </Tab>
      <Tab eventKey="gonziam" title="곤지암 엣지센터">
        {gonSen}
          <h3>시설상세정보</h3>
      </Tab>
      <Tab eventKey="edge2" title="엣지센터2">
        {sen2}
          <h3>시설상세정보</h3>
      </Tab>
      <Tab eventKey="edge3" title="엣지센터3">
        {sen3}
          <h3>시설상세정보</h3>
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
          {serverInnerTab}
        </Tab>
        <Tab eventKey="switch" title="스위치">
          {netInnerTab}
        </Tab>
        <Tab eventKey="router" title="라우터">
          {rouInnerTab}
        </Tab>
        <Tab eventKey="sensor" title="센서">
          {sensorInnerTab}
        </Tab>
      </Tabs>
    </div>
  );
}

export default App;

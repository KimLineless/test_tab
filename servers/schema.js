const { gql } = require("apollo-server")

const schema = gql`
  type CPUChart {
    name: String!
    time: [String]
    value: [Float]
  }
  type ErrorChart {
    piedata: [PieData]
    bardata: BarData
    realtime:String
  }
  type PieData {
    value: Int
    name: String
  }
  type BarData {
    date: [String]
    evalue: [Int]
    fvalue:[Int]
  }
  type ErrorTable {
    idx: Int!
    rcv_info_no: String
    ip_address: String
    reg_dt: String
    chg_dt: String
    code: String
    type: String
    status: String
    severity: String
    memo: String
    ack: String
    ack_time: String
    ack_user: String
    ack_type: String
    cls_memo: String
    cls_dt: String
    cls_user: String
    unit: String
    rcv_no: String
    description: String
    monitoring: String
    event_nm: String
    event_cnt: String
    event_point: String
    ict_id: Int
    edge_id: Int
    ap_id: Int
    facil_name: String

  }
  type Topology{
    infodata:[InfoData]
    polygondata:PolygonData

  }
  type InfoData{
    idx: Int
    name:String
    severity:String
    type:String
    monitoring:String
    ap_id: Int
    sensor_idx: Int
    ap_idx: Int
    dummy_name:String
    typeidx:Int
    id:String
    edge_id:Int
  }
  type PolygonData{
    node:[Node]
  }
  type Node{
    idx: Int
    name:String
    id:String
    typeidx:Int
    group:String
    type:String
    status:Int
  }
  type Gis {
    sensordata: [SensorData]
    routerdata: [RouterData]
    edgecenter: [EdegCenter]
    edgedata:[EdgeData]
  }
  type EdgeData{
    idx: Int
    edge_name: String
    edge_group_info: String
    reg_dt: String
    edge_type: String
    edge_sido: String
    edge_sigungu: String
    edge_dong: String
    edge_location: String
    edge_lat: String
    edge_lng: String
    edge_description: String
    severity:String
    monitoring :String
    type:String
    ip:String
  }
  type SensorData {
    idx: Int!
    rcv_no: String
    ip_address: String
    type: String
    description: String
    monitoring: String
    rcv_info_no: String
    severity:String
    sensor_mac: String
    sensor_serial: String
    sensor_vendor: String
    sensor_model: String
    sensor_name: String
    sensor_reg_time: String
    sensor_sido: String
    sensor_sigungu: String
    sensor_dong: String
    sensor_location: String
    sensor_lat: String
    sensor_lng: String
    sensor_description: String
    sensor_lastseen: String
    sensor_latency: String
    sensor_memo: String
    sensor_ip: String
    node_type: String
    node_name: String
    node_typeidx: String
    node_id: String
    node_color: String
    node_group: String
    reg_dt: String
    cls_dt: String
    reg_time:String
    facil_name:String
    occur_dt:String
    edge_id:Int
  }
  type RouterData {
    idx: Int!
    rcv_no: String
    ip_address: String
    type: String
    description: String
    monitoring: String
    severity:String
    ap_mac: String
    ap_serial: String
    ap_vendor: String
    ap_model: String
    ap_name: String
    ap_reg_time: String
    ap_sido: String
    ap_sigungu: String
    ap_dong: String
    ap_location: String
    ap_lat: String
    ap_lng: String
    ap_description: String
    ap_lastseen: String
    ap_cpu: String
    ap_memory: String
    ap_latency: String
    ap_memo: String
    ap_ip: String
    rcv_info_no: String
    node_type: String
    node_name: String
    node_typeidx: String
    node_id: String
    node_color: String
    node_group: String
    reg_dt: String
    cls_dt: String
    reg_time:String
    facil_name:String
    occur_dt:String
    edge_id:Int
  }
  type EdegCenter {
    idx: Int!
    rcv_info_no: String
    mac: String
    serial: String
    severity:String
    vendor: String
    model: String
    name: String
    reg_time: String
    sido: String
    sigungu: String
    dong: String
    location: String
    lastseen: String
    ip: String
    memo: String
    node_color: String
    type: String
    monitoring: String
    description: String
    facil_name:String
    occur_dt:String
    edge_id:Int
  }
  type PerNetPage{
    gwin:NetChart
    gwout:NetChart
    l2in:NetChart
    l2out:NetChart
    l3out:NetChart
    l3in:NetChart
    eventcurrent:[EventCurrent]
    faultcurrent:[FaultCurrent]
  }
  type NetChart{
    ip:String
    oid:String
    id:String
    time:[String]
    value:[Float]
  }

  type PerServerPage{
    cpuchart: CpuChart
    memchart: MemChart
    diskchart: DiskChart
    cpugauge:CpuGauge
    memgauge:MemGauge
    diskgauge:DiskGauge
    eventcurrent:[EventCurrent]
    faultcurrent:[FaultCurrent]

  }
  type CpuChart{
    name:String
    time:[String]
    value:[Float]
  }
  type MemChart{
    name:String
    time:[String]
    value:[Float]
  }
  type DiskChart{
    name:String
    time:[String]
    value:[Float]
  }
  type EventCurrent{
    idx: Int
    rcv_info_no:String
    ip_address:String
    reg_dt:String
    chg_dt:String
    status: String
    severity:String
    memo: String
    unit: String
    type:String
    detail_type: String
    description:String
    monitoring:String
    event_nm: String
    event_cnt: Int
    event_point: String
  }
  type FaultCurrent{
    idx: Int
    rcv_info_no:String
    ip_address:String
    reg_dt:String
    chg_dt:String
    status: String
    severity:String
    memo: String
    unit: String
    type:String
    detail_type: String
    description:String
    monitoring:String
  

  }
  type CpuGauge{
    name:String
    time:String
    value:Float
  }
  type MemGauge{
    name:String
    time:String
    value:Float
  }
  type DiskGauge{
    name:String
    time:String
    value:Float
  }

  type PerSenPage{
    value1Chart:SenChart
    value2Chart:SenChart
    value1Gauge:SenGauge
    value2Gauge:SenGauge
    statusChart:SenChart
    statusGauge:SenGauge
  }
  type SenChart{
    time:[String]
    value:[String]
  }
  type SenGauge{
    time:String
    value:String
  }
  type Query {
    cpuchart: CPUChart
    errorchart: ErrorChart
    errortable: [ErrorTable]
    topology: Topology
    realtime:String
    perserverpage:PerServerPage
  
  }
  type Subscription {
    cpuchart: CPUChart
    errorchart: ErrorChart
    errortable: [ErrorTable]
    topology: Topology
    gis: Gis
    realtime:String
    perserverpage:PerServerPage
    pernetpage:PerNetPage
    persenpage:PerSenPage
  }
`

module.exports = schema

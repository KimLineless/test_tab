/* eslint-disable */
import create from "zustand"
import axios from "axios"
import { useEffect, useState } from "react"
// let facil_api = []
// function AxiosApi() {
//   const [facilDataStore, setFacilDataStore] = useState()
//   useEffect(() => {
//     Axios.post("/api/getFacilInfo").then((res) => {
//       if (res.status === 200) {
//         setFacilDataStore(res.data)
//         // console.log(res.data)
//       } else {
//         console.log(res, "실패")
//         alert("조회　실패")
//       }
//     })
//   }, [])
//   facil_api.push(facilDataStore)
// }
// console.log(facil_api, "facil_api")
const useStore = create((set) => ({
  // 기본값
  serverCon: "server1",
  switchCon: "l2",
  routerCon: "ap1",
  sensorCon: "sensor1",
  edgeSelect: "곤지암 엣지센터",
  edgeIdx: 1,
  clickType: "",
  clickId: "",
  setClickId: (clickId) => set({ clickId }),
  setClickType: (clickType) => set({ clickType }),

  // getFacilData: async () => {
  //   const res = await Axios.post("/api/getFacilInfo")
  //   const result = []

  //   return res.data

  //   console.log(res.data, "test")
  // },
  setRcv_no: (rcv_no) => set({ rcv_no }),

  //   엣지센터
  setEdge: (edgeSelect) => set({ edgeSelect }),
  setEdge_01: () => set((state) => ({ edgeSelect: "곤지암 엣지센터" })),
  setEdge_02: () => set((state) => ({ edgeSelect: "엣지센터1" })),
  setEdge_03: () => set((state) => ({ edgeSelect: "엣지센터2" })),

  setEdgeIdx: (edgeIdx) => set({ edgeIdx }),
  setEdgeIdx_01: () => set((state) => ({ edgeIdx: 1 })),
  setEdgeIdx_02: () => set((state) => ({ edgeIdx: 2 })),
  setEdgeIdx_03: () => set((state) => ({ edgeIdx: 3 })),

  //   서버
  setServer: (serverCon) => set({ serverCon }),
  setServer_01: () => set((state) => ({ serverCon: "server1" })),
  setServer_02: () => set((state) => ({ serverCon: "server2" })),

  // 스위치
  setSwitch: (switchCon) => set({ switchCon }),
  setSwitch_01: () => set((state) => ({ switchCon: "gw" })),
  setSwitch_02: () => set((state) => ({ switchCon: "l2" })),
  setSwitch_03: () => set((state) => ({ switchCon: "l3" })),

  // 센서
  setSensor: (sensorCon) => set({ sensorCon }),
  setSensor_01: () => set((state) => ({ sensorCon: "gw" })),
  setSensor_02: () => set((state) => ({ sensorCon: "L2 sensor" })),
  setSensor_03: () => set((state) => ({ sensorCon: "L3 switch" })),

  // 라우터
  setRouter: (routerCon) => set({ routerCon }),
  setRouter_01: () => set((state) => ({ routerCon: "ap1" })),
  setRouter_02: () => set((state) => ({ routerCon: "ap2" })),
  setRouter_03: () => set((state) => ({ routerCon: "ap3" })),

  // 시설물 타입
  facilType: "center",
  //   서버
  setFacil: (facilType) => set({ facilType }),
  setFacil_sensor: () => set((state) => ({ facilType: "sensor" })),
  setFacil_ap: () => set((state) => ({ facilType: "ap" })),
  setFacil_switch: () => set((state) => ({ facilType: "switch" })),
  setFacil_server: () => set((state) => ({ facilType: "server" })),
  setFacil_center: () => set((state) => ({ facilType: "center" }))

  // getOrg: async () => {
  //   const res = await axios.post("/api/getFacilInfo")
  //   const result = []
  //   // console.log(res)
  //   // res.data.tunnel_name.map((data) => result.push(data.tunnel_name));
  //   // set({ edgeSelect: await res })
  // }
}))

export default useStore

/* eslint-disable */
import {
  Row,
  Col,
  Card,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import React, { useState, useEffect } from "react";
import useStore from "../store/store";
import Axios from "axios";

const FACILITY_TYPE = {
  SENSOR: "sensor",
  AP: "ap",
  SWITCH: "switch",
  SERVER: "server",
  CENTER: "center",
};

const DEFAULT_FORM = {
  [FACILITY_TYPE.SENSOR]: {
    mode: { formType: "hidden" },
    type: { formType: "hidden" },
    sensor_serial: { title: "제품시리얼" },
    vendor: { title: "제조사명" },
    model: { title: "모델명" },
    name: { title: "센서이름" },
    sido: { title: "시/도" },
    sigungu: { title: "군/구" },
    dong: { title: "동/면/읍" },
    location: { title: "상세주소정보" },
    lat: { title: "위도" },
    lang: { title: "경도" },
    description: { title: "추가정보" },
    status: { title: "상태정보" },
    memo: { title: "메모" },
    ip: { title: "IP주소" },
    id: { title: "네트워크 ID" },
    pwd: { title: "Password" },
    edgeId: { title: "엣지센터 ID", formType: "select", content: "edgeId" },
    apName: { title: "라우터 ID", formType: "select", content: "apname" },
  },
  [FACILITY_TYPE.AP]: {
    mode: { formType: "hidden" },
    type: { formType: "hidden" },
    serial: { title: "제품시리얼" },
    vendor: { title: "제조사명" },
    model: { title: "모델명" },
    name: { title: "라우터이름" },
    sido: { title: "시/도" },
    sigungu: { title: "군/구" },
    dong: { title: "동/면/읍" },
    location: { title: "상세주소정보" },
    lat: { title: "위도" },
    lang: { title: "경도" },
    description: { title: "추가정보" },
    status: { title: "상태정보" },
    memo: { title: "메모" },
    ip: { title: "IP주소" },
    id: { title: "네트워크 ID" },
    pwd: { title: "Password" },
    edgeId: { title: "엣지센터 ID", formType: "select", content: "edgeId" },
  },
  [FACILITY_TYPE.SWITCH]: {
    mode: { formType: "hidden" },
    type: { formType: "hidden" },
    serial: { title: "제품시리얼" },
    vendor: { title: "제조사명" },
    model: { title: "모델명" },
    name: { title: "스위치이름" },
    sido: { title: "시/도" },
    sigungu: { title: "군/구" },
    dong: { title: "동/면/읍" },
    location: { title: "상세주소정보" },
    lat: { title: "위도" },
    lang: { title: "경도" },
    description: { title: "추가정보" },
    status: { title: "상태정보" },
    memo: { title: "메모" },
    ip: { title: "IP주소" },
    id: { title: "네트워크 ID" },
    pwd: { title: "Password" },
    edgeId: { title: "엣지센터 ID", formType: "select", content: "edgeId" },
  },
  [FACILITY_TYPE.SERVER]: {
    mode: { formType: "hidden" },
    type: { formType: "hidden" },
    serial: { title: "제품시리얼" },
    vendor: { title: "제조사명" },
    model: { title: "모델명" },
    name: { title: "서버이름" },
    sido: { title: "시/도" },
    sigungu: { title: "군/구" },
    dong: { title: "동/면/읍" },
    location: { title: "상세주소정보" },
    lat: { title: "위도" },
    lang: { title: "경도" },
    description: { title: "추가정보" },
    status: { title: "상태정보" },
    memo: { title: "메모" },
    ip: { title: "IP주소" },
    id: { title: "서버 ID" },
    pwd: { title: "Password" },
    edgeId: { title: "엣지센터 ID", formType: "select", content: "edgeId" },
  },
  [FACILITY_TYPE.CENTER]: {
    mode: { formType: "hidden" },
    type: { formType: "hidden" },
    edge_id: { title: "장치 Id", odd: "1" },
    edge_Name: { title: "센터이름", odd: "곤지암 엣지센터" },
    edge_state: { title: "상태", odd: "정상" },
    edge_enroll_date: { title: "설치일자", odd: "2022-10-19" },
    edge_Type: { title: "시설유형", odd: "edge center" },
    edge_sido: { title: "시/도", odd: "경기도 " },
    edge_sigungu: { title: "군/구", odd: "광주시" },
    edge_dong: { title: "동/면/읍", odd: "곤지암읍" },
    edge_location: { title: "상세설치위치", odd: "부항리 324-5" },
    edge_lat: { title: "위도", odd: "37.36354" },
    edge_Ing: { title: "경도", odd: "127.359013" },
    edge_description: { title: "추가정보", odd: "-" },
  },
};
const makeDefaultValues = formData =>
  Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: "" }), {});

function FacilityPop() {
  const setFacil = useStore(state => state.facilType);
  const [modal, setModal] = useState("view");
  const [type, setType] = useState(FACILITY_TYPE.SENSOR);
  const [formData, setFormData] = useState(DEFAULT_FORM[type]);
  const [values, setValues] = useState(makeDefaultValues(DEFAULT_FORM[type]));
  console.log(makeDefaultValues(DEFAULT_FORM[type]));

  useEffect(() => {
    Axios.post("/api/getFacilInfo")
      .then(res => {
        if (res.status === 200) {
          setOptions(res.data.apName);
          //
          // console.log("시설정보 성공")
          setOddValue(res.data.sensorInfo);
          // ?
          console.log(res);
          oddInfoArr.push({
            odd: "test",
          });
        } else {
          console.log(res, "실패");
          alert("조회　실패");
        }

        console.log(oddValue);
        console.log(oddInfoArr);
      })
      .catch(e => {
        console.log(e, "error");
        if (e.request) {
          alert("관리자에게　문의　바랍니다");
        }
      });
  }, []);
  useEffect(() => {
    setFormData(DEFAULT_FORM[type]);
    setValues(makeDefaultValues(DEFAULT_FORM[type]));
  }, [type]);

  useEffect(() => {
    if (setFacil === "sensor") {
      setType(FACILITY_TYPE.SENSOR);
    } else if (setFacil === "ap") {
      setType(FACILITY_TYPE.AP);
    } else if (setFacil === "switch") {
      setType(FACILITY_TYPE.SWITCH);
    } else if (setFacil === "server") {
      setType(FACILITY_TYPE.SERVER);
    } else if (setFacil === "center") {
      setType(FACILITY_TYPE.CENTER);
    }
    setModal("view");
  }, [setFacil]);

  const handleChange02 = (e, name) => {
    setValues(prevValue => ({
      ...prevValue,
      mode: "insert",
      type: type,
      [name]: e.target.value,
    }));
  };

  let saveHandler = e => {
    e.preventDefault();
    Axios.post("/api/FacilInfoCRUD", values)
      .then(res => {
        if (res.status === 200) {
          alert("등록이　완료되었습니다．");
        } else {
          alert("등록에　실패하였습니다．");
        }
      })
      .catch(e => {
        console.log(e, "error");
        if (e.request) {
          alert("관리자에게　문의　바랍니다");
        }
      });
  };

  const ModalConfig = [
    {
      id: "add",
      name: "등록",
      title: "시설물 등록",
      modalColor: "modal-primary",
      btnColor: "primary",
    },
    {
      id: "modi",
      name: "수정",
      title: "시설물 수정",
      modalColor: "modal-secondary",
      btnColor: "secondary",
    },
    {
      id: "delete",
      name: "삭제",
      title: "시설물 삭제",
      modalColor: "modal-danger",
      btnColor: "danger",
    },
  ];

  const toggleModal = id => {
    if (modal !== id) {
      setModal(id);
    } else {
      setModal(null);
    }
    if (id === "delete") {
      alert("해당 시설물을 정말로 삭제하시겠습니까?");
    }
  };
  const renderModalBtn = ModalConfig.map(item => {
    return (
      <>
        <Button
          onClick={() => toggleModal(item.id)}
          color={item.btnColor}
          key={item.title}
          outline
          id={item.id}
        >
          {item.name}
        </Button>
      </>
    );
  });

  return (
    <>
      <div className="modal_btn_wr">{renderModalBtn}</div>
      <div className="list_it_tb_wr facil">
        {modal === "view" || modal === "delete" ? (
          <ul>
            {Object.entries(formData).map(([keys, formItem]) => (
              <li className="input_box_wr flex_between">
                <div>
                  <span>{formItem.title}</span>
                  {oddValue.map(oddInfodata =>
                    Object.entries(oddInfodata).map(([key, data]) => {
                      keys === key ? <div>일치</div> : null;
                      // console.log(keys)
                      // console.log(key)
                    }),
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : modal === "add" ? (
          <div className="form_content sensor_pop">
            <form onSubmit={saveHandler}>
              <ul>
                {Object.entries(formData).map(([key, formItem]) => (
                  <li className="input_box_wr flex_between">
                    <div>
                      <span>{formItem.title}</span>
                    </div>
                    <div>
                      {formItem.formType === "select" ? (
                        <Input
                          name={key}
                          value={values[key]}
                          onChange={e => handleChange02(e, key)}
                          type={formItem.formType}
                        >
                          {formItem.content === "apname" ? (
                            <>
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                            </>
                          ) : (
                            <option>비어있음</option>
                          )}
                        </Input>
                      ) : formItem.formType === "hidden" ? (
                        <Input name={key} value={"insert"} hidden />
                      ) : (
                        <Input
                          name={key}
                          value={values[key]}
                          onChange={e => handleChange(e, key)}
                          // ?
                        />
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              <Button color="primary" className="add_send_button" type="submit">
                확인
              </Button>
            </form>
          </div>
        ) : modal === "modi" ? (
          <div className="form_content sensor_pop">
            <form onSubmit={saveHandler}>
              <ul>
                {Object.entries(formData).map(([key, formItem]) => (
                  <li className="input_box_wr flex_between">
                    <div>
                      <span>{formItem.title}</span>
                    </div>
                    <div>
                      {formItem.formType === "select" ? (
                        <Input
                          name={key}
                          value={values[key]}
                          onChange={e => handleChange(e, key)}
                          type={formItem.formType}
                        >
                          {formItem.content === "apname" ? (
                            <>
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                            </>
                          ) : (
                            <option>비어있음</option>
                          )}
                        </Input>
                      ) : formItem.formType === "hidden" ? (
                        <Input name={key} value={"insert"} hidden />
                      ) : (
                        <Input
                          placeholder={formItem.odd}
                          name={key}
                          value={values[key]}
                          onChange={e => handleChange(e, key)}
                        />
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              <Button color="primary" className="add_send_button" type="submit">
                확인
              </Button>
            </form>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default FacilityPop;

import React, { useState, useEffect } from "react";
import {
  Space,
  Button,
  Col,
  Row,
  Divider,
  Form,
  Input,
  Card,
  message,
  Upload,
  Select,
  Steps,
  theme,
  InputNumber,
} from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { RoomsInterface } from "../../../interfaces/IRoom";
import { ImageUpload } from "../../../interfaces/IUpload";
import { CreateRoom,    GetHotelById,   GetHotels,   GetRoomtypes } from "../../../services/https";

import { RoomtypesInterface } from "../../../interfaces/IRoomtype";
import { Rate } from 'antd';
import { HotelsInterface } from "../../../interfaces/IHotel";


import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

function Addroom() {

  const [current, setCurrent] = useState(0);
  const [roomtypes, setRoomtypes] = useState<RoomtypesInterface[]>([]);
  
  const [profile, setProfile] = useState<ImageUpload>();

  const [hotel, setHotel] = useState<HotelsInterface[]>([]);
  // รับข้อมูลจาก params
  let { id } = useParams();
  // อ้างอิง form กรอกข้อมูล

  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const { token } = theme.useToken();

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const onFinish = async (values: RoomsInterface) => {
    // values.ID = hotel?.ID;
    values.HotelID = hotel[0].ID;
    values.Profile = profile?.thumbUrl;
    let res = await CreateRoom(values);
    if (res.status) {
      messageApi.open({
        type: "success",
        content: "บันทึกข้อมูลสำเร็จ",
      });
      setTimeout(function () {
        navigate("/hotel");
      }, 2000);
    } else {
      messageApi.open({
        type: "error",
        content: "บันทึกข้อมูลไม่สำเร็จ",
      });
    }
  };
  const getHotelById = async () => {
    try {
      let res = await GetHotelById(Number(id));
      if (res) {
        if (Array.isArray(res)) {
          setHotel(res);
        } else {
          setHotel([res]);
        }
      }
    } catch (error) {
      console.error("Error fetching hotel details:", error);
      // Handle error appropriately
    }
  };
  
  useEffect(() => {
    getHotelById();
  }, [id]);



  const getRoomtypes = async () => {
    let res = await GetRoomtypes();
    if (res) {
      setRoomtypes(res);
    }
  };

  useEffect(() => {
    getRoomtypes();
  }, []);





  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    setProfile(e?.fileList[0])
    return e?.fileList;
  };

  return (
    <div>
      {contextHolder}
      {/* <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div style={{ marginTop: 5 }}>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Form.Item>
          <Space>
            <Button htmlType="button" style={{ marginRight: "10px" }}>
              ยกเลิก
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              icon={<PlusOutlined />}
            >
              ยืนยัน
            </Button>
          </Space>
        </Form.Item>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div> */}
   
   <Card>
        <h2> เพิ่มข้อมูลห้องพัก </h2>
        <Divider />
        <Form
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item
                name="RoomtypeID"
                label="ประเภทห้องพัก"
                rules={[{ required: true, message: "กรุณาระบุเพศ !" }]}
              >
                <Select allowClear>
                  {roomtypes.map((item) => (
                    <Option value={item.ID} key={item.Name}>
                      {item.Name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
            label="ราคา"
            name="Price"
            rules={[{ required: true, message: 'Please input Field 1!' }]}
          >
            <InputNumber />
          </Form.Item>
         
          <Form.Item
            label="เตียง"
            name="Bed"
            rules={[{ required: true, message: 'Please input Field 1!' }]}
          >
            <InputNumber/>
          </Form.Item>

          <Form.Item
            label="Guest"
            name="Roomguest"
            rules={[{ required: true, message: 'Please input Field 1!' }]}
          >
            <InputNumber/>
          </Form.Item>
            <Form.Item
                label="รูป"
                name="Profile"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={[{ required: true, message: 'Please input Field 1!' }]}
              >
                <Upload maxCount={1} multiple={false} listType="picture-card">
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>อัพโหลด</div>
                  </div>
                </Upload>
              </Form.Item>

            </Col>
          </Row>
          <Row justify="end">
            <Col style={{ marginTop: "40px" }}>
              <Form.Item>
                <Space>
                  <Button htmlType="button" style={{ marginRight: "10px" }}>
                    ยกเลิก
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={<PlusOutlined />}
                  >
                    ยืนยัน
                  </Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

    </div>
  );
}

export default Addroom;


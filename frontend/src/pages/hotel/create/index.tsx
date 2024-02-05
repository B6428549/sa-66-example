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
import { PlusOutlined, MinusOutlined ,FrownOutlined ,MehOutlined, StarOutlined } from "@ant-design/icons";
import { HoteltypesInterface } from "../../../interfaces/IHoteltype";
import { ImageUpload } from "../../../interfaces/IUpload";
import { CreateHotel, GetHoteltypes, GetRoomtypes } from "../../../services/https";
import { useNavigate } from "react-router-dom";
import { RoomtypesInterface } from "../../../interfaces/IRoomtype";
import { HotelsInterface } from "../../../interfaces/IHotel";
import type { SelectProps } from 'antd';
const { Option } = Select;

function HotelCreate() {
  
  const options: SelectProps['options'] = [
    { label: 'ห้องอาหาร (Restaurants)', value: 'restaurants' },
    { label: 'เลานจ์ (Lounge)', value: 'lounge' },
    { label: 'สระว่ายน้ำ (Swimming Pool)', value: 'swimmingpool' },
    { label: 'ห้องสันทนาการ (Game Room)', value: 'game-room' },
    { label: 'ฟิตเน็ต (Fitness Center), คอร์ทเทนนิส (Tennis Courts)', value: 'fitness' },
    { label: 'สปาและร้านทำผม (Spa, Sauna, Salon)', value: 'spasalon' },
    { label: 'บิสสิเน็ต เซ็นเตอร์ (Business Center)', value: 'business-center' },
    { label: 'อินเตอร์เน็ต (Wifi)', value: 'wifi' },
    { label: 'รูมเซอร์วิส (Room Service)', value: 'room-service' },
    { label: 'บริการซักรีดและซักแห้ง (Laundry and Dry Cleaning)', value: 'laundry-dry-cleaning' },
    { label: 'บริการรับเลี้ยงเด็ก', value: 'childcare' },
    { label: 'ผับ (Pub)', value: 'pub' },
  ];

  const [current, setCurrent] = useState(0);
  const [hoteltypes, setHoteltypes] = useState<HoteltypesInterface[]>([]);
  const [roomtypes, setRoomtypes] = useState<RoomtypesInterface[]>([]);
  const [profile, setProfile] = useState<ImageUpload>();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();



  const onFinish = async (values: HotelsInterface) => {
    values.Profile = profile?.thumbUrl;
    console.log(values.Profile);
    let res = await CreateHotel(values);
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

  const getHoteltypes = async () => {
    let res = await GetHoteltypes();
    if (res) {
      setHoteltypes(res);
    }
  };

  useEffect(() => {
    getHoteltypes();
  }, []);

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
  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };
  
 
  return (
    <div>
      {contextHolder}   
   <Card>
        <h2> เพิ่มข้อมูลที่พัก</h2>
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
                name="HoteltypeID"
                label="ประเภทโรงแรม"
                rules={[{ required: true, message: "กรุณาระบุเพศ !" }]}
              >
                <Select allowClear
                >
                  {hoteltypes.map((item) => (
                    <Option value={item.ID} key={item.Name}>
                      {item.Name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                <Form.Item
                  label="Guest"
                  name="Guest"
                  rules={[
                    {
                      required: true,
                      message: "กรุณากรอกชื่อ !",
                    },
                  ]}
                >
                  <InputNumber />
                </Form.Item>
              </Col>
              <Form.Item
            label="ที่อยู่่"
            name="Location"
            rules={[{ required: true, message: 'Please input Field 1!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="ชื่อที่พัก"
            name="Name"
            rules={[{ required: true, message: 'Please input Field 1!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="คำบรรยาย"
            name="Description"
            rules={[{ required: true, message: 'Please input Field 1!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
  label="ระดับดาว"
  name="Hotelclass"
  rules={[{ required: true, message: 'Please input Field 1!' }]}
>
<InputNumber />

</Form.Item>
<Form.Item
            label="ราคาต่อคืน"
            name="Price"
            rules={[{ required: true, message: 'Please input Field 1!' }]}
          >
            <InputNumber />
          </Form.Item>
         < Form.Item
               label="Service"
               name="Service"
               rules={[{ required: true, message: 'กรุณาระบุคำบรรยาย !' }]}
             >
              
              
    <Select
      mode="multiple"
      allowClear
      style={{ width: '100%' }}
      placeholder="Please select"
      onChange={handleChange}
      options={options}
    />
    </Form.Item>
            <Form.Item
                label="รูป"
                name="Profile"
                valuePropName="fileList"
                getValueFromEvent={normFile}
              
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

export default HotelCreate;


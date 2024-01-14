import React, { useState, useEffect, useId } from "react";
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
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { HotelsInterface } from "../../../interfaces/IHotel";
import { HoteltypesInterface } from "../../../interfaces/IHoteltype";
import { CreateHotel, GetHoteltypes, GetHotelById, UpdateHotel } from "../../../services/https";
import { useNavigate, useParams } from "react-router-dom";
import { ImageUpload } from "../../../interfaces/IUpload";
// const [profile, setProfile] = useState<ImageUpload>();
const { Option } = Select;

function HotelEdit() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const [hotel, setHotel] = useState<HotelsInterface>();
  const [hoteltypes, setHoteltypes] = useState<HoteltypesInterface[]>([]);

  // รับข้อมูลจาก params
  let { id } = useParams();
  // อ้างอิง form กรอกข้อมูล
  const [form] = Form.useForm();

  const onFinish = async (values: HotelsInterface) => {
    // values.Profile = profile?.thumbUrl;
    values.ID = hotel?.ID;
    let res = await UpdateHotel(values);
    if (res.status) {
      messageApi.open({
        type: "success",
        content: "แก้ไขข้อมูลสำเร็จ",
      });
      setTimeout(function () {
        navigate("/customer");
      }, 2000);
    } else {
      messageApi.open({
        type: "error",
        content: "แก้ไขข้อมูลไม่สำเร็จ",
      });
    }
  };

  const getHoteltype = async () => {
    let res = await GetHoteltypes();
    if (res) {
      setHoteltypes(res);
    }
  };

  const getHotelById = async () => {
    let res = await GetHotelById(Number(id));
    if (res) {
      setHotel(res);
      // set form ข้อมูลเริ่มของผู่้ใช้ที่เราแก้ไข
      form.setFieldsValue({ 
		Name: res.Name, // ตั้งค่าฟิลด์ Name
		Location: res.Location,
		NumberofRoom: res.NumberofRoom,
		Profile: res.Profile,	
		Guest: res.Guest,
		Description: res.Description,
		Hotelclass: res.Hotelclass,
    HoteltypeID: res.HoteltypeID,
    });
    }
  };

  useEffect(() => {
    getHoteltype();
    getHotelById();
  }, []);

//   const normFile = (e: any) => {
//     if (Array.isArray(e)) {
//       return e;
//     }
//     setProfile(e?.fileList[0])
//     return e?.fileList;
//   };

  return (
    <div>
   {contextHolder}
      <Card>
        <h2> แก้ไขข้อมูล ผู้ดูแลระบบ</h2>
        <Divider />
        <Form
          name="basic"
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
      >
        <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item
              name="HoteltypeID"
              label="ประเภท"
              rules={[{ required: true, message: "กรุณาระบุเพศ !" }]}
            >
              <Select allowClear>
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
                <Input />
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
          <Input />
        </Form.Item>
        <Form.Item
          label="ราคา"
          name="NumberofRoom"
          rules={[{ required: true, message: 'Please input Field 1!' }]}
        >
          <Input />
        </Form.Item>
        {/* <Form.Item
          label="ระดับดาว"
          name="Hotelclass"
          rules={[{ required: true, message: 'Please input Field 1!' }]}
        >
          <Rate />
        // </Form.Item> */}
        //   {/* <Form.Item
        //       label="รูป"
        //       name="Profile"
        //       valuePropName="fileList"
        //       getValueFromEvent={normFile}
            
        //     >
        //       <Upload maxCount={1} multiple={false} listType="picture-card">
        //         <div>
        //           <PlusOutlined />
        //           <div style={{ marginTop: 8 }}>อัพโหลด</div>
        //         </div>
        //       </Upload>
        //     </Form.Item> */}

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

export default HotelEdit;

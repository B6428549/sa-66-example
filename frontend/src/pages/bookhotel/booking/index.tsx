import React, { useState, useEffect } from "react";
import { Avatar, Button, Card, Col, DatePicker, Form, Input, List, Row, Space, TimePicker, Typography,message,} from "antd";
import { CreateBookhotel, GetBookhotelById, GetRoomById, GetRooms, GetRoomtypes } from "../../../services/https";
import { RoomsInterface } from "../../../interfaces/IRoom";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RoomtypesInterface } from "../../../interfaces/IRoomtype";
import { BookHotelsInterface } from "../../../interfaces/IBookhotel";

const { Text } = Typography;

function BookingHotel() {
  const [rooms, setRooms] = useState<RoomsInterface[]>([]);
  const [roomtypes, setRoomtypes] = useState<RoomtypesInterface[]>([]);
  const [bookhotel, setBookhotels] = useState<BookHotelsInterface[]>([]);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  // Get room ID from URL parameters
  let { id } = useParams();


  // Fetch room types and update state
  const getRoomtypes = async () => {
    let res = await GetRoomtypes();
    if (res) {
      setRoomtypes(res);
    }
  };
  useEffect(() => {
    getRoomtypes();
  }, []);

  const getRoomById = async () => {
    try {
      let res = await GetRoomById(Number(id));
      if (res) {
        if (Array.isArray(res)) {
          setRooms(res);
        } else {
          setRooms([res]);
        }
      }
    } catch (error) {
      console.error("Error fetching hotel details:", error);
      // Handle error appropriately
    }
  };

  useEffect(() => {
    getRoomById();
  }, [id]);


  // Filter rooms based on hotel ID
  const filteredRooms = rooms.filter((room) => room.ID === Number(id));
  const roomData = filteredRooms.map((room) => {
    const roomtype = roomtypes.find((rt) => rt.ID === room.RoomtypeID);
    return {
      title: roomtype?.Name || "", // Add a default value if roomtype is undefined
      profile: room.Profile,
      price: room.Price,
      id: room.ID
    };
  });

  
  const onFinish = async (values: BookHotelsInterface) => {
    // ในกรณีนี้คุณต้องรอให้ getRoomById เสร็จก่อนที่จะทำ onFinish
    await getRoomById(); // นำไปใช้ที่จำเป็นต่อไป
    console.log(id);
    // ตรวจสอบว่า rooms มีข้อมูลหรือไม่
    if (rooms.length > 0) {
      // ให้ค่า RoomID เป็น ID ของห้องแรกที่ได้จาก getRoomById
      values.RoomID = rooms[0].ID; // หรือเลือกห้องที่ต้องการได้ตามต้องการ
      let res = await CreateBookhotel(values);
      if (res.status) {
        messageApi.open({
          type: "success",
          content: "บันทึกข้อมูลสำเร็จ",
        });
        setTimeout(function () {
          navigate("/showrecord");
        }, 2000);
      } else {
        messageApi.open({
          type: "error",
          content: "บันทึกข้อมูลไม่สำเร็จ",
        });
      }
    } else {
      console.error("No rooms available"); // หรือทำการแจ้งเตือนหรือจัดการตามที่คุณต้องการ
    }
  };
  const dateFormat = "DD/MM/YYYY";


  return (
    <div>
      {contextHolder}   
     <Card>
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={roomData}
          renderItem={(item) => (
            <List.Item>
              <Card title={item.title}>
                <Space direction="vertical">
                  <Avatar size={400} shape="square" src={item.profile} />
                  <Text strong>{item.title}</Text>
                  <p>{item.price}</p>
                </Space>
              </Card>
            </List.Item>
          )}
        />
      </Card>
      <Form
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                <Form.Item
                  label="Name"
                  name="Name"
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
            label="Phone"
            name="Phone"
            rules={[{ required: true, message: 'Please input Field 1!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="Email"
            rules={[{ required: true, message: 'Please input Field 1!' }]}
          >
            <Input />
          </Form.Item>
         
             
                <Form.Item label="วันนัดหมาย" className="tabdate" name="Datie">
                  <DatePicker
                    name="DateIn"
                    // Pass the formatted time string from Go
                    format={dateFormat}
                  />
                </Form.Item>
                <Form.Item className="tabdate" name="Time">
                  <DatePicker
                    name="DateOut"
                    style={{ marginLeft: "10px" }}
                    format={dateFormat}
                    //defaultValue={moment()} // Set the default time to the current time
                  />
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
                  >
                    ยืนยัน
                  </Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
    </div>
  );
}

export default BookingHotel;

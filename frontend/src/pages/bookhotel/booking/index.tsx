import React, { useState, useEffect } from "react";
import { Avatar, Button, Card, Col, DatePicker, Divider, Form, Input, List, Rate, Row, Space, TimePicker, Typography,message,Image, InputNumber } from "antd";
import { CreateBookhotel, GetBookhotelById, GetHotelById, GetRoomById, GetRooms, GetRoomtypes } from "../../../services/https";
import { RoomsInterface } from "../../../interfaces/IRoom";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RoomtypesInterface } from "../../../interfaces/IRoomtype";
import { BookHotelsInterface } from "../../../interfaces/IBookhotel";
import { HotelsInterface } from "../../../interfaces/IHotel";
import { EnvironmentFilled } from "@ant-design/icons";
import form from "antd/es/form";
import moment from 'moment';

const { Text } = Typography;

function BookingHotel() {
  const [rooms, setRooms] = useState<RoomsInterface[]>([]);
  const [roomtypes, setRoomtypes] = useState<RoomtypesInterface[]>([]);
  const [hotel, setHotels] = useState<HotelsInterface[]>([]);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [numberOfDays, setNumberOfDays] = useState(0);




  // Get room ID from URL parameters
  let { id2 } = useParams();  
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
      let res = await GetRoomById(Number(id2));
      if (res) {
        if (Array.isArray(res)) {
          setRooms(res);
          // Set the selected room's price
    
        } else {
          setRooms([res]);
          // Set the selected room's price

        }
      }
    } catch (error) {
      console.error("Error fetching hotel details:", error);
      // Handle error appropriately
    }
  };

  useEffect(() => {
    getRoomById();
  }, [id2]);

  // Fetch hotel details based on the provided ID
  const getHotelById = async () => {
    try {
      let res = await GetHotelById(Number(id));
      if (res) {
        if (Array.isArray(res)) {
          setHotels(res);
        } else {
          setHotels([res]);
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

  // Filter rooms based on hotel ID
  const filteredRooms = rooms.filter((room) => room.ID === Number(id2));
  const roomData = filteredRooms.map((room) => {
    const roomtype = roomtypes.find((rt) => rt.ID === room.RoomtypeID);
    return {
      title: roomtype?.Name || "", // Add a default value if roomtype is undefined
      profile: room.Profile,
      price: room.Price,
      id2: room.ID
    };
  });

  const data = hotel.map((hotel) => ({
    title: hotel.Name,
    description: hotel.Description,
    profile: hotel.Profile,
    price: hotel.Price,
    location: hotel.Location,
    hotelclass: hotel.Hotelclass,
    id: hotel.ID,
    type: hotel.Hoteltype,
    // Add other properties as needed
  }));
  
  const onFinish = async (values: BookHotelsInterface) => {
  
    // ในกรณีนี้คุณต้องรอให้ getRoomById เสร็จก่อนที่จะทำ onFinish
    await getRoomById(); // นำไปใช้ที่จำเป็นต่อไป
    console.log(id2);
    // ตรวจสอบว่า rooms มีข้อมูลหรือไม่
    if (rooms.length > 0) {
      // ให้ค่า RoomID เป็น ID ของห้องแรกที่ได้จาก getRoomById
      values.RoomID = rooms[0].ID; // หรือเลือกห้องที่ต้องการได้ตามต้องการ
      values.HotelID = hotel[0].ID;
      values.Price = rooms[0].Price;
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
      <h2>Who Booking?</h2>
      <Form
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
      <Row>
    <Col span={10} push={14}>
    <div style={{marginLeft: "50px", marginTop: "0px"}}>
          <Col xs={24} sm={24} md={24} lg={24} xl={20}>
            
     
          <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={data}
          renderItem={(item) => (

            <List.Item>
              <Card>
                <Space
                  direction="vertical"
                  style={{
                    marginLeft: "50px",
                    textAlign: "left",
                  }}
                >
                  {/* Render the profile image using Avatar */}
                 

                  <div style={{
                    textAlign: 'left',
                    marginLeft: '10px',
                    marginTop: '-160px',
                  }}>
                    <p style={{
                      color: '#000000',
                      fontFamily: 'Roboto, sans-serif',
                      fontSize: '30px',
                      fontStyle: 'normal',
                      fontWeight: 700,
                      lineHeight: 'large',
                      marginBottom: '45px',
                    }}>{item.title}</p>
                    <div style={{
                      textAlign: 'left',
                      marginTop: '-25px',
                    }}>
                      <Rate disabled defaultValue={Number(item.hotelclass)} />
                    </div>
                  </div>

                  <p style={{
                    textAlign: 'left',
                    marginTop: '-75px',
                    marginLeft: '180px',
                  }}>
                    <EnvironmentFilled style={{
                      fontSize: "25px",
                      color: "#2A60EB",
                      marginRight: '5px',
                    }} />
                    <span style={{
                      fontSize: "20px",
                      color: "#2A60EB",
                      fontFamily: 'Roboto, sans-serif',
                      fontStyle: 'normal',
                      fontWeight: 700,
                      lineHeight: 'large',
                    }}>{item.location}</span>
                  </p>
                  <div style={{
                    marginTop: '-80px', marginLeft: '-20px'
                  }}>
                   <Avatar size={400} shape="square" src={item.profile} />
                  </div>
                </Space>
                </Card>
              
            </List.Item>
          )}
        />
   
     <Col xs={24} sm={24} md={24} lg={24} xl={24}>
      <Card>
      <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={roomData}
          renderItem={(item) => (
            <List.Item>                                                                                         
                 <h2>Payment Detail</h2>
    <h3>Total amout to be paid <p>THB +{item.price}</p></h3>
                  
               
    
            </List.Item>
          )}
        />
 
    </Card>
        </Col>
        </Col>
        </div>
        
          <Row style={{marginLeft: "50px"
}}>
            <Col style={{ marginTop: "20px" }}>
              <Form.Item>
                <Space>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{
                      fontSize: '20px',
                      backgroundColor: 'rgba(42, 96, 235, 0.30)',
                      color: '#2A60EB',
                      marginRight: '0px', // Adjust the spacing if needed
                      transition: 'background-color 0.3s', // Add smooth transition for hover effect
                      height: '55px', // Adjust the height as needed
                      width: '510px',
                      padding: '0 20px', // Adjust the padding as needed
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center", // Adjust as needed
                      alignItems: "center",
                    }}
                  >
                    <h3>Continue</h3>
                  </Button>
                </Space>
              </Form.Item>
            </Col>
    
      
          </Row>
    </Col>
    <Col span={14} pull={10}>
    <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
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

          <div style={{display: "flex",
    flexDirection: "row",
}}>
<Form.Item label="Check-In" name="DateIn" rules={[{ required: true, message: 'Please input Check-In date!' }]}>
  <DatePicker
    name="DateIn"
    format={dateFormat}

  />
</Form.Item>

<Form.Item label="Check-Out" name="DateOut" rules={[{ required: true, message: 'Please input Check-Out date!' }]}>
  <DatePicker
    name="DateOut"
    style={{ marginLeft: "10px" }}
    format={dateFormat}

  />
</Form.Item>



          </div>


       
        
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={roomData}
          renderItem={(item) => (
            <List.Item>
              <Card >
                <Space direction="horizontal">
                  <Avatar size={400} shape="square" src={item.profile} />
                  <Text strong>{item.title}</Text>
                  <p>{item.price}</p>
                  <p>Number of days: {numberOfDays}</p>
                </Space>
              </Card>
            </List.Item>
          )}
        />
            </Col>
          </Row>
    </Col>
  </Row>
  </Form>
          
          
         
       
   
       
    </div>
  );
}

export default BookingHotel;


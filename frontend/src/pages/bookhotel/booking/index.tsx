import React, { useState, useEffect } from "react";
import { Avatar, Button, Card, Input, List, Space, Typography } from "antd";
import { GetRoomById, GetRooms, GetRoomtypes } from "../../../services/https";
import { RoomsInterface } from "../../../interfaces/IRoom";
import { Link, useParams } from "react-router-dom";
import { RoomtypesInterface } from "../../../interfaces/IRoomtype";

const { Text } = Typography;

function BookingHotel() {
  const [rooms, setRooms] = useState<RoomsInterface[]>([]);
  const [roomtypes, setRoomtypes] = useState<RoomtypesInterface[]>([]);
  // Get room ID from URL parameters
  let { id } = useParams();
  const getRooms = async () => {
    let res = await GetRooms();
    if (res) {
      setRooms(res);
    }
  };

  useEffect(() => {
    getRooms();
  }, []);

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


  // Fetch room details based on the provided ID
  const getRoomById = async () => {
    let res = await GetRoomById(Number(id));
    console.log(res); // Check the fetched data in the console
    if (Array.isArray(res)) {
      setRooms(res);
    } else {
      setRooms([]);
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

  return (
    <div>
     <Card>
        <Input />
        <Input />
        <Input />
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
                  <Link to={`room/${item.id}`}>
                    <Button type="primary">Continue</Button>
                  </Link>
                </Space>
              </Card>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
}

export default BookingHotel;

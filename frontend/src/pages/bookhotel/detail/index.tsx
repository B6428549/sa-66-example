import React, { useState, useEffect } from "react";
import { Space, Avatar, List, Card, Typography, Button, Rate, Image, Divider } from "antd";
import { GetHotelById, GetRoomtypes, GetRooms } from "../../../services/https";
import { HotelsInterface } from "../../../interfaces/IHotel";
import { RoomsInterface } from "../../../interfaces/IRoom";
import { RoomtypesInterface } from "../../../interfaces/IRoomtype";
import { Link, useParams } from "react-router-dom";
import { EnvironmentFilled } from "@ant-design/icons";

const { Text } = Typography;

function Detail() {
  const [hotels, setHotels] = useState<HotelsInterface[]>([]);
  const [rooms, setRooms] = useState<RoomsInterface[]>([]);
  const [roomtypes, setRoomtypes] = useState<RoomtypesInterface[]>([]);

  // Get hotel ID from URL parameters
  let { id } = useParams();

  // Fetch rooms and update state
  const getRooms = async () => {
    try {
      let res = await GetRooms();
      if (res) {
        setRooms(res);
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
      // Handle error appropriately, e.g., display an error message to the user
    }
  };

  useEffect(() => {
    getRooms();
  }, []);

  // Fetch room types and update state
  const getRoomtypes = async () => {
    try {
      let res = await GetRoomtypes();
      if (res) {
        setRoomtypes(res);
      }
    } catch (error) {
      console.error("Error fetching room types:", error);
      // Handle error appropriately
    }
  };

  useEffect(() => {
    getRoomtypes();
  }, []);

  // Fetch hotel details based on the provided ID
  const getHotelById = async () => {
    try {
      console.log("Hotel ID:", id); // Log hotel_id here
      let res = await GetHotelById(Number(id));
      if (res) {
        setHotels([res]);
      }
    } catch (error) {
      console.error("Error fetching hotel details:", error);
      // Handle error appropriately
    }
  };
  
  useEffect(() => {
    getHotelById();
  }, []);

  // Filter rooms based on hotel ID
  const filteredRooms = rooms.filter((room) => room.HotelID === Number(id));

  // Map filtered rooms to the desired format
  const roomData = filteredRooms.map((room) => {
    const roomtype = roomtypes.find((rt) => rt.ID === room.RoomtypeID);
    return {
      title: roomtype?.Name || "Default Room Type", // Add a default value if roomtype is undefined
      profile: room.Profile,
      price: room.Price,
      id: room.ID,
      bed: room.Bed,
      guest: room.Roomguest
    };
  });

  const data = hotels.map((hotel) => ({
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

  return (
    <div>
     
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              
                <Space
                  direction="horizontal"
                  style={{
                    marginLeft: "50px",
                    textAlign: "left",
                  }}
                >
                  {/* Render the profile image using Avatar */}
                  <div style={{
                    marginTop: '-60px',
                  }}>
                    <Image
                      width={450}
                      height={450}
                      src={item.profile}
                      style={{
                        imageRendering: "-webkit-optimize-contrast",
                        backgroundColor: "transparent",
                      }}
                    />
                  </div>

                  <div style={{
                    textAlign: 'left',
                    marginLeft: '50px',
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
                    marginTop: '-70px',
                    marginLeft: '50px',
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
                  <Space direction="vertical"
                  style={{
                    marginLeft: "-280px",
                    textAlign: "left",
                  }}
                >
                  <Divider style={{
                    width: "800px",
                    marginLeft: "-20px",
                    textAlign: "left",
                    marginTop: '100px',
                  }}/>
                  <p style={{
      
      }}>
        <span style={{ fontSize: '18px', color: '#888',
      
     }}>{item.description}</span>
      </p>
      </Space>
                </Space>
              
            </List.Item>
          )}
        />
      

  
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={roomData}
          renderItem={(item) => (
            <List.Item>
              <Card title={item.title} hoverable>
                <Space direction="horizontal">
                  <Image  style={{
      marginTop: '-70px',

    }}width={400}  src={item.profile} />
        <Card>
        <Space direction="horizontal">
        <h2>bed {item.bed} beds</h2>
        <h2>guest {item.guest} </h2>
        </Space>
        </Card>
                </Space>
                        
                <div style={{
      marginTop: '-250px',
      marginLeft: '87%', // Optional: Add some right margin if needed
    }}>
      <p style={{ fontSize: '20px', marginBottom: '-10px', color: '#000000',
          fontFamily: 'Roboto, sans-serif',
         
          fontStyle: 'normal',
          fontWeight: 700,
          lineHeight: 'large', }}>THB <span style={{ fontSize: "40px", color: "#2A60EB", marginLeft: '5px' }}>{item.price}</span></p>
      <p style={{ fontSize: '16px', color: '#888' }}>Per room per night</p>
      <Link to={`room/${item.id}`}>
        <Button
          type="primary"
          style={{
            fontSize: '20px',
            backgroundColor: 'rgba(42, 96, 235, 0.30)',
            color: '#2A60EB',
            marginRight: '0px', // Adjust the spacing if needed
            transition: 'background-color 0.3s', // Add smooth transition for hover effect
            height: '55px', // Adjust the height as needed
            padding: '0 20px', // Adjust the padding as needed
          }}
        >
          Book now
        </Button>
      </Link>
    </div>
              </Card>
              
            </List.Item>
          )}
          
        />
     
    </div>
  );
}

export default Detail;

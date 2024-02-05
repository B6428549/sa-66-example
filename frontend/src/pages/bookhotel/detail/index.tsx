import React, { useState, useEffect } from "react";
import { Space, Avatar, List, Card, Typography, Button, Rate, Image, Divider, Col } from "antd";
import { GetHotelById, GetRoomtypes, GetRooms } from "../../../services/https";
import { HotelsInterface } from "../../../interfaces/IHotel";
import { RoomsInterface } from "../../../interfaces/IRoom";
import { RoomtypesInterface } from "../../../interfaces/IRoomtype";
import { Link, useParams } from "react-router-dom";
import { EnvironmentFilled,WifiOutlined } from "@ant-design/icons";
import poolIcon from "../../../assets/swimming.png"; // Import your swimming pool icon
import serviceIcon from "../../../assets/service.png"; // Import your swimming pool icon
import meetIcon from "../../../assets/meeting-room.png"; // Import your swimming pool icon
import laundryIcon from "../../../assets/laundry-service.png"; // Import your swimming pool icon
import fitnessIcon from "../../../assets/dumbbell.png"; // Import your swimming pool icon
import gameIcon from "../../../assets/console.png"; // Import your swimming pool icon
import salonIcon from "../../../assets/beauty-salon.png"; // Import your swimming pool icon
import barIcon from "../../../assets/bar.png"; // Import your swimming pool icon
import babyIcon from "../../../assets/baby-feeder.png"; // Import your swimming pool icon
import resIcon from "../../../assets/restaurant.png"; // Import your swimming pool icon
import loungeIcon from "../../../assets/laundry-service.png"; // Import your swimming pool icon
import bfIcon from "../../../assets/croissant.png"; // Import your swimming pool icon
import parkIcon from "../../../assets/parking-area.png"; // Import your swimming pool icon

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
    service: hotel.Service,
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
                    <img
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
                      marginRight: '1px',
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
                  
                  </Space>
                  <Col span={15} push={8}>
                  <Divider style={{marginTop: "-200px"}}
                
              />
    <span style={{ fontSize: '18px', color: '#888',
      
    }}>{item.description}</span>
    </Col>
                  <h3 style={{marginTop: "100px"}}>Hotel amitilie</h3>
                  <Divider style={{
               
                  }}/>


<p style={{
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap", // Allow items to wrap to the next line
  }}>
                  {item.service?.map((service, index) => (
                    <React.Fragment key={index}>
                      
                      <div style={{
   display: "flex",
   flexDirection: "row",
   justifyContent: "center", // Adjust as needed
   alignItems: "center",
   marginBottom: '10px', // Adjust spacing between sections
}}>
  
                         {service === 'fitness' && (
                        <>
                     
                        
                          <img src={fitnessIcon} style={{ fontSize: '18px', height: '18px', marginRight: '8px' }} />
                          <span style={{ fontSize: '18px', color: '#888', marginRight: '8px'}}>fitness</span>
                        
                        </>
                      )}
                        {service === 'room-service' && (
                        <>
                        
                          <img src={serviceIcon} style={{ fontSize: '18px', height: '18px', marginRight: '8px' }} />
                          <span style={{ fontSize: '18px', color: '#888', marginRight: '8px' }}>Room Service</span>
                        </>
                      )}
                       {service === 'laundry-dry-cleaning' && (
                        <>
                          <img src={laundryIcon} style={{ fontSize: '18px', height: '18px', marginRight: '8px' }} />
                          <span style={{ fontSize: '18px', color: '#888', marginRight: '8px' }}>Laundry and Dry Cleaning</span>
                        </>
                      )}
                       {service === 'childcare' && (
                        <>
                          <img src={babyIcon} style={{ fontSize: '18px', height: '18px', marginRight: '8px' }} />
                          <span style={{ fontSize: '18px', color: '#888', marginRight: '8px' }}>childcare</span>
                        </>
                      )}
                      {service === 'pub' && (
                        <>
                          <img src={barIcon} style={{ fontSize: '18px', height: '18px', marginRight: '8px' }} />
                          <span style={{ fontSize: '18px', color: '#888', marginRight: '8px' }}>pub</span>
                        </>
                      )}
                       {service === 'spasalon' && (
                        <>
                          <img src={salonIcon} style={{ fontSize: '18px', height: '18px', marginRight: '8px' }} />
                          <span style={{ fontSize: '18px', color: '#888', marginRight: '8px' }}>Spa and Salon</span>
                        </>
                      )}
                       {service === 'business-center' && (
                        <>
                          <img src={meetIcon}style={{ fontSize: '18px', height: '18px', marginRight: '8px' }} />
                          <span style={{ fontSize: '18px', color: '#888', marginRight: '8px' }}>Business Center</span>
                        </>
                      )}
                       {service === 'wifi' && (
                        <>
                          <WifiOutlined style={{ fontSize: '18px', height: '18px', marginRight: '8px' }} />
                          <span style={{ fontSize: '18px', color: '#888', marginRight: '8px' }}>wifi</span>
                        </>
                      )}
                       {service === 'lounge' && (
                        <>
                          <img src={loungeIcon}  style={{ fontSize: '18px', height: '18px', marginRight: '8px' }} />
                          <span style={{ fontSize: '18px', color: '#888', marginRight: '8px' }}>lounge</span>
                        </>
                      )}
                       {service === 'game-room' && (
                        <>
                          <img src={gameIcon}  style={{ fontSize: '18px', height: '18px', marginRight: '8px' }} />
                          <span style={{ fontSize: '18px', color: '#888', marginRight: '8px' }}>Game Room</span>
                        </>
                      )}
                      {service === 'restaurants' && (
                        <>
                          <img src={resIcon} alt="Swimming Pool" style={{ fontSize: '18px', height: '18px', marginRight: '8px' }} />
                          <span style={{ fontSize: '18px', color: '#888', marginRight: '8px' }}>restaurants</span>
                        </>
                      )}
                      {service === 'swimmingpool' && (
                        <>
                          <img src={poolIcon} alt="Swimming Pool" style={{ width: '18px', height: '18px', marginRight: '8px' }} />
                          <span style={{ fontSize: '18px', color: '#888', marginRight: '8px' }}>Swimming Pool</span>
                        </>
                      )}
                      {service === 'park' && (
                        <>
                          <img src={poolIcon} alt="Swimming Pool" style={{ width: '18px', height: '18px', marginRight: '8px' }} />
                          <span style={{ fontSize: '18px', color: '#888', marginRight: '8px' }}>Swimming Pool</span>
                        </>
                      )}
                    
                      </div>
                      {service !== 'wifi' && service !== 'swimmingpool' && service !== 'restaurants' &&
                      service !== 'game-room' && service !== 'lounge' && 
                      service !== 'business-center' && service !== 'spasalon' && service !== 'pub' &&
                      service !== 'laundry-dry-cleaning' && service !== 'room-service' && 
                      service !== 'childcare' &&  service !== 'fitness' && (
                        <span style={{ fontSize: '18px', color: '#888', marginRight: '8px' }}>
                          {service}
                        </span>
                      )}
                      {item.service && index !== (item.service.length - 1) && <span style={{ marginRight: '8px' }}>&bull;</span>}
                    </React.Fragment>
                  ))}
                </p>
                





    
            
              
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

import React, { useState, useEffect } from "react";
import SearchRooms from '../../../components/searh';
import "../../../App.css";
import { Space, Card, Input, Button, Rate, Slider, Select, List, Image, Typography, Col, Row, InputNumber, Flex, Divider } from "antd";

import { GetHotels, GetHoteltypes } from "../../../services/https";
import { HotelsInterface } from "../../../interfaces/IHotel";
import { HoteltypesInterface } from "../../../interfaces/IHoteltype";
import { Link } from "react-router-dom";
import bg from "../../../assets/bg.png"
import SliderCarousel from "../../../components/sliderpage";

import pic3 from '../../../assets/showcase3.jpg';

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
const { Option } = Select;
const { TextArea } = Input;
const { Text } = Typography;

function Category() {
  const [hotels, setHotels] = useState<HotelsInterface[]>([]);
  const [hoteltypes, setHoteltypes] = useState<HoteltypesInterface[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<HotelsInterface[]>([]);
  const [value, setValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedDropdownItem, setSelectedDropdownItem] = useState<string>('');
  const [priceRange, setPriceRange] = useState<number[]>([0, 9000]);
  const [selectedHotelType, setSelectedHotelType] = useState<number | undefined>();
  const [selectedHotelclass, setSelectedHotelclass] = useState<number | undefined>();
  const [selectedHotelclassLevel, setSelectedHotelclassLevel] = useState<number | undefined>();
  const [propertyNameSearchTerm, setPropertyNameSearchTerm] = useState<string>('');
  const [guestSearchTerm, setGuestSearchTerm] = useState<number | undefined>();
  const getHoteltypes = async () => {
    let res = await GetHoteltypes();
    if (res) {
      setHoteltypes(res);
    }
  };

  useEffect(() => {
    getHoteltypes();
  }, []);

  const getHotels = async () => {
    let res = await GetHotels();
    if (res) {
      // Filter hotels based on the selected price range, hotel type ID, and hotelclass level
      const filtered = res.filter((hotel: { Price: number; HoteltypeID: number; Hotelclass: number }) => 
        hotel.Price >= priceRange[0] &&
        hotel.Price <= priceRange[1] &&
        (!selectedHotelType || hotel.HoteltypeID === selectedHotelType) &&
        (!selectedHotelclass || hotel.Hotelclass === selectedHotelclass) &&
        (!selectedHotelclassLevel || hotel.Hotelclass === selectedHotelclassLevel)
      );
      setHotels(filtered);
    }
  };

  useEffect(() => {
    getHotels();
  }, [priceRange, selectedHotelType, selectedHotelclass, selectedHotelclassLevel]);

  const handleRateChange = (value: number) => {
    console.log(`Rating: ${value}`);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setValue(inputValue);

    setShowDropdown(inputValue.trim().length > 0);
  };

  const onSearch = (searchTerm: string) => {
    setValue(searchTerm);

    const filteredData = hotels.filter((hotel) => {
      const location = hotel?.Location?.toLowerCase() || "";
      return location.includes(searchTerm.toLowerCase());
    });

    setFilteredHotels(filteredData);

    setShowDropdown(false);
    setSelectedDropdownItem(searchTerm);
  };

  const handleSliderChange = (value: number[]) => {
    setPriceRange(value);
  };

  const onPropertyNameSearch = (searchTerm: string) => {
    setPropertyNameSearchTerm(searchTerm);

    const filteredData = hotels.filter((hotel) => {
      const hotelName = hotel?.Name?.toLowerCase() || "";
      return hotelName.includes(searchTerm.toLowerCase());
    });

    setFilteredHotels(filteredData);

    setShowDropdown(false);
    setSelectedDropdownItem(searchTerm);
  };

  const onGuestSearch = (value: number | null) => {
    // Use 'undefined' if the value is null
    const guestValue = value !== null ? value : undefined;
    setGuestSearchTerm(guestValue);
  
    const filteredData = hotels.filter((hotel) => {
      return hotel?.Guest === guestValue;
    });
  
    setFilteredHotels(filteredData);
  
    setShowDropdown(false);
    setSelectedDropdownItem(guestValue !== undefined ? guestValue.toString() : '');
  };
  
  const data = (filteredHotels.length > 0 ? filteredHotels : hotels).map((hotel) => ({
    title: hotel.Name,
    description: hotel.Description,
    profile: hotel.Profile,
    price: hotel.Price,
    location: hotel.Location,
    hotelclass: hotel.Hotelclass,
    id: hotel.ID,
    type: hotel.Hoteltype,
    service: hotel.Service?.slice(0, 3)
  }));

  const divStyle: React.CSSProperties = {
    background: `url(${pic3})`,
    backgroundSize: 'cover',
    width: "84.2vw",
    height: "20vh",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center", // Adjust as needed
    alignItems: "center",
  };
  
  const inputStyle: React.CSSProperties = {
    width: "250px",
    height: "45px",
    margin: "0 50px", // Add margin for spacing
    
  };

  const cardStyle: React.CSSProperties = {
    width: 620,
  };
  
  const imgStyle: React.CSSProperties = {
    display: 'block',
    width: 273,
  };

  const inputRef = React.useRef(null);
  return (
    <div>
    
     <SliderCarousel/>
      <div style={divStyle}>
        <form>
          <Input
            type="text"
            name="search"
            className="search"
            value={value}
            onChange={onChange}
            style={{width: "250px",
            height: "45px"}}
            placeholder="Destination"
            ref={inputRef} // Add ref to the Input element
          />
          {showDropdown && (
            <div className="dropdown">
              {hotels
                .filter((item) => {
                  const searchTerm: string = value ? value.toLowerCase() : '';
                  const itemName: string | undefined = item.Location?.toLowerCase();
                  return itemName && itemName.startsWith(searchTerm) && itemName !== searchTerm;
                })
                .map((item) => (
                  <div onClick={() => onSearch(item.Location || '')} key={item.Location} className="dropdown-row">
                    {item.Location}
                  </div>
                ))}
            </div>
          )}
         
        
        </form>
          <InputNumber type="text" style={inputStyle} 
          placeholder="Guest"
      value={guestSearchTerm}
      onChange={(value) => onGuestSearch(value)}
    />
      <div style={{marginLeft: "0px"}}>
          <Button type="primary" onClick={() => onSearch(value)} style={{width: "250px",
            height: "45px"}}>
            Search
          </Button>
          </div>

      </div>
     

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={6}>
          <Card>
          <h2>Search by property name</h2>
          <Input
              value={propertyNameSearchTerm}
              onChange={(e) => onPropertyNameSearch(e.target.value)}
            />
 

   
            <h2>Price (THB)</h2>
            <Slider
              range
              defaultValue={priceRange}
              style={{ width: '300px', height: '45px' }}
              step={1000}
              min={0}
              max={9000}
              onChange={handleSliderChange}
            />

            
<h2>Property Types</h2>
            <Select
              allowClear
              style={{ width: "250px", height: "45px" }}
              placeholder="Type"
              onChange={(value) => setSelectedHotelType(value)}
            >
              {hoteltypes.map((item) => (
                <Option value={item.ID} key={item.ID}>
                  {item.Name}
                </Option>
              ))}
            </Select>

            <h2>Hotel Class</h2>

            <Select
              allowClear
              style={{ width: "250px", height: "45px" }}
              placeholder="Class Level"
              onChange={(value) => setSelectedHotelclassLevel(value)}
            >
              {[1, 2, 3, 4, 5].map((level) => (
                <Option value={level} key={level}>
                  {level}
                </Option>
              ))}
            </Select>
            
          </Card>

        </Col>

      <Col xs={24} sm={24} md={24} lg={24} xl={18}>
     
        <List
          dataSource={data}
          grid={{ gutter: 16, column: 1 }}
          renderItem={(item) => (
            <List.Item>
              <Card hoverable >
                <Space
                  direction="horizontal"
                  style={{
                    marginLeft: '0px',
                    textAlign: 'left',
                  }}
                >
                  <div style={{
                    marginTop: '-60px',
                  }}>
                    <Image
                      width={400}
                      height={350}
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
                     <Rate disabled defaultValue={Number(item.hotelclass)} value={Number(item.hotelclass)} />
                    </div>
                  </div>
                  <p style={{
                    textAlign: 'left',
                    marginTop: '-10px',
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
                    <Col span={24} >
                    <div style={{marginLeft: "-190px", width: "450px"}}>
                    <Divider />
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
                      {item.service && index !== (item.service.length - 1) && <span style={{ marginRight: '8px' }}></span>}
                    </React.Fragment>
                  ))}
                </p>
                    </div>
                    </Col>
                  </p>
                 
                 
               

                </Space>
               
                <div style={{
                  marginTop: '-250px',
                  marginLeft: '87%',
                }}>
                  <p style={{ fontSize: '20px', marginBottom: '-10px', color: '#000000',
                    fontFamily: 'Roboto, sans-serif',
                    fontStyle: 'normal',
                    fontWeight: 700,
                    lineHeight: 'large',
                  }}>THB <span style={{ fontSize: "40px", color: "#2A60EB", marginLeft: '5px' }}>{item.price}</span></p>
                  <p style={{ fontSize: '16px', color: '#888' }}>Per room per night</p>
                  <Link to={`/hotel/detail/${item.id}`}>
                    <Button
                      type="primary"
                      style={{
                        fontSize: '20px',
                        backgroundColor: 'rgba(42, 96, 235, 0.30)',
                        color: '#2A60EB',
                        marginRight: '0px',
                        transition: 'background-color 0.3s',
                        height: '55px',
                        padding: '0 20px',
                      }}
                    >
                      Select Room
                    </Button>
                  </Link>
                </div>
              </Card>
            </List.Item>
          )}
        />
    
      </Col>
      </Row>
    </div>
  );
}

export default Category;

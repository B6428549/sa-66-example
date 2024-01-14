import React, { useState, useEffect } from "react";
import SearchRooms from '../../../components/searh'
import "../../../App.css";
import {
  Space,
  Avatar,
  List,
  Slider,
  Select,
  Card,
  Input,
  Image,
  Typography,
  Button,
  Rate,
  Divider,
} from "antd";
import {
  LikeOutlined,
  MessageOutlined,
  StarOutlined,
  UploadOutlined,
  EnvironmentFilled,
} from "@ant-design/icons";
import { GetHotels, GetHoteltypes } from "../../../services/https";
import { HotelsInterface } from "../../../interfaces/IHotel";
import { Link } from "react-router-dom";
import { HoteltypesInterface } from "../../../interfaces/IHoteltype";

const { Option } = Select;
const { TextArea } = Input;
const { Text } = Typography;

function Category() {
  const [hotels, setHotels] = useState<HotelsInterface[]>([]);
  const [hoteltypes, setHoteltypes] = useState<HoteltypesInterface[]>([]);
  const [selectedHotel, setSelectedHotel] = useState<string | undefined>();
  const [filteredHotels, setFilteredHotels] = useState<HotelsInterface[]>([]);
  const [value, setValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedDropdownItem, setSelectedDropdownItem] = useState<string>('');

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
      setHotels(res);
    }
  };

  useEffect(() => {
    getHotels();
  }, []);

  const handleHotelSelect = (value: string) => {
    setSelectedHotel(value);
  };

  const handleRateChange = (value: number) => {
    console.log(`Rating: ${value}`);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setValue(inputValue);

    // ตรวจสอบว่ามีการกรอกข้อมูลหรือไม่เพื่อกำหนดการแสดง dropdown
    setShowDropdown(inputValue.trim().length > 0);
  };

  const onSearch = (searchTerm: string) => {
    setValue(searchTerm);

    // Filter hotels based on the entered destination
    const filteredData = hotels.filter((hotel) => {
      const location = hotel?.Location?.toLowerCase() || "";
      return location.includes(searchTerm.toLowerCase());
    });

    // Set the filtered hotels
    setFilteredHotels(filteredData);

    // ตั้งค่า selectedDropdownItem เมื่อมีการค้นหา
    setShowDropdown(false); // ซ่อน dropdown เมื่อเลือกรายการ
    setSelectedDropdownItem(searchTerm);
  };

  const data = (filteredHotels.length > 0 ? filteredHotels : hotels).map((hotel) => ({
    title: hotel.Name,
    description: hotel.Description,
    profile: hotel.Profile,
    price: hotel.NumberofRoom,
    location: hotel.Location,
    hotelclass: hotel.Hotelclass,
    id: hotel.ID,
    type: hotel.Hoteltype
  }));




  return (
    <div>
      
      <form>
        <Input
          type="text"
          name="search"
          className="search"
          value={value}
          onChange={onChange}
          style={{ width: "250px", marginLeft: "100px", height: "45px" }}
          placeholder="Destination"
        />
        <Button type="primary" onClick={() => onSearch(value)}>
          Search
        </Button>
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
      <Input
        style={{ width: "250px", marginLeft: "100px", height: "45px" }}
        placeholder="Guest"
      />
      <Select
        allowClear
        style={{ width: "250px", marginLeft: "100px", height: "45px" }}
        placeholder="Type"
        onChange={handleHotelSelect}
      >
        {hoteltypes.map((hoteltypes) => (
          <Option key={hoteltypes.ID} value={hoteltypes.ID}>
            {hoteltypes.Name}
          </Option>
        ))}
      </Select>

      <Slider
        defaultValue={0}
        style={{ width: '500px', marginLeft: '100px', height: '45px' }}
        step={1000}
        min={1000}
        max={9000}
   
      />


      <Card>
        <List
          dataSource={data}
          grid={{ gutter: 16, column: 1 }}
          renderItem={(item) => (
            <List.Item>
              <Card>
                <Space
                  direction="horizontal"
                  style={{
                    marginLeft: '50px',
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
      </Card>
    </div>
  );
}

export default Category;

import React, { useState } from "react";
import { Slider, Select } from "antd";
import { HotelsInterface } from "../interfaces/IHotel";

interface RoomPriceProps {
  title: string;
}

interface GuestsComponentProps {
  title: string;
  option: number[];
}

const SearchRooms = () => {
  return (
    <div className="p-2">
      <div className="m-4 mx-auto p-4 px-20 rounded-xl bg-[#fcf2dd] w-fit flex flex-col md:flex-row justify-center gap-10 items-center">
        <div>
          <span>Packages</span>
          <h3 className="text-4xl">Treat Yourself</h3>
        </div>
        <RoomPrice title={'Price Per Night'} />
        <GuestsComponent title={'Guests'} option={[1, 2, 3, 4]} />
      </div>
    </div>
  );
};

export default SearchRooms;

function RoomPrice({ title }: RoomPriceProps) {
  const [priceRange, setPriceRange] = useState<number[]>([1000]);

  const handleChange = (value: number) => setPriceRange([value]);

  return (
    <div className="min-w-[8rem]">
      <label htmlFor="RoomPrice">{title}</label>
      <Slider
        value={priceRange[0]}
        onChange={handleChange}
        tipFormatter={(value) => `${value}`}
        step={1000}
        min={1000}
        max={10000}
      />
    </div>
  );
}

function GuestsComponent({ title, option }: GuestsComponentProps) {
  const [guest, setGuest] = useState<number | null>(null);

  const handleChange = (value: number) => setGuest(value);

  return (
    <div style={{ minWidth: 120 }}>
      <Select value={guest} onChange={handleChange}>
        {option.map((item) => (
          <Select.Option key={item} value={item}>
            {item}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
}

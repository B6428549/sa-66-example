import { HotelsInterface } from "./IHotel";
import { RoomsInterface } from "./IRoom";

export interface BookHotelsInterface {
    ID?: number; 
    DateIn?: String;
    DateOut?: String;
    Name?: string;
    Phone?: string;
    Email?: string;
    Price?: number;
    RoomID?: Number;
    Room?: RoomsInterface;
    HotelID?: Number;
    Hotel?: HotelsInterface;
}
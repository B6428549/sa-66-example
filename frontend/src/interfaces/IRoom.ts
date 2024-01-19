
import { HotelsInterface } from "./IHotel";
import { RoomtypesInterface } from "./IRoomtype";

export interface RoomsInterface {
  Name: any;
  RoomID: number;
  ID?: number;
  HotelID?: number;
  Hotel: HotelsInterface
  RoomtypeID?: number;
  Roomtype: RoomtypesInterface
  Price?: number;
  Bed?: number;
  Profile?: string;
  Roomguest?: number;
}

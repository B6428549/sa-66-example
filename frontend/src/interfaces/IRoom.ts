
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
  Price?: string;
  Bed?: string;
  Profile?: string;
}

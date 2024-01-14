
import { HotelsInterface } from "./IHotel";
import { RoomtypesInterface } from "./IRoomtype";

export interface RoomsInterface {
  ID?: number;
  HotelID?: number;
  Hotel: HotelsInterface
  RoomtypeID?: number;
  Roomtype: RoomtypesInterface
  Price?: string;
  Bed?: string;
  Profile?: string;
}

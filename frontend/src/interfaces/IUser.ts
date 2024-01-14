import { GendersInterface } from "./IGender";
import { HoteltypesInterface } from "./IHoteltype";

export interface UsersInterface {
  ID?: number;
  FirstName?: string;
  LastName?: string;
  Email?: string;
  Phone?: string;
  GenderID?: number;
  Gender?: GendersInterface;
  Profile?: string;
  HoteltypeID?: number;
  Hoteltype?: HoteltypesInterface;
}

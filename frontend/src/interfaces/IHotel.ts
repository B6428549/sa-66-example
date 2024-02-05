import { HoteltypesInterface } from "./IHoteltype";


export interface HotelsInterface {
  
  ID?: number;
  Name?: string;
  Location?: string;
  Hotelclass?: number;
  Description?: string;
  HoteltypeID?: number;
  Hoteltype?: HoteltypesInterface;
  Profile?: string;
  Guest?: number;
  Price?: number;
  Service?: string[];
  
 
}

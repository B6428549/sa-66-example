import { HoteltypesInterface } from "./IHoteltype";


export interface HotelsInterface {
  ID?: number;
  Name?: string;
  Location?: string;
  Hotelclass?: string;
  Description?: string;
  HoteltypeID?: number;
  Hoteltype?: HoteltypesInterface;
  Profile?: string;
  Guest?: string;
  NumberofRoom?: string;
  
 
}

import { RoomsInterface } from "./IRoom";

export interface BookHotelsInterface {
    ID?: number; 
    DateIn?: String;
    DateOut?: String;
    Name?: string;
    Phone?: string;
    Email?: string;
    RoomID?: Number;
    Room?: RoomsInterface;
}
import { RoomsInterface } from "./IRoom";

export interface BookHotelsInterface {
    ID?: number; 
    DateIn?: Date;
    DateOut?: Date;
    Name?: string;
    Phone?: string;
    Email?: string;
    RoomID?: Number;
    Room?: RoomsInterface;
}
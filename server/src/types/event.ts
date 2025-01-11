import { Date } from "mongoose";

export interface CreateEventRequestBody {
  name: string;
  date: Date;
  totalTickets: number;
  availableTickets: number;
  ticketPrice: number;
  description: string;
}

export interface PurchaseTicketRequestBody {
  userId: string;
  ticketsPurchased: number;
}

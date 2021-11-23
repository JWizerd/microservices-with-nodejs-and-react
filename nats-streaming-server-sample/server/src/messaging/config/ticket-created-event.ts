import { CHANNELS } from ".";
import { Event } from "./event";

export interface TicketMessage {
  title: string;
  price: number;
}

export interface TicketCreatedEvent extends Event {
  subject: CHANNELS.TICKET_CREATED,
  data: TicketMessage
}
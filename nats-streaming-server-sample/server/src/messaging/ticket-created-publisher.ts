import { Stan } from "node-nats-streaming";
import { CHANNELS } from "./config/channels";
import { TicketCreatedEvent } from "./config/ticket-created-event";
import { Publisher } from "./publisher";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  channel = CHANNELS.TICKET_CREATED;

  onSuccessfulPublish(client: Stan) {
    console.log(`Message Publish to Channel: ${this.channel}`);

  }
}
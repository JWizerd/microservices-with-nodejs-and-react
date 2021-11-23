import { Stan } from "node-nats-streaming";
import { CHANNELS } from "./config/channels";
import { Publisher } from "./publisher";

export class TicketCreatedPublisher extends Publisher {
  subject = CHANNELS.TICKET_CREATED;
  onSuccessfulPublish(client: Stan) {
    console.log(`Message Publish to Channel: ${this.subject}`);
  }
}
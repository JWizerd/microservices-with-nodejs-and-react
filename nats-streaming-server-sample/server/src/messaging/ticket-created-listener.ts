import { Message } from "node-nats-streaming";
import { CHANNELS } from "./config/channels";
import { Listener } from "./listener";
import { QUEUE_GROUPS } from "./config/queue-groups";
import { TicketCreatedEvent } from "./config/ticket-created-event";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  channel: CHANNELS.TICKET_CREATED = CHANNELS.TICKET_CREATED;
  queueGroupName = QUEUE_GROUPS.ACCOUNTING_SERVICE;

  onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    console.log(`Processing Message #${msg.getSequence()} with DATA: ${JSON.stringify(data)}`);
    msg.ack();
  }
}
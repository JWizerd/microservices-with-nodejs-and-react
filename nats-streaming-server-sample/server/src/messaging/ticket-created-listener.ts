import { Message } from "node-nats-streaming";
import { CHANNELS } from "./config/channels";
import { Listener } from "./listener";
import { QUEUE_GROUPS } from "./config/queue-groups";

export class TicketCreatedListener extends Listener {
  subject = CHANNELS.TICKET_CREATED;
  queueGroupName = QUEUE_GROUPS.ACCOUNTING_SERVICE;
  onMessage(data: any, msg: Message) {
    console.log(`Processing Message #${msg.getSequence()} with DATA: ${JSON.stringify(data)}`);
    msg.ack();
  }
}
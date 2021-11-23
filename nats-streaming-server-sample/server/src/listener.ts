import { TicketCreatedListener } from "./messaging/ticket-created-listener";
import { CLUSTERS, NATS_URL } from "./messaging/config";
import { getNATSClient } from "./messaging/get-nats-client";

const client = getNATSClient(NATS_URL, CLUSTERS.TICKETING);

// remove NATS logs
console.clear();

client.on("connect", () => {
  const ticketListener = new TicketCreatedListener(client);
  ticketListener.listen();
});






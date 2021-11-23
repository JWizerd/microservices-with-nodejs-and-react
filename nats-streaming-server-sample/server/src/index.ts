import { bootstrap } from "./app";
import { NATS_URL, CLUSTERS } from "./messaging/config";
import { getNATSClient } from "./messaging/get-nats-client";


const client = getNATSClient(NATS_URL, CLUSTERS.TICKETING);

// remove NATS logs
console.clear();

client.on("connect", bootstrap.bind(client));
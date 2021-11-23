import { v4 } from "uuid";
import nats from "node-nats-streaming";

export function getNATSClient(url: string, clusterName: string, clientId = v4()) {
  const client = nats.connect(clusterName, clientId, { url });

  client.on("connect", () => {
    console.log(`CLUSTER: ${clusterName} LISTENER connected to ${url}`);
    client.on("close", console.log.bind("closing connection to NATS"));
  });

  const disconnectAndExit = () => {
    client.close();
    process.exit();
  }


  process.on("SIGINT", disconnectAndExit);
  process.on("SIGTERM", disconnectAndExit);

  return client;
}
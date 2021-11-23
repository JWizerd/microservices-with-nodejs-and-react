export { CHANNELS } from "./channels";
export { CLUSTERS } from "./clusters";
export { QUEUE_GROUPS } from "./queue-groups";
export const NATS_URL = `http://${process.env.NATS_CLUSTER}:${process.env.NATS_CLUSTER_PORT}`;
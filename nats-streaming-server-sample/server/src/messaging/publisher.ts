import { Stan } from "node-nats-streaming";
import { Event } from "./config/event";

export abstract class Publisher<T extends Event> {
  abstract onSuccessfulPublish(client: Stan): void
  abstract channel: T['channel'];

  constructor(private client: Stan) {}

  publish(data: T['data']) {
    this.client.publish(
      this.channel,
      this.serializeData(data),
      () => this.onSuccessfulPublish(this.client)
    );
  }

  serializeData(data: any) {
    return Buffer.isBuffer(data) ? data : JSON.stringify(data);
  }
}
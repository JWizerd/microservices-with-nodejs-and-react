import { Stan } from "node-nats-streaming";
import { Event } from "./config/event";

export abstract class Publisher<T extends Event> {
  abstract channel: T['channel'];

  constructor(private client: Stan) {}

  publish(data: T['data']): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.publish(
        this.channel,
        this.serializeData(data),
        (err) => {
          if (err) {
            return reject(err);
          }

          console.log(`Message published to: ${this.channel}`)
          resolve();
        }
      );
    })
  }

  serializeData(data: any) {
    return Buffer.isBuffer(data) ? data : JSON.stringify(data);
  }
}
import { Stan } from "node-nats-streaming";

export abstract class Publisher {
  abstract onSuccessfulPublish(client: Stan): void
  abstract subject: string;

  constructor(private client: Stan) {}

  publish(data: any) {
    this.client.publish(
      this.subject,
      this.serializeData(data),
      () => this.onSuccessfulPublish(this.client)
    );
  }

  serializeData(data: any) {
    return Buffer.isBuffer(data) ? data : JSON.stringify(data);
  }
}
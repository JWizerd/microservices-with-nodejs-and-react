import { Message, Stan } from "node-nats-streaming";
import { Event } from "./config/event";

export abstract class Listener<T extends Event> {
  abstract readonly channel: T['channel'];
  abstract onMessage(parsedData: T['data'], msg: Message): void;
  abstract queueGroupName: string;
  protected ackWait = 5 * 1000;

  constructor(private client: Stan) {}

  private subscriptionsOptions() {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGroupName);
  }

  listen() {
    const sub = this.client.subscribe(
      this.channel,
      this.queueGroupName,
      this.subscriptionsOptions()
    );

    sub.on("message", (msg: Message) => {
      console.log(`RECEIVED #${msg.getSequence()} - ${this.channel}--${this.queueGroupName}`);
      const parsedData = this.parseMessage(msg);
      this.onMessage(parsedData, msg);
    })
  }

  private parseMessage(msg: Message): T['data'] {
    const data = msg.getData();

    if (typeof data === 'string') {
      return JSON.parse(data);
    }

    return JSON.parse(data.toString('utf8'));
  }
}
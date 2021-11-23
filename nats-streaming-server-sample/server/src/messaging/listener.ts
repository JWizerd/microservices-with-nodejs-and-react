import { Message, Stan } from "node-nats-streaming";
import { Event } from "./config/event";

export abstract class Listener<T extends Event> {
  abstract channel: T['channel'];
  abstract onMessage(parsedData: T['data'], msg: Message): void;
  abstract queueGroupName: string;
  protected ackWait = 5 * 1000;

  constructor(private client: Stan) {}

  /**
   * setManualAckMode
   *  - requires that you fire msg.ack()  AKA akncwledge after processing is complete
   *  - this allows adequate processing time for an operation
   *  - NATS will wait for the specified time (default is 30s) for an ack
   *    if no ack in that time, it re-queues the message to be handle by another worker
   *
   * setDeliverAllAvailable
   *  - replays all messages from the beginning
   *
   * setDurableName
   *  - creates a durable subscription
   *  - a durable subscription is one that NATS keeps track of
   *    therefore NATS can ensure that only messages that a queue group has received are sent
   *  - this allows you to replay all messages but not have to process every message again
   *
   */
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
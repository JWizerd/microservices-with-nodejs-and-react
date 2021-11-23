import { Message, Stan } from "node-nats-streaming";

export abstract class Listener {
  abstract subject: string;
  abstract onMessage(data: any, msg: Message): void;
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
      this.subject,
      this.queueGroupName,
      this.subscriptionsOptions()
    );

    sub.on("message", (msg: Message) => {
      console.log(`RECEIVED #${msg.getSequence()} - ${this.subject}--${this.queueGroupName}`);
      const parsedData = this.parseMessage(msg);
      this.onMessage(parsedData, msg);
    })
  }

  private parseMessage(msg: Message) {
    const data = msg.getData();

    if (typeof data === 'string') {
      return JSON.parse(data);
    }

    return JSON.parse(data.toString('utf8'));
  }
}
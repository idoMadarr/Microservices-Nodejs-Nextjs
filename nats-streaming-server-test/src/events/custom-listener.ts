// Abstract Class is just a blue print for other sub-classes
import { Message, Stan } from 'node-nats-streaming';
import { Channels } from '../types/channel-types';

interface Event {
  channel: Channels;
  data: any;
}

// T is a way to create Generic types. Its mean that the sub-class that we'll create will have to follow after the types of the Event interface
export abstract class Listener<T extends Event> {
  client: Stan;
  ackWait = 5 * 1000;

  abstract channel: T['channel'];
  abstract queueGroup: string;
  abstract onMessage(data: T['data'], msg: Message): void;

  constructor(client: Stan) {
    this.client = client;
  }

  subscriptionOptions() {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGroup);
  }

  listen() {
    const subscription = this.client.subscribe(
      this.channel,
      this.queueGroup,
      this.subscriptionOptions()
    );

    subscription.on('message', (msg: Message) => {
      console.log(
        `Listening on channel: ${this.channel} with group: ${this.queueGroup}`
      );
      const parsedData = this.parse(msg);
      this.onMessage(parsedData, msg);

      msg.ack();
    });
  }

  parse(msg: Message) {
    const data = msg.getData();
    return typeof data === 'string'
      ? JSON.parse(data)
      : JSON.parse(data.toString('utf-8'));
  }
}

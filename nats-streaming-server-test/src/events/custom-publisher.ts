import { Stan } from 'node-nats-streaming';
import { Channels } from '../types/channel-types';

interface Event {
  channel: Channels;
  data: any;
}

export abstract class Publisher<T extends Event> {
  client: Stan;

  abstract channel: T['channel'];

  constructor(client: Stan) {
    this.client = client;
  }

  publish(data: T['data']): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.publish(this.channel, JSON.stringify(data), err => {
        if (err) {
          return reject(err);
        }
        console.log(`Publishing: ${this.channel}`);
        resolve();
      });
    });
  }
}

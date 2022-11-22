import { Message } from 'node-nats-streaming';
import { Listener } from './custom-listener';
import { TicketCreatedEventType } from '../types/ticket-created-type';
import { Channels } from '../types/channel-types';

export class TicketCreatedListener extends Listener<TicketCreatedEventType> {
  channel: TicketCreatedEventType['channel'] = Channels.TICKET_CREATED;
  queueGroup = 'payments-serivce';

  onMessage(data: TicketCreatedEventType['data'], msg: Message) {
    console.log('!EVENT DATA', data);

    msg.ack();
  }
}

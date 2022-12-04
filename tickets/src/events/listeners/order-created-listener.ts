import {
  Listener,
  Channels,
  OrderCreatedEventType,
} from '@adar-tickets/common';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../models/Ticket';

export class OrderCreatedListener extends Listener<OrderCreatedEventType> {
  channel: OrderCreatedEventType['channel'] = Channels.ORDER_CREATED;
  queueGroup = 'tickets-service';

  async onMessage(data: OrderCreatedEventType['data'], msg: Message) {
    const { ticket, id } = data;

    const selectedTicket = await Ticket.findById(ticket.id);

    if (!selectedTicket) throw new Error('Ticket not found');

    selectedTicket.set({ orderId: id });
    await selectedTicket.save();
    msg.ack();
  }
}

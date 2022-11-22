import nats from 'node-nats-streaming';
import { TicketCreatedPublisher } from './events/ticket-created-publisher';

console.clear();

const stan = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222',
});

stan.on('connect', async () => {
  console.log('Publisher connect to NATS');

  const data = { id: '0', title: 'Content', price: 25 };
  const publisher = new TicketCreatedPublisher(stan);
  await publisher.publish(data);
});

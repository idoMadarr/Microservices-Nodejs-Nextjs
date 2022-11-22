import nats from 'node-nats-streaming';
import { randomBytes } from 'crypto';
import { TicketCreatedListener } from './events/ticket-created-listener';

console.clear();

const generateClientId = () => randomBytes(4).toString('hex');

const stan = nats.connect('ticketing', generateClientId(), {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('Listener connect to NATS');

  new TicketCreatedListener(stan).listen();

  stan.on('close', () => {
    console.log('NATS connection is closed');
    process.exit();
  });
});

// Those are two hadnlers that should tack after listeners, this implementaion should help NATS to follow after the excat number of clients.
// NOTICE: In windows this method does not going to work (Still meke sure to keep this code).
process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());

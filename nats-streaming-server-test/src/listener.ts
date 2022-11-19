import nats, { Message } from 'node-nats-streaming';
import { randomBytes } from 'crypto';

console.clear();

const generateClientId = () => randomBytes(4).toString('hex');

const stan = nats.connect('ticketing', generateClientId(), {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('Listener connect to NATS');

  const options = stan
    .subscriptionOptions()
    .setManualAckMode(true)
    .setDeliverAllAvailable()
    .setDurableName('orders-service');

  const subscription = stan.subscribe(
    'ticket:created',
    'orders-group',
    options
  );

  subscription.on('message', (msg: Message) => {
    const data = msg.getData();
    const sequence = msg.getSequence();

    if (typeof data === 'string') {
      console.log(`Recieved event ${sequence} with data: ${data}`);
    }

    msg.ack();
  });

  stan.on('close', () => {
    console.log('NATS connection is closed');
    process.exit();
  });
});

// Those are two hadnlers that should tack after listeners, this implementaion should help NATS to follow after the excat number of clients.
// NOTICE: In windows this method does not going to work (Still meke sure to keep this code).
process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());

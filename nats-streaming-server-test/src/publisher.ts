import nats from 'node-nats-streaming';

console.clear();

const stan = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('Publisher connect to NATS');

  const data = { id: '0', title: 'Content', price: 25 };
  const jsonData = JSON.stringify(data);

  stan.publish('ticket:created', jsonData, () =>
    console.log('Event published')
  );
});

import request from 'supertest';
import { app } from '../app';
import { autoSignin } from './setup';
import { Types } from 'mongoose';

it('return 404 if the provided id is not exist', async () => {
  const cookie = autoSignin();
  const id = new Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/update/${id}`)
    .set('Cookie', cookie)
    .send({ title: 'Valid Title', price: 99.9 })
    .expect(404);
});

it('return 401 if the user is not authenticated', async () => {
  const id = new Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/update/${id}`)
    .send({ title: 'Valid Title', price: 99.9 })
    .expect(401);
});

it('return 401 if the user doest own the ticket', async () => {
  const cookieA = autoSignin();
  const cookieB = autoSignin();

  const response = await request(app)
    .post('/api/tickets/create-ticket')
    .set('Cookie', cookieA)
    .send({ title: 'Valid Title', price: 99.9 })
    .expect(200);

  await request(app)
    .put(`/api/tickets/update/${response.body.id}`)
    .set('Cookie', cookieB)
    .send({ title: 'Update Valid Title', price: 89.9 })
    .expect(401);
});

it('return 400 in case the user fetch invalid credentials', async () => {
  const cookie = autoSignin();

  const response = await request(app)
    .post('/api/tickets/create-ticket')
    .set('Cookie', cookie)
    .send({ title: 'Valid Title', price: 99.9 })
    .expect(200);

  await request(app)
    .put(`/api/tickets/update/${response.body.id}`)
    .set('Cookie', cookie)
    .send({ title: '', price: 89.9 })
    .expect(400);

  await request(app)
    .put(`/api/tickets/update/${response.body.id}`)
    .set('Cookie', cookie)
    .send({ title: 'Second Valid Title', price: -10 })
    .expect(400);
});

it('return 200 as ticket updated', async () => {
  const cookie = autoSignin();

  const response = await request(app)
    .post('/api/tickets/create-ticket')
    .set('Cookie', cookie)
    .send({ title: 'Valid Title', price: 99.9 })
    .expect(200);

  await request(app)
    .put(`/api/tickets/update/${response.body.id}`)
    .set('Cookie', cookie)
    .send({ title: 'Valid New Title', price: 119.9 })
    .expect(200);
});

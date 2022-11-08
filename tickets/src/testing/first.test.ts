import request from 'supertest';
import { app } from '../app';

it('has a route handler listening to /api/tickets for post request', async () => {
  const response = await request(app).post('/api/trade/tickets').send({});

  expect(response.status).not.toEqual(404);
});

it('can only be accessed if the user is signed in', () => {});

it('return error if an invalide price was provided', () => {});

it('return error if an invalide price was provided', () => {});

it('creating new ticket', () => {});

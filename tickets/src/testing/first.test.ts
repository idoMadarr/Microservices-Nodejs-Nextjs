import request from 'supertest';
import { app } from '../app';

it('can only be accessed if the user is signed in', async () => {
  await request(app).post('/api/tickets/create-ticket').send({}).expect(401);
});

// it('returns any status code when user is logged in', async () => {
//   const cookie = await autoSignin();
//   const currentuserResponse = await request(app)
//     .get('/api/users/currentuser')
//     .set('Cookie', cookie)
//     .send({})
//     .expect(200);

//   expect(currentuserResponse.body.currentUser.email).toEqual('test@test.com');
// });

it('return error if an invalide price was provided', () => {});

it('return error if an invalide price was provided', () => {});

it('creating new ticket', () => {});

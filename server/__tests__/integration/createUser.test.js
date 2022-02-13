const request = require('supertest');
const truncate = require('../utils/truncate');

const app = require('../../src/app');

describe('Register a new user', () => {
  beforeEach(async () => {
    await truncate();
  });

  afterEach(async () => {
    await truncate();
  });

  it('should return a token when input is valid', async () => {
    const response = await request(app).post('/user').send({
      displayName: 'Dionysio',
      email: 'unique@email.com',
      password: '12345678',
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
  });

  it('should return an object with a message "User already registered" when user email is already registered', async () => {
    await request(app).post('/user').send({
      displayName: 'Dionysio',
      email: 'notunique@email.com',
      password: '12345678',
    });
    const response = await request(app).post('/user').send({
      displayName: 'Vinícius',
      email: 'notunique@email.com',
      password: '12345678',
    });

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty('message', 'User already registered');
  });
});

// describe('TEST', () => {
//   it('create user', async () => {
//     const user = await User.create({
//       displayName: 'Dionysio',
//       email: 'vini@gmail.com',
//       passwordHash: '12345678',
//     });

//     console.log(user);

//     expect(user.email).toBe('vini@gmail.com');
//   });
// });

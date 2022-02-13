const request = require('supertest');
const truncate = require('../utils/truncate');
const { User } = require('../../src/models');

const app = require('../../src/app');

describe('When try to login,', () => {
  beforeEach(async () => {
    await truncate();
  });

  afterEach(async () => {
    await truncate();
  });

  it('should return a token when login input is valid', async () => {
    await User.create({
      displayName: 'Dionysio',
      email: 'unique@email.com',
      password: '12345678',
    });

    const response = await request(app).post('/login').send({
      email: 'unique@email.com',
      password: '12345678',
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should not authenticate when login input is invalid', async () => {
    await User.create({
      displayName: 'Dionysio',
      email: 'vini@gmail.com',
      password: '12345678',
    });

    const response = await request(app).post('/login').send({
      email: 'unique@email.com',
      password: '11111111',
    });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      'message',
      'Invalid email or password'
    );
  });
});

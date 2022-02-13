const bcrypt = require('bcryptjs');
const truncate = require('../utils/truncate');
const { User } = require('../../src/models');

describe('User', () => {
  beforeAll(async () => {
    await truncate();
  });

  afterEach(async () => {
    await truncate();
  });

  it('should encrypt user password', async () => {
    const user = await User.create({
      displayName: 'Dionysio',
      email: 'vini@gmail.com',
      password: '12345678',
    });

    const compareHash = await bcrypt.compare('12345678', user.passwordHash);
    expect(compareHash).toBe(true);
  });
});

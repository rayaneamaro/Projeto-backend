const request = require('supertest');
const app = require('../src/app');
const sequelize = require('../src/config/database');
const User = require('../src/models/User');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

describe('User Endpoints', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/v1/user')
      .send({
        firstname: 'John',
        surname: 'Doe',
        email: 'john.doe@mail.com',
        password: '123@123',
        confirmPassword: '123@123',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('user');
  });

  it('should fetch a user by ID', async () => {
    const user = await User.create({
      firstname: 'Jane',
      surname: 'Doe',
      email: 'jane.doe@mail.com',
      password: '123@123',
    });

    const res = await request(app).get(`/v1/user/${user.id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('firstname', 'Jane');
  });

});

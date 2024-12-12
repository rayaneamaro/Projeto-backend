const request = require('supertest');
const app = require('../src/app');
const sequelize = require('../src/config/database');
const Category = require('../src/models/Category');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

describe('Category Endpoints', () => {
  it('should create a new category', async () => {
    const res = await request(app)
      .post('/v1/category')
      .send({
        name: 'Electronics',
        slug: 'electronics',
        use_in_menu: true,
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('category');
  });

  it('should fetch a category by ID', async () => {
    const category = await Category.create({
      name: 'Books',
      slug: 'books',
      use_in_menu: true,
    });

    const res = await request(app).get(`/v1/category/${category.id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name', 'Books');
  });
});

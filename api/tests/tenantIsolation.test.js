const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');

describe('Tenant Data Isolation', () => {
  let userA, userB, ticketB;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST);
    
    // Setup test data
    userA = await User.create({
      email: 'admin@tenanta.com',
      password: 'pass123',
      customerId: 'TenantA',
      role: 'admin'
    });

    userB = await User.create({
      email: 'user@tenantb.com',
      password: 'pass123',
      customerId: 'TenantB',
      role: 'user'
    });

    ticketB = await Ticket.create({
      title: 'Tenant B Ticket',
      customerId: 'TenantB'
    });
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
  });

  test('Admin from TenantA cannot access TenantB ticket', async () => {
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'admin@tenanta.com', password: 'pass123' });

    const res = await request(app)
      .get(`/api/tickets/${ticketB._id}`)
      .set('Authorization', `Bearer ${loginRes.body.token}`);

    expect(res.statusCode).toBe(404);
  });
});
const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");
const jwt = require("jsonwebtoken");

describe("Tenant Isolation", () => {
  let tenantAJWT, tenantBTicket;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST || "mongodb://localhost:27017/saas_test");
    await User.deleteMany({});
    await Ticket.deleteMany({});

    const userA = await User.create({ email:"a@x.com", password: "x", customerId:"A", role:"admin" });
    const userB = await User.create({ email:"b@y.com", password: "y", customerId:"B", role:"user" });
    tenantBTicket = await Ticket.create({ ticketId:"tB1", customerId:"B" });

    tenantAJWT = jwt.sign({
      userId: userA._id,
      customerId: "A",
      role: "admin"
    }, process.env.JWT_SECRET);
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
  });

  test("Tenant A admin cannot read Tenant B ticket", async () => {
    const res = await request(app)
      .get(`/api/tickets/${tenantBTicket._id}`)
      .set("Authorization", `Bearer ${tenantAJWT}`);

    expect(res.status).toBe(404);
  });
});

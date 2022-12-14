"use strict";

const request = require("supertest");
const app = require("../app");

/** Tests that  */
describe("POST /", function () {
  test("valid", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
    });

    expect(resp.body).toEqual({ shipped: expect.any(Number) });

  });
  
    test("invalid", async function () {
      const resp = await request(app).post("/shipments").send({
        productId: 1000,
        name: "Test Tester",
        zip: "12345-6789",
      });

      expect(resp.body.error.message).toEqual(["instance requires property \"addr\""]);
      expect(resp.statusCode).toEqual(400);
    });

});


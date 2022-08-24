"use strict";

const express = require("express");
const router = new express.Router();

const jsonschema = require("jsonschema");
const orderSchema = require("../schema/orderSchema.json");

const { BadRequestError } = require("../expressError");

const { shipProduct } = require("../shipItApi");

/** POST /ship
 *
 * VShips an order coming from json body:
 *   { productId, name, addr, zip }
 *
 * Returns { shipped: shipId }
 */

router.post("/", async function (req, res, next) {
  // const { productId, name, addr, zip } = req.body;
  // const shipId = await shipProduct({ productId, name, addr, zip });
  console.log('req.body', req.body);
  const result = jsonschema.validate(req.body, orderSchema, { required: true });
  console.log(result);
  
  if (result.valid) {
    const shipId = await shipProduct(req.body);
    console.log(shipId);

    return res.json({ shipped: shipId });
  } else {
    const errs = result.errors.map(err => err.stack);
    throw new BadRequestError(errs);
  }
});


module.exports = router;
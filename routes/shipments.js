"use strict";

const express = require("express");
const router = new express.Router();

const jsonschema = require("jsonschema");
const orderSchema = (".../schemas/orderSchema.json");

const {BadRequestError} = require("../expressError")

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

  const result = jsonschema.validate(req.body, orderSchema, {required:true});

  if (result.valid){
    const shipId = await shipProduct(req.body);
    return res.json({ shipped: shipId });
  } else {
    const errs= result.errors.map(err => err.stack);
    throw new BadRequestError(errs);
  }
});


module.exports = router;
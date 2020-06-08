//@ts-check
"use strict"

module.exports = () => {
  const express = require('express');
  const router = express.Router();

  const register = require('../controller/register');
  const login = require('../controller/login');
  const product = require('../controller/product');

 
  router.post("/api/product/create",
  product.createProduct
  );

  router.post("/api/product/purchase/create",
  product.createProductPurchase
  );

  router.post("/api/product/view/create",
  product.createProductView
  );
 
  router.get("/api/product/:product_id",
  product.productById
  );

 

  router.get("/api/product/purchase/list",
  product.purchaselist
  );

  router.get("/api/product/purchase/filter",
  product.purchasebyproductFilter
  );

  router.get("/api/product/view/filter",
  product.productViewFilter
  );

  router.get("/api/product/purchase/:purchase_id",
  product.purchaseById
  );



  router.post("/user/signup",
    register.validateBody,
    register.signup
  );

  router.post("/user/login",
    login.validateBody,
    login.signin
  );

  router.all("*", (req, res) => {
    res.status(401).json({ error: "Unauthorised access", code: 401 });
  });

  return router;
}

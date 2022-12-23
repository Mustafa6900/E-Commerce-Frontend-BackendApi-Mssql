const { json } = require('express');
var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
const sql = require("../dboperation");
const sqla = require("../dboperation/addresses");
const sqlb = require("../dboperation/branches");
const sqlc = require("../dboperation/cart");
const sqld = require("../dboperation/categories");
const sqle = require("../dboperation/favorites");
const sqlf = require("../dboperation/order_items");
const sqlg = require("../dboperation/orders");
const sqlh = require("../dboperation/products");
const sqlj = require("../dboperation/reviews");
const sqlk = require("../dboperation/guest");
const sqll = require("../dboperation/wallets");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//test connection
router.get('/testconnect', function(req, res, next) {
  sql.getdata();
  res.render('index', { title: 'Express' });
});

// get all db operation

router.get('/addresses', function(req, res, next) {
  sqla.getAddresses().then(result => {
    res.json(result);
  });
});
router.get('/branches', function(req, res, next) {
  sqlb.getBranches().then(result => {
    res.json(result);
  });
});
router.get('/cart', function(req, res, next) {
  sqlc.getCart().then(result => {
    res.json(result);
  });
});
router.get('/categories', function(req, res, next) {
  sqld.getCategories().then(result => {
    res.json(result);
    res.render(result)
  });
});
router.get('/favorites', function(req, res, next) {
  sqle.getFavorites().then(result => {
    res.json(result);
    res.render(result)
  });
});
router.get('/order_items', function(req, res, next) {
  sqlf.getOrder_items().then(result => {
    res.json(result);
  });
});
router.get('/orders', function(req, res, next) {
  sqlg.getOrders().then(result => {
    res.json(result);
  });
});
router.get('/products', function(req, res, next) {
  sqlh.getProducts().then(result => {
    res.json(result);
  });
});
router.get('/reviews', function(req, res, next) {
  sqlj.getReviews().then(result => {
    res.json(result);
  });
});

router.get('/guest', function(req, res, next) {
  sqlk.getguest().then(result => {
    res.json(result);
  });
});

router.get('/wallets', function(req, res, next) {
  sqll.getWallets().then(result => {
    res.json(result);
  });
});


// branches actions

  router.get('/branches/id/:id', function(req, res, next) {
  sqlb.getBranchesByBranchesId(req.params.id).then(result => {
  res.json(result);
  });
  });
  router.get('/branches/name/:name', function(req, res, next) {
  sqlb.getBranchesByBranchesName(req.params.name).then(result => {
  res.json(result);
  });
  });
  router.get('/branches/city/:city', function(req, res, next) {
  sqlb.getBranchesByBranchesCity(req.params.city).then(result => {
  res.json(result);
  });
  });
  router.get('/branches/street/:street', function(req, res, next) {
  sqlb.getBranchesByBranchesStreet(req.params.street).then(result => {
  res.json(result);
  });
  });
  router.get('/branches/zipcode/:zipcode', function(req, res, next) {
  sqlb.getBranchesByBranchesZipcode(req.params.zipcode).then(result => {
  res.json(result);
  });
  });

//  guest actions

  router.get('/guest/id/:id', function(req, res, next) {
  sqlk.getguestbyid(req.params.id).then(result => {
  res.json(result);
  });
  });
  router.post('/guest/addguest', function(req, res, next) {
    sqlk.addguest(req.body).then(result => {
    res.json(result);
    });
    });
  router.put('/guest/updateguestpassword/:id', function(req, res, next) {
      sqlk.updateguestpassword(req.body).then(result => {
      res.json(result);
      });
      });
  router.route('/guest/guestdelete/:id').delete(function(req, res, next) {
  sqlk.deleteguest(req.body).then(result => {
  res.json(result);
  });
  });

//  addresses actions

  router.get('/addresses/:id', function(req, res, next) {
  sqla.getAddressesByAddressesId(req.params.id).then(result => {
  res.json(result);
  });
  });

  router.post('/addresses/addAddresses/:user_id', function(req, res, next) {
  sqla.addAddresses(req.body).then(result => {
  res.json(result);
  });
  });

// cart actions

  router.get('/cart/:id', function(req, res, next) {
  sqlc.getCartByCartId(req.params.id).then(result => {
  res.json(result);
  });
  });

  router.post('/cart/addCart', function(req, res, next) {
  sqlc.addCart(req.body).then(result => {
  res.json(result);
  });
  });

  router.put('/cart/update/:id', function(req, res, next) {
    sqlc.updateCartItem(req.body).then(result => {
    res.json(result);
    });
    });

  router.route('/cart/delete/:user_id/:product_id').delete(function(req, res, next) {
    sqlc.deleteCartItem(req.params.user_id,req.params.product_id).then(result => {
    res.json(result);
    });
    });

    // categories actions

    router.get('/categories/:category_id', function(req, res, next) {
      sqld.getCategoriesByCategoriesId(req.params.category_id).then(result => {
      res.json(result);
      });
      });
      
      router.get('/categories/subcategories/:parent_id', function(req, res, next) {
        sqld.getSubCategoriesById(req.params.parent_id).then(result => {
        res.json(result);
        });
        });

    // favorites actions
module.exports = router;


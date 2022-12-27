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
const sqlm = require("../dboperation/filter");


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
router.get('/carts', function(req, res, next) {
  sqlc.getCart().then(result => {
    res.json(result);
  });
});
router.get('/categories', function(req, res, next) {
  sqld.getCategories().then(result => {
    res.json(result);
  });
});
router.get('/favorites', function(req, res, next) {
  sqle.getFavorites().then(result => {
    res.json(result);
  
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

  router.get('/guest/getuser/:id', function(req, res, next) {
  sqlk.getguestbyid(req.params.id).then(result => {
  res.json(result);
  });
  });
  router.post('/guest/login', function(req, res, next) {
  sqlk.guestlogin(req.body).then(result => {
  res.json(result);
  });
  });
  router.post('/guest/addguest', function(req, res, next) {
    sqlk.addguest(req.body).then(result => {
    res.json(result);
    });
    });
  router.route('/guest/guestdelete/:id').delete(function(req, res, next) {
  sqlk.deleteguest(req.body).then(result => {
  res.json(result);
  });
  });
  router.put('/ :id', (req, res) => {  // kullanıcı email password güncelleme 
    const id = req.params.id;
    const guest = req.body;
    sqlk.updateGuest(id, guest).then((updatedGuest) => {
    res.json(updatedGuest);
    });
    });
    
//  addresses actions

  router.post('/myAddresses', function(req, res, next) {
  sqla.getAddressesByAddressesId(req.body).then(result => {
  res.json(result);
  });
  });

  router.post('/addresses/addAddresses', function(req, res, next) {
  sqla.addAddresses(req.body).then(result => {
  res.json(result);
  });
  });

  router.delete('/addresses/deleteAddresses' , function(req, res, next) {
  sqla.deleteAddresses(req.body).then(result => {
  res.json(result);
  });
  });
// cart actions

  router.post('/cart', function(req, res, next) {
  sqlc.getCartByCartId(req.body).then(result => {
  res.json(result);
  });
  });

  router.post('/cart/addCart', function(req, res, next) {
  sqlc.addCart(req.body).then(result => {
  res.json(result);
  console.log(result,"cart eklendi")
  });
  });

  router.put('/cart/updateCart', function(req, res, next) {
    sqlc.updateCartItem(req.body).then(result => {
    res.json(result);
    });
    });

  router.route('/cart/deleteCart').delete(function(req, res, next) {
    sqlc.deleteCartItem(req.body).then(result => {
    res.json(result);
    });
    });

    // categories actions


    router.get('/categories/maincategories', function(req, res, next) {  // kategori isimlerini getir
      sqld.getCategoriesById().then(result => {
      res.json(result);
      });
      });

      router.get('/categories/subcategories', function(req, res, next) {  // alt kategori isimlerini getir
        sqld.getsubCategoriesById().then(result => {
        res.json(result);
        });
        });

        router.get('/categories/subcategories/:id', function(req, res, next) {  // secili ana kategorinin alt kategori isimlerini getir
          sqld.getsubCategoriesByParentId(req.params.id).then(result => {
          res.json(result);
          });
          });

    // favorites actions

      router.post('/favorites', function(req, res, next) {
        sqle.getfavoritesByfavoritesId(req.body).then(result => {
        res.json(result);
        });
        });
    
      router.post('/favorites/addfavorites', function(req, res, next) {
      sqle.addfavorites(req.body).then(result => {
      res.json(result);
      
      });
      });
    
      router.put('/favorites/update/:id', function(req, res, next) {
        sqle.updatefavoritesItem(req.body).then(result => {
        res.json(result);
        });
        });
    
      router.route('/favorites/deletefavorites').delete(function(req, res, next) {
        sqle.deletefavoritesItem(req.body).then(result => {
        res.json(result);
        });
        });

        // orders and order_items actions

        router.post('/myorder', function(req, res, next) {
          sqlg.getOrdersById(req.body).then(result => {
          res.json(result);
          });
          });

        router.get("/order/details", function(req, res, next) {
          sqlf.getOrder_itemsById(req.body).then(result => {
            res.json(result);
          });
        });

        router.post('/order/buyproduct', function(req, res, next) {
          sqlg.postOrders(req.body).then(result => {
          res.json(result);
          });
          });

        // products actions

        router.get('/products/category/:name', function(req, res, next) { //ana kategoriye göre ürünler getir
          sqlh.getProductByCategoriesId(req.params.id).then(result => {
          res.json(result);
          });
          });

          router.get('/products/category-barcode?:barcode?:category', function(req, res, next) { // ana kategori ve barkod numarasına göre ürün getir
            const category = req.query.category;
            const barcode = req.query.barcode;
            sqlh.getProductsByCategoryAndBarcode(category, barcode).then(result => {
            res.json(result);
            });
            });

            router.get('/products/:id', function(req, res, next) { //ürün id ye göre ürün getir
              sqlh.getProductById(req.params.id).then(result => {
              res.json(result);
              });
              });

          // reviews actions

          router.get('/reviews/:id', function(req, res, next) {
            sqlj.getReviewsById(req.params.id).then(result => {
            res.json(result);
            });
            });

            router.post('/reviews/addreview', function(req, res, next) {
              sqlj.addReview(req.body).then(result => {
              res.json(result);
              });
              });


              router.route('/reviews/delete/:id').delete(function(req, res, next) {
                sqlj.deleteReviewItem(req.params.id).then(result => {
                res.json(result);
                });
                });

              // wallets actions

              router.post('/myWallets', function(req, res, next) {
                sqll.getWalletsById(req.body).then(result => {
                res.json(result);
                });
                });

                router.post('/wallets/addwallets', function(req, res, next) {
                  sqll.addWallets(req.body).then(result => {
                  res.json(result);
                  });
                  });
                
                router.delete('/wallets/deleteWallets' , function(req, res, next) {
                  sqll.deleteWallets(req.body).then(result => {
                  res.json(result);
                  });
                  });
                  // filter actions

                  router.get('/products/filter/:searchKeyword', function(req, res, next) {
                    const searchKeyword = req.params.searchKeyword;
                 
                    sqlm.getProductFilter(searchKeyword).then(result => {
                    res.json(result);
                    });
                    });


                  

            

module.exports = router;


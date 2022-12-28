var config = require("../dbconfig");
const sql = require("mssql");
 
  async function getCart() {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request().query("SELECT *  FROM cart");
      console.log(" res :" + res);
      return res.recordsets;
    } catch (error) {
        console.log(" error :" + error);
    }
  }

  async function getCartByCartId(user_id) {
    try {
        let pool = await sql.connect(config);
        let res = await pool.request()
            .input('user_id', sql.Int, user_id.user_id)
            .query("SELECT * FROM cart c INNER JOIN products p ON c.product_id = p.id WHERE user_id = @user_id");
        console.log(" res :" + res);
        return res.recordsets;
    } catch (error) {
        console.log(" error :" + error);
    }
}

  async function addCart(cart) {
    try {
        let pool = await sql.connect(config);
        let res = await pool.request()
            .input('user_id', sql.Int, cart.user_id)
            .input('product_id', sql.Int, cart.product_id)
            .input('quantity', sql.Int, cart.quantity).
            query("INSERT INTO cart (user_id, product_id, quantity) VALUES (@user_id, @product_id, @quantity)");
        console.log(" res :" + res);
        return res.recordsets;
    } catch (error) {
        console.log(" error :" + error);
    }
}

async function updateCartItem(cart) {
  try {
    let pool = await sql.connect(config);
    let res = await pool.request()
    .input('product_id', sql.Int, cart.product_id)
    .input('quantity', sql.Int, cart.quantity)
    .input ('user_id', sql.Int, cart.user_id)
    .query("UPDATE cart SET product_id = @product_id, quantity = @quantity WHERE user_id = " + cart.user_id);
    console.log(" res :" + res);
    return res.recordsets;
    } catch (error) {
    console.log(" error :" + error);
    }
    }

async function deleteCartItem(cart) {
    try {
        let pool = await sql.connect(config);
        let res = await pool.request()
            .input('user_id', sql.Int, cart.user_id)
            .input('product_id', sql.Int, cart.product_id)
            .query("DELETE FROM cart WHERE user_id = @user_id AND product_id = @product_id");
        console.log(" res :" + res);
        return res.recordsets;
    } catch (error) {
        console.log(" error :" + error);
    }
}

async function deletemyCart(cart) {
    try {
        let pool = await sql.connect(config);
        let res = await pool.request()
            .input('user_id', sql.Int, cart.user_id)
            .query("DELETE FROM cart WHERE user_id = @user_id");
        console.log(" res :" + res);
        return res.recordsets;
    } catch (error) {
        console.log(" error :" + error);
    }
}


  
module.exports = {
    getCart: getCart,
    getCartByCartId: getCartByCartId,
    addCart: addCart,
    updateCartItem: updateCartItem,
    deleteCartItem: deleteCartItem,
    deletemyCart: deletemyCart
};

var config = require("../dbconfig");
const sql = require("mssql");
 
  async function getOrder_items() {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request().query("SELECT *  FROM order_items");
      console.log(" res :" + res);
      return res.recordsets;
    } catch (error) {
        console.log(" error :" + error);
    }
  }

  async function getOrder_itemsById(orderitem) {
    try {
        let pool = await sql.connect(config);
        let res = await pool.request()
            .input('input_parameter', sql.Int, orderitem.order_id)
            .query("SELECT *  FROM order_items WHERE order_id = @input_parameter");
        console.log(" res :" + res);
        return res.recordsets;
    } catch (error) {
        console.log(" error :" + error);
    }
}

 async function addOrder_items(orderitem) {
    try {
        let pool = await sql.connect(config);
        let res = await pool.request()
            .input('order_id', sql.Int, orderitem.order_id)
            .input('product_id', sql.Int, orderitem.product_id)
            .input('quantity', sql.Int, orderitem.quantity)
            .input('price', sql.Int, orderitem.price)
            .input('is_returned', sql.Int, orderitem.is_returned)
            .query("INSERT INTO order_items (order_id, product_id, quantity, price, is_returned ) VALUES (@order_id, @product_id, @quantity, @price, @is_returned)");
        console.log(" res :" + res);
        return res.recordsets;
    } catch (error) {
        console.log(" error :" + error);
    }
}

 async function getmyOrder_items(orderitem) {
    try {
        let pool = await sql.connect(config);
        let res = await pool.request()
            .input('input_parameter', sql.Int, orderitem.order_id)
            .query("SELECT *  FROM order_items o INNER JOIN products p ON p.id = o.product_id WHERE o.order_id = @input_parameter");
        console.log(" res :" + res);
        return res.recordsets;
    } catch (error) {
        console.log(" error :" + error);
    }
}
 async function order_return_update(orderitem) {
    try {
        let pool = await sql.connect(config);
        let res = await pool.request()
            .input('input_parameter', sql.Int, orderitem.order_id)
            .query("UPDATE order_items SET is_returned = 1 WHERE order_id = @input_parameter");
        console.log(" res :" + res);
        return res.recordsets;
    } catch (error) {
        console.log(" error :" + error);
    }
}

module.exports = {
    order_return_update: order_return_update,
    addOrder_items: addOrder_items,
    getOrder_items: getOrder_items,
    getOrder_itemsById: getOrder_itemsById,
    getmyOrder_items: getmyOrder_items
};

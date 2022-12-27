var config = require("../dbconfig");
const sql = require("mssql");
 
  async function getOrders() {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request().query("SELECT *  FROM orders");
      console.log(" res :" + res);
      return res.recordsets;
    } catch (error) {
        console.log(" error :" + error);
    }
  }
 
  async function getOrdersById(order) {
    try {
        let pool = await sql.connect(config);
        let res = await pool.request()
            .input('input_parameter', sql.Int, order.user_id)
            .query("SELECT *  FROM orders WHERE user_id = @input_parameter");
        console.log(" res :" + res);
        return res.recordsets;
    } catch (error) {
        console.log(" error :" + error);
    }
}

  async function postOrders(order) {
    try {
        let pool = await sql.connect(config);
        let res = await pool.request()
            .input('user_id', sql.Int, order.user_id)
            .input('total_price', sql.Int, order.total_price)
            .input('order_date', sql.Date, order.order_date)
            .input('status', sql.VarChar, order.status)
            .input('address_id', sql.Int, order.address_id)
            .input('wallet_name', sql.VarChar, order.wallet_name)
            .query("INSERT INTO orders (user_id, total_price, order_date, status, address_id , wallet_name ) VALUES (@user_id, @total_price, @order_date, @status, @address_id, @wallet_name)");
        console.log(" res :" + res);
        return res.recordsets;
    } catch (error) {
        console.log(" error :" + error);
    }
}
module.exports = {
    postOrders: postOrders,
    getOrders: getOrders,
    getOrdersById: getOrdersById,
};

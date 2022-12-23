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

  async function getOrdersById(user_id) {
    try {
        let pool = await sql.connect(config);
        let res = await pool.request()
            .input('input_parameter', sql.Int, user_id)
            .query("SELECT *  FROM orders WHERE user_id = @input_parameter");
        console.log(" res :" + res);
        return res.recordsets;
    } catch (error) {
        console.log(" error :" + error);
    }
}

module.exports = {
    getOrders: getOrders,
    getOrdersById: getOrdersById,
};

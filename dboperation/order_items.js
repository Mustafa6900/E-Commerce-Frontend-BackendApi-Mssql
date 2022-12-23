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

  async function getOrder_itemsById(order_id) {
    try {
        let pool = await sql.connect(config);
        let res = await pool.request()
            .input('input_parameter', sql.Int, order_id)
            .query("SELECT *  FROM order_items WHERE order_id = @input_parameter");
        console.log(" res :" + res);
        return res.recordsets;
    } catch (error) {
        console.log(" error :" + error);
    }
}
module.exports = {
    getOrder_items: getOrder_items,
    getOrder_itemsById: getOrder_itemsById,
};

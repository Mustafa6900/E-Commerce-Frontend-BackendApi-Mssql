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
  

module.exports = {
    getOrder_items: getOrder_items,
};

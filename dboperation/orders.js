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
  

module.exports = {
    getOrders: getOrders,
};

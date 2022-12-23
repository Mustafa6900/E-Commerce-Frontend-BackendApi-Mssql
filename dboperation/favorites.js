var config = require("../dbconfig");
const sql = require("mssql");
 
  async function getFavorites() {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request().query("SELECT *  FROM favorites");
      console.log(" res :" + res);
      return res.recordsets;
    } catch (error) {
        console.log(" error :" + error);
    }
  }
  

module.exports = {
    getFavorites: getFavorites,
};

var config = require("../dbconfig");
const sql = require("mssql");
 
  async function getReviews() {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request().query("SELECT *  FROM reviews");
      console.log(" res :" + res);
      return res.recordsets;
    } catch (error) {
        console.log(" error :" + error);
    }
  }
  

module.exports = {
    getReviews: getReviews,
};

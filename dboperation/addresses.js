var config = require("../dbconfig");
const sql = require("mssql");
 
  async function getAddresses() {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request().query("SELECT *  FROM addresses");
      console.log(" res :" + res);
      return res.recordsets;
    } catch (error) {
        console.log(" error :" + error);
    }
  }

  async function getAddressesbyid(user_id) {
    try {
        let pool = await sql.connect(config);
        let res = await pool.request().query("SELECT *  FROM addresses WHERE user_id = " + user_id);
        console.log(" res :" + res);
        return res.recordsets;
    } catch (error) {
        console.log(" error :" + error);
    }
}

   async function addAddresses(addresses) {
    try {
        let pool = await sql.connect(config);
        let res = await pool.requestx()
            .input("user_id", sql.Int, addresses.user_id)
            .input("address", sql.VarChar, addresses.address)
            .input("city", sql.VarChar,addresses.city)
            .input("street", sql.VarChar,addresses.street)
            .input("zipcode", sql.VarChar,addresses.zipcode).
            query("INSERT INTO addresses (user_id, address, city, street, zipcode) VALUES (@user_id, @address, @city, @street, @zipcode)");
        console.log(" res :" + res);
        return res.recordsets;
    } catch (error) {
        console.log(" error :" + error);
    }
}

module.exports = {
    getAddresses: getAddresses,
    getAddressesbyid: getAddressesbyid,
    addAddresses: addAddresses,
};

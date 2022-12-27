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

  async function getAddressesByAddressesId(address) {
    try {
        let pool = await sql.connect(config);
        let res = await pool.request().
        input('user_id', sql.Int, address.user_id)
        .query("SELECT *  FROM addresses WHERE user_id = " + address.user_id);
        console.log(" res :" + res);
        return res.recordsets;
    } catch (error) {
        console.log(" error :" + error);
    }
}

   async function addAddresses(addresses) {
    try {
        let pool = await sql.connect(config);
        let res = await pool.request()
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
   async function deleteAddresses(addresses) {
    try {
        let pool = await sql.connect(config);
        let res = await pool.request()
        .input('id', sql.Int, addresses.id)
        .query("DELETE FROM addresses WHERE id = " + addresses.id);
        console.log(" res :" + res);
        return res.recordsets;
    } catch (error) {
        console.log(" error :" + error);
    }
}
module.exports = {
    getAddresses: getAddresses,
    getAddressesByAddressesId: getAddressesByAddressesId,
    addAddresses: addAddresses,
    deleteAddresses: deleteAddresses,
};

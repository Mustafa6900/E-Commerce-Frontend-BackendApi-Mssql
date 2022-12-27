var config = require("../dbconfig");
const sql = require("mssql");
 
  async function getWallets() {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request().query("SELECT *  FROM wallets");
      console.log(" res :" + res);
      return res.recordsets;
    } catch (error) {
        console.log(" error :" + error);
    }
  }

  async function getWalletsById(user) { // kendisine ait cüzdanı getirir
    try {
        let pool = await sql.connect(config);
        let res = await pool.request()
            .input('input_parameter', sql.Int, user.user_id)
            .query("SELECT *  FROM wallets WHERE user_id = @input_parameter");
        console.log(" res :" + res);
        return res.recordsets;
    } catch (error) {
        console.log(" error :" + error);
    }
}  
   async function addWallets(wallets) { // yeni cüzdan ekler
    try {
        let pool = await sql.connect(config);
        let res = await pool.request().
        input('input_parameter1', sql.Int, wallets.user_id).
        input('input_parameter2', sql.NVarChar, wallets.card_name).
        input('input_parameter3', sql.NVarChar, wallets.card_number).
            query("INSERT INTO wallets (user_id, card_name, card_number) VALUES (@input_parameter1, @input_parameter2, @input_parameter3)");
        console.log(" res :" + res);
        return res.recordsets;
    } catch (error) {
        console.log(" error :" + error);
    }
}

   async function deleteWallets(wallets) { // cüzdan siler
    try {
        let pool = await sql.connect(config);
        let res = await pool.request()
            .input('input_parameter', sql.Int, wallets.id)
            .query("DELETE FROM wallets WHERE id = @input_parameter");
        console.log(" res :" + res);
        return res.recordsets;
    } catch (error) {
        console.log(" error :" + error);
    }
}


  

module.exports = {
    getWallets: getWallets,
    getWalletsById: getWalletsById,
    addWallets: addWallets,
    deleteWallets: deleteWallets
};

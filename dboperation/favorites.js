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

async function getfavoritesByfavoritesId(user_id) {
    try {
        let pool = await sql.connect(config);
        let res = await pool.request()
            .input('user_id', sql.Int, user_id.user_id)
            .query("SELECT *  FROM favorites f JOIN products p ON f.product_id = p.id WHERE user_id = @user_id");
        console.log(" res :" + res);
        return res.recordsets;
    } catch (error) {
        console.log(" error :" + error);
    }
}


  async function addfavorites(favorites) {
    try {
        let pool = await sql.connect(config);
        let res = await pool.request()
            .input('user_id', sql.Int, favorites.user_id)
            .input('product_id', sql.Int, favorites.product_id).
            query("INSERT INTO favorites (user_id, product_id ) VALUES (@user_id, @product_id)");
        console.log(" res :" + res);
        return res.recordsets;
    } catch (error) {
        console.log(" error :" + error);
    }
}

async function updatefavoritesItem(favorites) {
  try {
    let pool = await sql.connect(config);
    let res = await pool.request()
    .input('product_id', sql.Int, favorites.product_id)
    .input('quantity', sql.Int, favorites.quantity)
    .query("UPDATE favorites SET product_id = @product_id, quantity = @quantity WHERE id = " + favorites.id);
    console.log(" res :" + res);
    return res.recordsets;
    } catch (error) {
    console.log(" error :" + error);
    }
    }

async function deletefavoritesItem(favorites) {
    try {
        let pool = await sql.connect(config);
        let res = await pool.request()
            .input('user_id', sql.Int, favorites.user_id)
            .input('product_id', sql.Int, favorites.product_id)
            .query("DELETE FROM favorites WHERE user_id = @user_id AND product_id = @product_id");
        console.log(" res :" + res);
        return res.recordsets;
    } catch (error) {
        console.log(" error :" + error);
    }
}

  

module.exports = {
    getFavorites: getFavorites,
    getfavoritesByfavoritesId: getfavoritesByfavoritesId,
    addfavorites: addfavorites,
    updatefavoritesItem: updatefavoritesItem,
    deletefavoritesItem: deletefavoritesItem
};

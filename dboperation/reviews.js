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

  // belli ürüne yorum yapan kullanıcılar getirir 
  async function getReviewsById(product_id) {
    try {
        let pool = await sql.connect(config);
        let res = await pool.request()
            .input('input_parameter', sql.Int, product_id)
            .query("SELECT *  FROM reviews WHERE product_id = @input_parameter");
        console.log(" res :" + res);
        return res.recordsets;
    } catch (error) {
        console.log(" error :" + error);
    }
}   
   // belli yeni ürüne yorum yapmak isteyen kullanıcı

   async function addReview(product_id) {
    try {
    let pool = await sql.connect(config);
    let res = await pool.request()
    .input('product_id', sql.Int, product_id)
    .input('user_id', sql.Int, user_id)
    .input('review_text', sql.VarChar, review_text)
    .query('INSERT INTO reviews (product_id, user_id, review_text) VALUES (@product_id, @user_id, @review_text)');
    console.log(" res :" + res);
    return res.recordsets;
    } catch (error) {
    console.log(" error :" + error);
    }
    }

    // kullanıcının kendi yorumlarını görür

    async function getReviewsByUserId(user_id) {
      try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .input('input_parameter', sql.Int, user_id)
      .query("SELECT * FROM reviews WHERE user_id = @input_parameter");
      console.log(" res :" + res);
      return res.recordsets;
      } catch (error) {
      console.log(" error :" + error);
      }
      }
    // belli ürünün yorumunu silmek

    async function deleteReviewItem(product_id) {
      try {
      let pool = await sql.connect(config);
      let res = await pool.request()
      .query("DELETE FROM reviews WHERE product_id = " + product_id);
      console.log(" res :" + res);
      return res.recordsets;
      } catch (error) {
      console.log(" error :" + error);
      }
      }

module.exports = {
    getReviews: getReviews,
    getReviewsById: getReviewsById,
    addReview: addReview,
    getReviewsByUserId: getReviewsByUserId,
    deleteReviewItem: deleteReviewItem,

};

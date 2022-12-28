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
            .query("SELECT *  FROM reviews WHERE product_id = @input_parameter")
        console.log(" res :" + res);
        return res.recordsets;
    } catch (error) {
        console.log(" error :" + error);
    }
}   
   // belli yeni ürüne yorum yapmak isteyen kullanıcı

   async function addReview(reviews) {
    try {
    let pool = await sql.connect(config);
    let res = await pool.request()
    .input('user_id', sql.Int, reviews.user_id)
    .input('rating', sql.Int, reviews.rating)
    .input('product_id', sql.Int, reviews.product_id)
    .input('comment', sql.VarChar, reviews.comment)
    .query('INSERT INTO reviews (rating,product_id, user_id, comment) VALUES (@rating, @product_id, @user_id, @comment) UPDATE guest SET point = point + 5 WHERE guest.id = @user_id ')
    let res2 = await pool.request()
    .input('user_id', sql.Int, reviews.user_id)
    .query("UPDATE guest SET discount = discount + (CASE WHEN point + 5 > 50 THEN 1 ELSE 0 END), point = point - (CASE WHEN point + 5 > 50 THEN 50 ELSE 0 END) WHERE id = @user_id")
    console.log(" res :" + res);
    return res.recordsets, res2.recordsets;
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

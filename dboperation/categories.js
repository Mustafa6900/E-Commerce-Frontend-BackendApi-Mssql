var config = require("../dbconfig");
const sql = require("mssql");
 
  async function getCategories() {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request().query("SELECT *  FROM categories");
      console.log(" res :" + res);
      return res.recordsets;
    } catch (error) {
      console.log(" error :" + error);
    }
  }

  async function getCategoriesByCategoriesId(category_id) {
    try {
    let pool = await sql.connect(config);
    let res = await pool.request().query("SELECT * FROM products WHERE category_id = " + category_id);
    console.log(" res :" + res);
    return res.recordsets;
    } catch (error) {
    console.log(" error :" + error);
    }
    }

    async function getSubCategoriesById(parent_id) {
      try {
      let pool = await sql.connect(config);
      let res = await pool.request().query('SELECT p.* FROM products p WHERE p.category_id  = ' + parent_id);
      console.log(" res :" + res);
      return res.recordsets;
      } catch (error) {
      console.log(" error :" + error);
      }
      }

module.exports = {
    getCategories: getCategories,
    getCategoriesByCategoriesId: getCategoriesByCategoriesId,
    getSubCategoriesById: getSubCategoriesById,
};

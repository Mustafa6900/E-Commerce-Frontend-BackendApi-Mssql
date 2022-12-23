var config = require("../dbconfig");
const sql = require("mssql");
 
 //tüm kategorileri getir
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

  // ana kategorileri kategoriyi getir

  async function getCategoriesById() {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request().query("SELECT * FROM categories WHERE parent_id IS NULL");
      console.log(" res :" + res);
      return res.recordsets;
    } catch (error) {
      console.log(" error :" + error);
    }
  }

  // alt kategorileri kategoriyi getir

  async function getsubCategoriesById() {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request().query("SELECT * FROM categories WHERE parent_id IS NOT NULL");
      console.log(" res :" + res);
      return res.recordsets;
    } catch (error) {
      console.log(" error :" + error);
    }
  }


module.exports = {
    getCategories: getCategories,
    getCategoriesById: getCategoriesById,
    getsubCategoriesById: getsubCategoriesById,
};

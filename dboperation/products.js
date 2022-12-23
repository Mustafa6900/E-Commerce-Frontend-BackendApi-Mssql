var config = require("../dbconfig");
const sql = require("mssql");
 
  async function getProducts() {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request().query("SELECT *  FROM products");
      console.log(" res :" + res);
      return res.recordsets;
    } catch (error) {
      console.log(" error :" + error);
    }
  }
  
  // kategoriye göre ürünleri getir
  async function getProductByCategoriesId(category_id) {
    try {
    let pool = await sql.connect(config);
    let res = await pool.request().query("SELECT * FROM products WHERE category_id = " + category_id);
    console.log(" res :" + res);
    return res.recordsets;
    } catch (error) {
    console.log(" error :" + error);
    }
    }

  // alt kategoriye göre ürünleri getir

  async function getProductBySubCategoriesId(sub_category_id) {
    try {
    let pool = await sql.connect(config);
    let res = await pool.request().query("SELECT p.* FROM categories c INNER JOIN products p ON p.category_id = c.id WHERE parent_id IS NOT NULL AND c.id = " + sub_category_id);
    console.log(" res :" + res);
    return res.recordsets;
    } catch (error) {
    console.log(" error :" + error);
    }
    }

    // seçili ürünün detayını getir

    async function getProductById(product_id) {
        try {
        let pool = await sql.connect(config);
        let res = await pool.request().query("SELECT * FROM products WHERE id = " + product_id);
        console.log(" res :" + res);
        return res.recordsets;
        } catch (error) {
        console.log(" error :" + error);
        }
        }
  

module.exports = {
    getProducts: getProducts,
    getProductByCategoriesId: getProductByCategoriesId,
    getProductBySubCategoriesId: getProductBySubCategoriesId,
    getProductById: getProductById,

};

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
  async function getProductByCategoryName(name) {
    try {
    let pool = await sql.connect(config);
    let res = await pool.request().query("SELECT p.* FROM products p INNER JOIN categories c ON p.category_id = c.id WHERE c.name = '" + name + "'");
    console.log(" res :" + res);
    return res.recordsets;
    } catch (error) {
    console.log(" error :" + error);
    }
    }

  // alt kategoriye  ve barcode' a göre ürünleri getir

  async function getProductsByCategoryAndBarcode(category, barcode) {
    try {
    let pool = await sql.connect(config);

    let res = await pool.request()
    .input ('category', sql.VarChar, category)
    .input ('barcode', sql.VarChar, barcode)
    .query("SELECT * FROM categories c INNER JOIN products p ON p.category_id = c.id WHERE (c.name = @category OR p.barcode = @barcode) ");
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
    getProductByCategoryName: getProductByCategoryName,
    getProductsByCategoryAndBarcode: getProductsByCategoryAndBarcode,
    getProductById: getProductById,

};

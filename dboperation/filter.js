var config = require("../dbconfig");
const sql = require("mssql");
 

/*router.get('/productfilter', async (req, res) => {
    const category = req.query.category ? { category: req.query.category } : {};
    const searchKeyword = req.query.searchKeyword
      ? {
          name: {
            $regex: req.query.searchKeyword,
            $options: 'i',
          },
        }
      : {};
    const sortOrder = req.query.sortOrder
      ? req.query.sortOrder === 'lowest'
        ? { price: 1 }
        : { price: -1 }
      : { _id: -1 };
    const products = await sqlh.find({ ...category, ...searchKeyword }).sort(
      sortOrder
    );
    res.send(products);
  }); */

  async function getProductFilter(searchKeyword) {
    try {
    let pool = await sql.connect(config);
    let res = await pool.request()
    .input('searchKeywordname', sql.VarChar, searchKeyword.name)
    .input ('searchKeywordbarcode', sql.VarChar, searchKeyword.barcode)
    .query("SELECT * FROM products WHERE  name LIKE  '%' +@searchKeywordname + '%' OR barcode LIKE  '%' +@searchKeywordbarcode + '%' ");
    console.log(" res :" + res);
    return res.recordsets;
    } catch (error) {
    console.log(" error :" + error);
    }
    }
  async function getBranchesFilter(searchKeyword) {
    try {
    let pool = await sql.connect(config);
    let res = await pool.request()
    .input('searchKeywordcity', sql.VarChar, searchKeyword.city)
    .input('searchKeywordstreet', sql.VarChar, searchKeyword.street)
    .input('searchKeywordzipcode', sql.VarChar, searchKeyword.zipcode)
    .query("SELECT * FROM branches WHERE  city LIKE  '%' +@searchKeywordcity + '%' OR street LIKE  '%' +@searchKeywordstreet + '%' OR zipcode LIKE  '%' +@searchKeywordzipcode + '%'");
    console.log(" res :" + res);
    return res.recordsets;
    } catch (error) {
    console.log(" error :" + error);
    }
    }

module.exports = {
    getBranchesFilter: getBranchesFilter,
    getProductFilter: getProductFilter,
}



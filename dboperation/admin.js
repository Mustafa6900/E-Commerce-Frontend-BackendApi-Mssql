var config = require("../dbconfig");
const sql = require("mssql");
 
 async function getreturneditems() {
   try {
     let pool = await sql.connect(config);
     let res = await pool.request().query("SELECT order_items.product_id, SUM(order_items.is_returned) AS total_returned FROM orders JOIN order_items ON orders.id = order_items.order_id WHERE order_items.is_returned = 1 GROUP BY  order_items.product_id ORDER BY total_returned DESC");
     console.log(" res :" + res);
     return res.recordsets;
   } catch (error) {
       console.log(" error :" + error);
   }
 }
 async function updatediscountproduct(product){
      try{
            let pool = await sql.connect(config);
            let res = await pool.request()
            .input('id', sql.Int, product.id)
            .input('productdiscount', sql.Int, product.productdiscount)
            .query("UPDATE products SET price = price - (price * @productdiscount*0.01) WHERE id = @id")
            console.log(" res :" + res);
            return res.recordsets;
      }
        catch(error){
            console.log(" error :" + error);
        }
 }

 async function deletereview(review){
    try{
          let pool = await sql.connect(config);
          let res = await pool.request()
          .input('id', sql.Int, review.id)
          .query("DELETE FROM reviews WHERE id = @id")
          console.log(" res :" + res);
          return res.recordsets;
    }
      catch(error){
          console.log(" error :" + error);
      }
}

module.exports = {
    getreturneditems: getreturneditems,
    updatediscountproduct: updatediscountproduct,
    deletereview: deletereview
    
};

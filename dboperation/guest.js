var config = require("../dbconfig");
const sql = require("mssql");
 
  async function getguest() {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request().query("SELECT *  FROM guest");
      console.log(" res :" + res);
      return res.recordsets;
    } catch (error) {
        console.log(" error :" + error);
    }
}
  async function getguestbyid(id) {
    try {
        let pool = await sql.connect(config);
        let res = await pool.request().query("SELECT *  FROM guest WHERE id = " + id);
        console.log(" res :" + res);
        return res.recordsets;
    } catch (error) {
        console.log(" error :" + error);
    }
}
  async function guestlogin(email, password) {
    try {
        let pool = await sql.connect(config);
        let res = await pool.request()
            .input('email', sql.VarChar, email)
            .input('password', sql.VarChar, password)
            .query("SELECT *  FROM guest WHERE email = @email AND password = @password");
        console.log(" res :" + res);
        return res.recordsets;
    } catch (error) {
        console.log(" error :" + error);
    }
}
  async function addguest(guest) {
    try {
        let pool = await sql.connect(config);
        let res = await pool.request()
            .input("name", sql.VarChar, guest.name)
            .input("email", sql.VarChar, guest.email)
            .input("password", sql.VarChar,guest.password).
            query("INSERT INTO guest (name, email, password) VALUES (@name, @email, @password)");
        console.log(" res :" + res);
        return res.recordsets;
    } catch (error) {
        console.log(" error :" + error);
    }
}
  async function deleteguest(id) {
    try {
        let pool = await sql.connect(config);
        let res = await pool.request()
            .query("DELETE FROM guest WHERE id = " + id);
        console.log(" res :" + res);
        return res.recordsets;
    } catch (error) {
        console.log(" error :" + error);
    }
}
  async function updateGuest(id,guest) {
    try {
    let pool = await sql.connect(config);
    let res = await pool.request()
    .input('email', sql.VarChar, guest.email)
    .input('password', sql.VarChar, guest.password)
    .query("UPDATE guest SET email = @email, password = @password WHERE id = " + id);
    console.log(" res :" + res);
    return res.recordsets;
    } catch (error) {
    console.log(" error :" + error);
    }
}
    

module.exports = {
    getguest: getguest,
    getguestbyid: getguestbyid,
    guestlogin: guestlogin,
    addguest: addguest,
    updateGuest: updateGuest,
    deleteguest: deleteguest,
};

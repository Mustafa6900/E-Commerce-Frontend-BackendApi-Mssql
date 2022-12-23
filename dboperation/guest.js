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

   async function updateguestpassword(guest) {
    try {
        let pool = await sql.connect(config);
        let res = await pool.request()
            .input("password", sql.VarChar, guest.password).
            query("UPDATE guest SET password = @password WHERE id = " + guest.id);
        console.log(" res :" + res);
        return res.recordsets;
    } catch (error) {
        console.log(" error :" + error);
    }
}

   async function updateguestemail(guest) {
    try {
        let pool = await sql.connect(config);
        let res = await pool.request()
            .input("email", sql.VarChar, guest.email).
            query("UPDATE guest SET email = @email WHERE id = " + guest.id);
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




module.exports = {
    getguest: getguest,
    getguestbyid: getguestbyid,
    addguest: addguest,
    updateguestpassword: updateguestpassword,
    deleteguest: deleteguest,
    updateguestemail: updateguestemail
};

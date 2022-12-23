var config = require("../dbconfig");
const sql = require("mssql");
 
  async function getBranches() {
    try {
      let pool = await sql.connect(config);
      let res = await pool.request().query("SELECT *  FROM branches");
      console.log(" res :" + res);
      return res.recordsets;
    } catch (error) {
        console.log(" error :" + error);
    }
  }

  async function getBranchesByBranchesId(branchId) {
    try {
        let pool = await sql.connect(config);
        let res = await pool.request()
            .input('input_parameter', sql.Int, branchId)
            .query("SELECT *  FROM branches WHERE id = @input_parameter");
        console.log(" res :" + res);
        return res.recordsets;
    } catch (error) {
        console.log(" error :" + error);
    }
}

    async function getBranchesByBranchesName(name) {
        try {
            let pool = await sql.connect(config);
            let res = await pool.request()
                .input('input_parameter', sql.NVarChar, name)
                .query("SELECT *  FROM branches WHERE name = @input_parameter");
            console.log(" res :" + res);
            return res.recordsets;
        } catch (error) {
            console.log(" error :" + error);
        }
    }

    async function getBranchesByBranchesCity(branchcity) {
        try {
            let pool = await sql.connect(config);
            let res = await pool.request()
                .input('input_parameter', sql.NVarChar, branchcity)
                .query("SELECT *  FROM branches WHERE city = @input_parameter");
            console.log(" res :" + res);
            return res.recordsets;
        } catch (error) {
            console.log(" error :" + error);
        }
    }

    async function getBranchesByBranchesStreet(branchstreet) {
        try {
            let pool = await sql.connect(config);
            let res = await pool.request()
                .input('input_parameter', sql.NVarChar, branchstreet)
                .query("SELECT *  FROM branches WHERE street = @input_parameter");
            console.log(" res :" + res);
            return res.recordsets;
        } catch (error) {
            console.log(" error :" + error);
        }
    }

    async function getBranchesByBranchesZipcode(branchzipcode) {
        try {
            let pool = await sql.connect(config);
            let res = await pool.request()
                .input('input_parameter', sql.NVarChar, branchzipcode)
                .query("SELECT *  FROM branches WHERE zipcode = @input_parameter");
            console.log(" res :" + res);
            return res.recordsets;
        } catch (error) {
            console.log(" error :" + error);
        }
    }

module.exports = {
    getBranches: getBranches,
    getBranchesByBranchesId: getBranchesByBranchesId,
    getBranchesByBranchesName: getBranchesByBranchesName,
    getBranchesByBranchesCity: getBranchesByBranchesCity,
    getBranchesByBranchesStreet: getBranchesByBranchesStreet,
    getBranchesByBranchesZipcode: getBranchesByBranchesZipcode,
};

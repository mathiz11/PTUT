const dbConnection = require("./connexion");
const queries = require("../queries/particip_queries");

module.exports = class participDao {
  async read_where(id_res) {
    let con = await dbConnection();
    try {
      await con.query("START TRANSACTION");
      let qc = await con.query(queries.read_where, [id_res]);
      await con.query("COMMIT");
      return qc;
    } catch (ex) {
      console.log(ex);
      throw ex;
    } finally {
      await con.release();
      await con.destroy();
    }
  };
};

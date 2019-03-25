const dbConnection = require("./connexion");
const queries = require("../queries/res_queries");

module.exports = class resultDao {
  async read_Byidquest(id_quest) {
    let con = await dbConnection();
    try {
      await con.query("START TRANSACTION");
      let qc = await con.query(queries.read_byidquest, [id_quest]);
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

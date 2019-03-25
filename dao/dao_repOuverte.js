const dbConnection = require("./connexion");
const queries = require("../queries/repOuvertes_queries");

module.exports = class RepOuvertesDao {
  async read_where(id_question) {
    let con = await dbConnection();
    try {
      await con.query("START TRANSACTION");
      let qc = await con.query(queries.read_where, [id_question]);
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

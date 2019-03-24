const dbConnection = require("./connexion");
const queries = require("../queries/question_queries");

module.exports = class Quest_Dao {
  async read_where(id) {
    let con = await dbConnection();
    try {
      await con.query("START TRANSACTION");
      let quest = await con.query(queries.read_question, [id]);
      await con.query("COMMIT");
      return quest;
    } catch (ex) {
      console.log(ex);
      throw ex;
    } finally {
      await con.release();
      await con.destroy();
    }
  };
};

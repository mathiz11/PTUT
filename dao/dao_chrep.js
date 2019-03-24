const dbConnection = require("./connexion");
const queries = require("../queries/chrep_queries");

module.exports = class UserDao {
  async saveEntity(entity) {
    let con = await dbConnection();
    try {
      await con.query("START TRANSACTION");
      let savedUser = await con.query(
        queries.insert_chrep,
        [entity.id_chreponse, entity.id_reponseOuverte, entity.id_reponseQCM, entity.id_reponseQCU, entity.id_participant, entity.valeur, entity.contenuCom]
      );
      await con.query("COMMIT");
      entity.id_membre = savedUser.insertId;
      return entity;
    } catch (ex) {
      await con.query("ROLLBACK");
      console.log(ex);
      throw ex;
    } finally {
      await con.release();
      await con.destroy();
    }
  }


  async deleteEntity(id) {
    let con = await dbConnection();
    try {
      await con.query("START TRANSACTION");
      await con.query(queries.delete_chrep, [id]);
      await con.query("COMMIT");
      return true;
    } catch (ex) {
      await con.query("ROLLBACK");
      console.log(ex);
      throw ex;
    } finally {
      await con.release();
      await con.destroy();
    }
  }
};

const dbConnection = require("./connexion");
const queries = require("../queries/user_queries");

module.exports = class UserDao {
  async saveEntity(entity) {
    let con = await dbConnection();
    try {
      await con.query("START TRANSACTION");
      let savedUser = await con.query(
        queries.insert_user,
        [entity.id_membre, entity.nom, entity.mail, entity.mdp]
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

  async updateEntity(entity) {
    let con = await dbConnection();
    try {
      await con.query("START TRANSACTION");
      await con.query(queries.update_user, [
        entity.mail,
        entity.mdp,
        entity.id
      ]);
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

  async deleteEntity(id) {
    let con = await dbConnection();
    try {
      await con.query("START TRANSACTION");
      await con.query(queries.delete_user, [id]);
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

  async readEntities() {
    let con = await dbConnection();
    try {
      await con.query("START TRANSACTION");
      let user = await con.query(queries.read_user);
      await con.query("COMMIT");
      user = JSON.parse(JSON.stringify(user));
      return user;
    } catch (ex) {
      console.log(ex);
      throw ex;
    } finally {
      await con.release();
      await con.destroy();
    }
  };

  async read_where(mail, mdp) {
    let con = await dbConnection();
    try {
      await con.query("START TRANSACTION");
      let user = await con.query(queries.read_user_where, [mail, mdp]);
      await con.query("COMMIT");
      return user;
    } catch (ex) {
      console.log(ex);
      throw ex;
    } finally {
      await con.release();
      await con.destroy();
    }
  };
};

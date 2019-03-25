const dbConnection = require("./connexion");
const queries = require("../queries/quest_queries");

module.exports = class Quest_Dao {
  async saveEntity(idm, intitule, date_crea, date_modif, temps) {
    let con = await dbConnection();
    try {
      await con.query("START TRANSACTION");
      let savedQuest = await con.query(
        queries.insert_quest,
      [ idm, intitule, date_crea, date_modif, temps]
      );
      await con.query("COMMIT");
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
      await con.query(queries.update_quest, [
        entity.intitule_quest,
        entity.date_modif,
        entity.tps_attente,
        entity.id_questionnaire
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
      await con.query(queries.delete_quest, [id]);
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
      let quest = await con.query(queries.read_quest);
      await con.query("COMMIT");
      quest = JSON.parse(JSON.stringify(quest));
      return quest;
    } catch (ex) {
      console.log(ex);
      throw ex;
    } finally {
      await con.release();
      await con.destroy();
    }
  };

  async read_where(id_membre) {
    let con = await dbConnection();
    try {
      await con.query("START TRANSACTION");
      let quest = await con.query(queries.read_quest_where, [id_membre]);
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

async read_quest_where(id_questionnaire) {
  let con = await dbConnection();
  try {
    await con.query("START TRANSACTION");
    let quest = await con.query(queries.read_maquest, [id_questionnaire]);
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

async select_questions(id_questionnaire) {
  let con = await dbConnection();
  try {
    await con.query("START TRANSACTION");
    let quest = await con.query(queries.read_question, [id_questionnaire]);
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

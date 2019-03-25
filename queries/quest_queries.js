module.exports = {
    insert_quest: `INSERT INTO questionnaires(id_questionnaire, id_membre, intitule_quest, date_crea, date_modif, tps_attente) VALUES(default, ?, ?, ?, ?, ?)`,
    read_quest: `SELECT * FROM questionnaires`,
	  read_quest_where: `SELECT * FROM questionnaires WHERE id_membre=?`,
    read_monquest: `SELECT * FROM questionnaires WHERE id_questionnaire=?`,
    update_quest: `UPDATE questionnaires SET questionnaires.intitule_quest = ?, questionnaires.date_modif = ? WHERE questionnaires.id_questionnaire = ?`,
    delete_quest: `DELETE FROM questionnaires WHERE questionnaires.id_questionnaire = ?`,
    read_question: `SELECT * FROM questions WHERE questions.id_questionnaire = ?`
}

module.exports = {
    insert_quest: `INSERT INTO questionnaires(id_questionnaire, id_membre, intitule_quest, date_crea, date_modif, tps_attente) VALUES(?, ?, ?, ?, ?, ?)`,
    read_quest: `SELECT * FROM questionnaires`,
	  read_quest_where: `SELECT * FROM questionnaires WHERE id_membre=?`,
    update_quest: `UPDATE questionnaires SET questionnaires.intitule_quest = ?, questionnaires.date_modif = ?, questionnaires.tps_attente = ? WHERE questionnaires.id_questionnaire = ?`,
    delete_quest: `DELETE FROM questionnaires WHERE questionnaires.id_questionnaire = ?`
}

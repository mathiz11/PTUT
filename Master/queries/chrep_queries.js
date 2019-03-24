module.exports = {
    insert_chrep: `INSERT INTO choix_reponses(id_chreponse, id_reponseOuverte, id_reponseQCM, id_reponseQCU, id_participant, valeur, contenuCom) VALUES(?, ?, ?, ?, ?, ?, ?)`,
/*    read_user: `SELECT * FROM membres`,
	  read_user_where: `SELECT * FROM membres WHERE mail=? AND mdp=?`,
    read_user_pwd: `SELECT mdp FROM membres WHERE mail=?`,
    read_user_byid: `select * from membres where id =?`,
    update_user_mail: `UPDATE membres SET membres.mail = ? WHERE membres.id_membre = ?`,
    update_user_mdp: `UPDATE membres SET membres.mdp = ? WHERE membres.id_membre = ?`,*/
    delete_chrep: `DELETE FROM choix_reponses WHERE choix_reponses.id_chreponse = ?`
}

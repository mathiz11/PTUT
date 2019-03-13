module.exports = {
    insert_user: `INSERT INTO membres(id_membre, nom, mail, mdp) VALUES(?, ?, ?, ?)`,
    read_user: `SELECT * FROM membres`,
	read_user_where: `SELECT * FROM membres WHERE mail=? AND mdp=?`,
    update_user: `UPDATE membres SET membres.mail = ?, membres.mdp = ? WHERE membres.id_membre = ?`,
    delete_user: `DELETE FROM membres WHERE membres.id_membre = ?`
}
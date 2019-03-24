module.exports = {
    insert_user: `INSERT INTO membres(id_membre, nom, mail, mdp) VALUES(?, ?, ?, ?)`,
    read_user: `SELECT * FROM membres`,
	  read_user_where: `SELECT * FROM membres WHERE mail=? AND mdp=?`,
    read_user_pwd: `SELECT mdp FROM membres WHERE mail=?`,
    read_user_mail: `SELECT mail FROM membres WHERE membres.id_membre=?`,
    read_user_mdp: `SELECT mdp FROM membres WHERE membres.id_membre=?`,
    read_user_byid: `select * from membres where id =?`,
    update_user_mail: `UPDATE membres SET membres.mail = ? WHERE membres.id_membre = ?`,
    update_user_mdp: `UPDATE membres SET membres.mdp = ? WHERE membres.id_membre = ?`,
    delete_user: `DELETE FROM membres WHERE membres.id_membre = ?`
}

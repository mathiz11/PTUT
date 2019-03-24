const MREQUETE = require('../dao/dao_chrep');
const MREQUETE = new MREQUET();

class Message {
    static create (content, cb)
    {
        var entity = {
            id_chreponse: null , 
            id_reponseOuverte: 1 , 
            id_reponseQCM: 1 , 
            id_reponseQCU: 1 , 
            id_participant: 1 ,  
            contenuCom: content
        }
        const app = async () => {
            let results = await MREQUETE.saveEntity(entity)
        }
        app();
        cb(result)
    }

}


module.exports = Message
class Reponse {
	constructor(_typerep, _id, _question, _intitule, _validite){
		this.typerep = _typerep;
		this.validite = _validite;
		this.intitule = _intitule;
		//this.Rfiltres = new Array();
		_question.reponses = _id;
	}
};

class Question {
	constructor(_id, _questionnaire, _intituleQuest){
		this.id = _id;
		this.intituleQuest = _intituleQuest;
		this.reponses = new Array();
	//	this.Qfiltres = new Array();
		_questionnaire.questions = _id;
	}
};

class Questionnaire {

	constructor(_id, _nom){
		this.id = _id;
		this.nom = _nom;
		this.questions = new Array();
	}
};


const qtnr = new Questionnaire("q0", "questionaire 1");

idqtnr = qtnr.id;

var j = 0;

var i = 0;
function add_question(){
	document.getElementById("questionnaire").removeChild(document.getElementById("addquestion"));
	var block_question = document.createElement('div');
	block_question.id = 'question';
	block_question.setAttribute('id','question'+i);
	block_question.style.width ="100em";
	block_question.style.height="20em";
	block_question.style.backgroundColor = "rgb(100,100,150)";
	document.getElementById('questionnaire').appendChild(block_question);

	var boutonsup = document.createElement("input");
	boutonsup.setAttribute('id','supquestion'+i);
  boutonsup.value = 'Supprimer question';
  boutonsup.type = 'button';
//	boutonsup.onclick = sup_question;
	document.getElementById('question'+i).appendChild(boutonsup);

	var libel = document.createElement("input");
	libel.setAttribute('id','nomQuest'+i);
	libel.value = "c'est la question"+i;
	libel.name = 'intituleQuest';
	libel.type = 'text';
	document.getElementById('question'+i).appendChild(libel);

	var boutonadd = document.createElement("input");
  boutonadd.id ='addquestion';
  boutonadd.value = 'Ajouter une question';
  boutonadd.type = 'button';
	boutonadd.onclick = add_question;
  document.getElementById("questionnaire").appendChild(boutonadd);

	var addrep = document.createElement("input");
  addrep.id ='addreponse';
  addrep.value = 'Ajouter une reponse';
  addrep.type = 'button';
	addrep.addEventListener("click", function(){

			var libel = document.createElement("input");
			libel.setAttribute('id','Reponse'+j);
			libel.value = "reponse"+j;
			libel.name = 'intituleQuest';
			libel.type = 'text';
			document.getElementById(qtn.id).appendChild(libel);

			var valeurRep = document.createElement("input");
			valeurRep.setAttribute('id','validité'+j);
			valeurRep.value = "reponse"+j;
			valeurRep.name = 'intituleQuest';
			valeurRep.type = 'checkbox';
			document.getElementById(qtn.id).appendChild(valeurRep);

			var validiterep = document.createElement('div');
			validiterep.id = 'validite'+j;
			document.getElementById(qtn.id).appendChild(validiterep);

			var html = `
				<input type="radio" id="vrai">
				<label for="contactChoice1">vrai</label>

				<input type="radio" id="faux">
				<label for="contactChoice2">faux</label>
			`
			document.getElementById("validite"+j).innerHTML = html;

			var val = document.getElementById(qtn.id)

			if(val.checked == true){
					val = true;
				}	else{
					val = false;
				}

			var choixrep = document.createElement('div');
			choixrep.id = 'choix'+j;
			document.getElementById(qtn.id).appendChild(choixrep);

				html = `
				<input type="radio" id="QCM">
				<label for="contactChoice1">QCU</label>

				<input type="radio" id="QCU">
				<label for="contactChoice2">QCU</label>

				<input type="radio" id="QCO">
				<label for="contactChoice3">QCO</label>
			`
			document.getElementById("choix"+j).innerHTML = html;

			var QCM = document.getElementById("QCM")
			var QCU = document.getElementById("QCU")
			var QCO = document.getElementById("QCO")

		 	var typerep;
			if(QCM.checked == true){
					typerep = qcm;
			}	else if(QCU.checked == true){
						typerep = qcu;
				}	else if(QCO.checked == true){
						typerep = qco;
					}

			var idrep = "reponse"+j;

			const reponse = new Reponse(typerep,idrep,qtn,libel.value,val,);

			j++;
	});
  document.getElementById("question"+i).appendChild(addrep);

	qtn = new Question(block_question.id, qtnr, libel.value);

	i++;
}

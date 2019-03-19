-- phpMyAdmin SQL Dump
-- version 4.5.4.1
-- http://www.phpmyadmin.net
--
-- Client :  localhost
-- Généré le :  Mar 19 Mars 2019 à 20:14
-- Version du serveur :  5.7.11
-- Version de PHP :  5.6.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `askthem`
--

-- --------------------------------------------------------

--
-- Structure de la table `choix_reponses`
--

CREATE TABLE `choix_reponses` (
  `id_chreponse` int(11) NOT NULL,
  `id_reponseOuverte` int(11) DEFAULT NULL,
  `id_reponseQCM` int(11) DEFAULT NULL,
  `id_reponseQCU` int(11) DEFAULT NULL,
  `id_participant` int(11) NOT NULL,
  `valeur` tinyint(4) DEFAULT NULL,
  `contenuCom` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `filtres`
--

CREATE TABLE `filtres` (
  `id_filtre` int(11) NOT NULL,
  `nom` varchar(45) DEFAULT NULL,
  `code_filtre` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `membres`
--

CREATE TABLE `membres` (
  `id_membre` int(11) NOT NULL,
  `nom` varchar(45) DEFAULT NULL,
  `mail` varchar(254) DEFAULT NULL,
  `mdp` varchar(128) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `membres`
--

INSERT INTO `membres` (`id_membre`, `nom`, `mail`, `mdp`) VALUES
(1, 'oui', 'oui@ah.o', 'oui');

-- --------------------------------------------------------

--
-- Structure de la table `participants`
--

CREATE TABLE `participants` (
  `id_participant` int(11) NOT NULL,
  `adresseIP` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `participer`
--

CREATE TABLE `participer` (
  `id_participer` int(11) NOT NULL,
  `id_participant` int(11) NOT NULL,
  `id_resultat` int(11) NOT NULL,
  `jeton` varchar(45) DEFAULT NULL,
  `heure` time DEFAULT NULL,
  `date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `qcm`
--

CREATE TABLE `qcm` (
  `id_QCM` int(11) NOT NULL,
  `id_question` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `qco`
--

CREATE TABLE `qco` (
  `id_QCO` int(11) NOT NULL,
  `id_question` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `qcu`
--

CREATE TABLE `qcu` (
  `id_QCU` int(11) NOT NULL,
  `id_question` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `questionnaires`
--

CREATE TABLE `questionnaires` (
  `id_questionnaire` int(11) NOT NULL,
  `id_membre` int(11) NOT NULL,
  `intitule_quest` varchar(45) DEFAULT NULL,
  `date_crea` date DEFAULT NULL,
  `date_modif` date DEFAULT NULL,
  `tps_attente` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `questions`
--

CREATE TABLE `questions` (
  `id_question` int(11) NOT NULL,
  `id_questionnaire` int(11) NOT NULL,
  `id_filtre` int(11) DEFAULT NULL,
  `intitulé_question` varchar(45) DEFAULT NULL,
  `type_question` varchar(45) DEFAULT NULL,
  `duree_reponse` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `reponsesouvertes`
--

CREATE TABLE `reponsesouvertes` (
  `id_reponseOuv` int(11) NOT NULL,
  `id_QCO` int(11) NOT NULL,
  `id_filtre` int(11) DEFAULT NULL,
  `intitulé_rep` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `reponsesqcm`
--

CREATE TABLE `reponsesqcm` (
  `id_reponseQCM` int(11) NOT NULL,
  `id_QCM` int(11) NOT NULL,
  `id_filtre` int(11) DEFAULT NULL,
  `intitulé_rep` varchar(45) DEFAULT NULL,
  `validité` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `reponsesqcu`
--

CREATE TABLE `reponsesqcu` (
  `id_reponseQCU` int(11) NOT NULL,
  `id_QCU` int(11) NOT NULL,
  `id_filtre` int(11) DEFAULT NULL,
  `intitulé_rep` varchar(45) DEFAULT NULL,
  `validité` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `resultats`
--

CREATE TABLE `resultats` (
  `id_resultat` int(11) NOT NULL,
  `id_questionnaire` int(11) NOT NULL,
  `heure_passage` time DEFAULT NULL,
  `date_passage` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Index pour les tables exportées
--

--
-- Index pour la table `choix_reponses`
--
ALTER TABLE `choix_reponses`
  ADD PRIMARY KEY (`id_chreponse`),
  ADD KEY `fk_choix_reponses_etudiants1_idx` (`id_participant`),
  ADD KEY `fk_choix_reponses_reponsesOuvertes1_idx` (`id_reponseOuverte`),
  ADD KEY `fk_choix_reponses_reponsesQCM1_idx` (`id_reponseQCM`),
  ADD KEY `fk_choix_reponses_reponsesQCU1_idx` (`id_reponseQCU`);

--
-- Index pour la table `filtres`
--
ALTER TABLE `filtres`
  ADD PRIMARY KEY (`id_filtre`);

--
-- Index pour la table `membres`
--
ALTER TABLE `membres`
  ADD PRIMARY KEY (`id_membre`);

--
-- Index pour la table `participants`
--
ALTER TABLE `participants`
  ADD PRIMARY KEY (`id_participant`),
  ADD UNIQUE KEY `adresseIP_UNIQUE` (`adresseIP`);

--
-- Index pour la table `participer`
--
ALTER TABLE `participer`
  ADD PRIMARY KEY (`id_participer`),
  ADD KEY `fk_pseudos_etudiants1_idx` (`id_participant`),
  ADD KEY `fk_pseudos_sessions1_idx` (`id_resultat`);

--
-- Index pour la table `qcm`
--
ALTER TABLE `qcm`
  ADD PRIMARY KEY (`id_QCM`),
  ADD KEY `fk_QCM_questions1_idx` (`id_question`);

--
-- Index pour la table `qco`
--
ALTER TABLE `qco`
  ADD PRIMARY KEY (`id_QCO`),
  ADD KEY `fk_QCO_questions1_idx` (`id_question`);

--
-- Index pour la table `qcu`
--
ALTER TABLE `qcu`
  ADD PRIMARY KEY (`id_QCU`),
  ADD KEY `fk_QCU_questions1_idx` (`id_question`);

--
-- Index pour la table `questionnaires`
--
ALTER TABLE `questionnaires`
  ADD PRIMARY KEY (`id_questionnaire`),
  ADD KEY `fk_questionnaires_utilisateurs_idx` (`id_membre`);

--
-- Index pour la table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id_question`),
  ADD KEY `fk_questions_questionnaires1_idx` (`id_questionnaire`),
  ADD KEY `fk_questions_filtres1_idx` (`id_filtre`);

--
-- Index pour la table `reponsesouvertes`
--
ALTER TABLE `reponsesouvertes`
  ADD PRIMARY KEY (`id_reponseOuv`),
  ADD KEY `fk_reponses_filtres1_idx` (`id_filtre`),
  ADD KEY `fk_reponsesOuvertes_QCO1_idx` (`id_QCO`);

--
-- Index pour la table `reponsesqcm`
--
ALTER TABLE `reponsesqcm`
  ADD PRIMARY KEY (`id_reponseQCM`),
  ADD KEY `fk_reponses_filtres1_idx` (`id_filtre`),
  ADD KEY `fk_reponsesQCM_QCM1_idx` (`id_QCM`);

--
-- Index pour la table `reponsesqcu`
--
ALTER TABLE `reponsesqcu`
  ADD PRIMARY KEY (`id_reponseQCU`),
  ADD KEY `fk_reponses_filtres1_idx` (`id_filtre`),
  ADD KEY `fk_reponsesQCU_QCU1_idx` (`id_QCU`);

--
-- Index pour la table `resultats`
--
ALTER TABLE `resultats`
  ADD PRIMARY KEY (`id_resultat`),
  ADD KEY `fk_sessions_²1_idx` (`id_questionnaire`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `choix_reponses`
--
ALTER TABLE `choix_reponses`
  MODIFY `id_chreponse` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `filtres`
--
ALTER TABLE `filtres`
  MODIFY `id_filtre` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `membres`
--
ALTER TABLE `membres`
  MODIFY `id_membre` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT pour la table `participants`
--
ALTER TABLE `participants`
  MODIFY `id_participant` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `participer`
--
ALTER TABLE `participer`
  MODIFY `id_participer` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `qcm`
--
ALTER TABLE `qcm`
  MODIFY `id_QCM` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `qco`
--
ALTER TABLE `qco`
  MODIFY `id_QCO` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `qcu`
--
ALTER TABLE `qcu`
  MODIFY `id_QCU` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `questionnaires`
--
ALTER TABLE `questionnaires`
  MODIFY `id_questionnaire` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `questions`
--
ALTER TABLE `questions`
  MODIFY `id_question` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `reponsesouvertes`
--
ALTER TABLE `reponsesouvertes`
  MODIFY `id_reponseOuv` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `reponsesqcm`
--
ALTER TABLE `reponsesqcm`
  MODIFY `id_reponseQCM` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `reponsesqcu`
--
ALTER TABLE `reponsesqcu`
  MODIFY `id_reponseQCU` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `resultats`
--
ALTER TABLE `resultats`
  MODIFY `id_resultat` int(11) NOT NULL AUTO_INCREMENT;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `choix_reponses`
--
ALTER TABLE `choix_reponses`
  ADD CONSTRAINT `fk_choix_reponses_etudiants1` FOREIGN KEY (`id_participant`) REFERENCES `participants` (`id_participant`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_choix_reponses_reponsesOuvertes1` FOREIGN KEY (`id_reponseOuverte`) REFERENCES `reponsesouvertes` (`id_reponseOuv`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_choix_reponses_reponsesQCM1` FOREIGN KEY (`id_reponseQCM`) REFERENCES `reponsesqcm` (`id_reponseQCM`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_choix_reponses_reponsesQCU1` FOREIGN KEY (`id_reponseQCU`) REFERENCES `reponsesqcu` (`id_reponseQCU`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `participer`
--
ALTER TABLE `participer`
  ADD CONSTRAINT `fk_pseudos_etudiants1` FOREIGN KEY (`id_participant`) REFERENCES `participants` (`id_participant`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_pseudos_sessions1` FOREIGN KEY (`id_resultat`) REFERENCES `resultats` (`id_resultat`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `qcm`
--
ALTER TABLE `qcm`
  ADD CONSTRAINT `fk_QCM_questions1` FOREIGN KEY (`id_question`) REFERENCES `questions` (`id_question`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `qco`
--
ALTER TABLE `qco`
  ADD CONSTRAINT `fk_QCO_questions1` FOREIGN KEY (`id_question`) REFERENCES `questions` (`id_question`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `qcu`
--
ALTER TABLE `qcu`
  ADD CONSTRAINT `fk_QCU_questions1` FOREIGN KEY (`id_question`) REFERENCES `questions` (`id_question`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `questionnaires`
--
ALTER TABLE `questionnaires`
  ADD CONSTRAINT `fk_questionnaires_utilisateurs` FOREIGN KEY (`id_membre`) REFERENCES `membres` (`id_membre`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `fk_questions_filtres1` FOREIGN KEY (`id_filtre`) REFERENCES `filtres` (`id_filtre`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_questions_questionnaires1` FOREIGN KEY (`id_questionnaire`) REFERENCES `questionnaires` (`id_questionnaire`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `reponsesouvertes`
--
ALTER TABLE `reponsesouvertes`
  ADD CONSTRAINT `fk_reponsesOuvertes_QCO1` FOREIGN KEY (`id_QCO`) REFERENCES `qco` (`id_QCO`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_reponses_filtres1` FOREIGN KEY (`id_filtre`) REFERENCES `filtres` (`id_filtre`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `reponsesqcm`
--
ALTER TABLE `reponsesqcm`
  ADD CONSTRAINT `fk_reponsesQCM_QCM1` FOREIGN KEY (`id_QCM`) REFERENCES `qcm` (`id_QCM`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_reponses_filtres10` FOREIGN KEY (`id_filtre`) REFERENCES `filtres` (`id_filtre`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `reponsesqcu`
--
ALTER TABLE `reponsesqcu`
  ADD CONSTRAINT `fk_reponsesQCU_QCU1` FOREIGN KEY (`id_QCU`) REFERENCES `qcu` (`id_QCU`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_reponses_filtres100` FOREIGN KEY (`id_filtre`) REFERENCES `filtres` (`id_filtre`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `resultats`
--
ALTER TABLE `resultats`
  ADD CONSTRAINT `fk_sessions_²1` FOREIGN KEY (`id_questionnaire`) REFERENCES `questionnaires` (`id_questionnaire`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

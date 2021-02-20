--------------------------------------------------------------------------------
	Module d'affichage du graphique des mar�es pour un spot.

	v0      18/05/2019
	v0.1    19/05/2019 : Changement de la balise <div> vers la balise <img>.

	Auteurs :
		Code JavaScript :	http://meteo56.free.fr/horloge.php
		Infographie :		http://www.b-sept.com/
--------------------------------------------------------------------------------

Pr�paration des donn�es :
-----------------------
	1. Trouver la date et l'heure de la nouvelle lune la plus proche de la terre pendant l'ann�e sur
		http://www.fourmilab.ch/earthview/pacalc.html ou http://www.astrosurf.com/grandourse/phaselun.pdf
		=> 30/08/2019 10:38 TU
	2. Pour un spot donn�, prendre la date et l'heure de la mar�e haute suivante sur
		https://marine.meteoconsult.fr/meteo-marine/horaires-maree-lacanau-1051-4.php
		=> 30/08/2019 15:55 TU pour Lacanau

Int�gration :
-----------
	1. Copier le dossier tideGraph/ dans le m�me dossier que la page sur laquelle le graphique des mar�es doit appara�tre.
	2. Ajouter dans la page o� on veut voir le graphique des mar�es :
         <img id="tide_graph">
	3. Ajouter � la fin de la page :
		<script src="tideGraph/tideGraph.js"></script>
		<script>tideGraph("30/08/2019 15:55");</script>

Pour utiliser d'autres images :
-----------------------------
	. Changer les constantes TIDE_GRAPH_IMG_PATTERN et TIDE_GRAPH_IMG_EXT au d�but du script tideGraph.js.
	. Les images doivent �tre nomm�es : TIDE_GRAPH_IMG_PATTERN (ex. "tideGraph") + N� (ex. "1") + TIDE_GRAPH_IMG_EXT (ex. ".png") => (ex. tideGraph1.png)
		1. Fin montant
		2. Haute
		3. D�but descendant
		4. Fin descendant
		5. Basse
		6. D�but montant

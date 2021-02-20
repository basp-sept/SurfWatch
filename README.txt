--------------------------------------------------------------------------------
	Module d'affichage du graphique des marées pour un spot 'x'.

	v0      18/05/2019
	v0.1    19/05/2019 : Changement de la balise <div> vers la balise <img>.

	Auteurs :
		Code JavaScript :	http://meteo56.free.fr/horloge.php
		Infographie :		http://www.b-sept.com/
--------------------------------------------------------------------------------

Préparation des données :
-----------------------
	1. Trouver la date et l'heure de la nouvelle lune la plus proche de la terre pendant l'année sur
		http://www.fourmilab.ch/earthview/pacalc.html ou http://www.astrosurf.com/grandourse/phaselun.pdf
		=> 30/08/2019 10:38 TU
	2. Pour un spot donné, prendre la date et l'heure de la marée haute suivante sur
		https://marine.meteoconsult.fr/meteo-marine/horaires-maree-lacanau-1051-4.php
		=> 30/08/2019 15:55 TU pour Lacanau

Intégration :
-----------
	1. Copier le dossier tideGraph/ dans le même dossier que la page sur laquelle le graphique des marées doit apparaître.
	2. Ajouter dans la page où on veut voir le graphique des marées :
         <img id="tide_graph">
	3. Ajouter à la fin de la page :
		<script src="tideGraph/tideGraph.js"></script>
		<script>tideGraph("30/08/2019 15:55");</script>

Pour utiliser d'autres images :
-----------------------------
	. Changer les constantes TIDE_GRAPH_IMG_PATTERN et TIDE_GRAPH_IMG_EXT au début du script tideGraph.js.
	. Les images doivent être nommées : TIDE_GRAPH_IMG_PATTERN (ex. "tideGraph") + N° (ex. "1") + TIDE_GRAPH_IMG_EXT (ex. ".png") => (ex. tideGraph1.png)
		1. Fin montant
		2. Haute
		3. Début descendant
		4. Fin descendant
		5. Basse
		6. Début montant

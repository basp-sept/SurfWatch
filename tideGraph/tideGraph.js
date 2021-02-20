/*
	Graphique des marées pour un port, dont la marée haute de nouvelle lune est passée en paramètre.
*/

// Constantes.
const TIDE_GRAPH_IMG_PATH = 'tideGraph/';	// Chemin du dossier contenant les images, en relatif par rapport à la page appelante.
const TIDE_GRAPH_IMG_PATTERN = 'tideGraph';	// Nom des images.
const TIDE_GRAPH_IMG_EXT = '.png';			// Extension des images.

const TIDE_GRAPH_REFRESH = 15;	// Délai en minutes pour rafraîchir le graphique.

const DEBUG = true;	// Affiche le détail du calcul dans la console (F12).

// Fonctions.
// Retourne le timestamp d'une date en secondes vs millisecondes.
function getSeconds(date){
	return Math.trunc(date.getTime() / 1000);
}
// Retourne le timestamp d'une date au format jj-mm-aaaa hh:mn ou jj/mm/aaaa hh:mn.
function getTs(date){
	date = date.replace(/\//g, '-');	// Remplace "/" par "-", pour accepter les dates de type jj/mm/aaaa et jj-mm-aaaa.
//	dateTime = new Date(split[1] + '-' + split[0] + '-' + split[2]);	// Passe par le format mm/jj/aaaa hh:mn, pour en extraire le timestamp avec .getTime() => Ne fonctionne pas sous Safari !
	date = date.replace(/ /g, '-');
	date = date.replace(/:/g, '-');
	split = date.split('-');
	dateTime = new Date(parseInt(split[2]), parseInt(split[1]) - 1, parseInt(split[0]), parseInt(split[3]), parseInt(split[4]));	// Les mois démarrent à 0.

	return getSeconds(dateTime);
}

// Retourne le réglage en minutes de l'horloge à marée en fonction de la marée haute de nouvelle lune, par décompte du demi jour lunaire moyen.
function getTideClockSetting(newMoonHighTide) {
	if (DEBUG) {console.log('CALCUL DU JOUR LUNAIRE');}

	// Données
	HALF_LUNAR_DAY = 44714;	// 12:25:14 en secondes
	newMoonHighTideTs = getTs(newMoonHighTide);
	if (DEBUG) {console.log(newMoonHighTideTs + ' (timestamp UTC de la marée haute de prochaine nouvelle lune "' + newMoonHighTide + '", cf. http://timestamp.fr)');}
	now = new Date();
	nowTs = getSeconds(now);
	if (DEBUG) {console.log('- ' + nowTs + ' (timestamp UTC de l\'heure actuelle "' + now + '", cf. http://timestamp.fr)');}

	// Calcul
	diff = newMoonHighTideTs - nowTs;
	if (DEBUG) {
		console.log('= ' + diff + ' (secondes jusqu\'à la marée haute de prochaine nouvelle lune)');
		console.log('modulo ' + HALF_LUNAR_DAY + ' (secondes pour le demi jour lunaire moyen "12:25:14")');
	}
	add = diff % HALF_LUNAR_DAY;
	if (add < 0) {add += HALF_LUNAR_DAY;}	// Cas d'une pleine lune dans le passé.
	if (DEBUG) {console.log('= ' + add + ' (secondes jusqu\'à la prochaine marée haute)');}
	ratio = add / HALF_LUNAR_DAY;
	if (DEBUG) {console.log('=> ' + ratio.toFixed(2) + ' (ratio du demi jour lunaire avant la prochaine marée haute)');}
	minutes = (60 * (1 - ratio)).toFixed(0);
	if (DEBUG) {
		console.log('=>	' + minutes + ' (position de l\'aiguille en minutes)');
		console.log('FIN CALCUL');
	}
	return minutes;
}

// Affiche le graphique correspondant au réglage de l'horloge à marée.
function displayTideGraph(minutes) {
	// Actualisation du graphique.
	if (minutes < 5) {
		barGraphTitle = 'Marée haute';
		barGraphIndex = '2';
	} else {
		if (minutes < 15) {
			barGraphTitle = 'Début marée descendante';
			barGraphIndex = '3';
		} else {
			if (minutes < 25) {
				barGraphTitle = 'Fin marée descendante';
				barGraphIndex = '4';
			} else {
				if (minutes < 35) {
					barGraphTitle = 'Marée basse';
					barGraphIndex = '5';
				} else {
					if (minutes < 45) {
						barGraphTitle = 'Début marée montante';
						barGraphIndex = '6';
					} else {
						if (minutes < 55) {
							barGraphTitle = 'Fin marée montante';
							barGraphIndex = '1';
						} else {
							barGraphTitle = 'Marée haute';
							barGraphIndex = '2';
						}
					}
				}
			}
		}
	}
	document.getElementById('tide_graph').src = TIDE_GRAPH_IMG_PATH + TIDE_GRAPH_IMG_PATTERN + barGraphIndex + TIDE_GRAPH_IMG_EXT;
	document.getElementById('tide_graph').alt = 'Graphique des mar&eacute;es';
	document.getElementById('tide_graph').title = barGraphTitle;
}

// Initialise le graphique et démarre le timer.
function tideGraph(newMoonHighTide) {
	displayTideGraph(getTideClockSetting(newMoonHighTide));
	setTimeout(function(){tideGraph(newMoonHighTide)}, TIDE_GRAPH_REFRESH * 60000);	// setInterval en millisecondes.
}

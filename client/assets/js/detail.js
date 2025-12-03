import Club from './club.js';

const clubId = window.location.hash.substring(1);

console.log('ID du club à afficher:', clubId);

if (!clubId) {
    alert('Aucun club sélectionné');
    window.location.href = '/pages/liste.html';
}

const inputNom = document.querySelector('#nom');
const inputPays = document.querySelector('#pays');
const inputNiveau = document.querySelector('#niveau');
const inputStade = document.querySelector('#stade');
const inputAnneeCreation = document.querySelector('#anneeCreation');
const form = document.querySelector('#formModif');

let clubActuel = null;

fetch(`/clubs/${clubId}`)
    .then((res) => {
        if (!res.ok) {
            throw new Error(`Erreur HTTP : ${res.status}`);
        }
        return res.json();
    })
    .then((data) => {
        console.log('Données reçues:', data);
        
        clubActuel = Club.fromJSON(data);
        
        console.log('Instance créée:', clubActuel);
        clubActuel.afficher();

        inputNom.value = clubActuel.nom;
        inputPays.value = clubActuel.pays;
        inputNiveau.value = clubActuel.niveau;
        inputStade.value = clubActuel.stade;
        inputAnneeCreation.value = clubActuel.anneeCreation;
    })
    .catch((err) => {
        console.error('Erreur lors de la récupération:', err);
        alert('Erreur lors du chargement du club');
        window.location.href = '/pages/liste.html';
    });

form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!clubActuel) {
        alert('Club non chargé');
        return;
    }

    try {
        clubActuel.nom = inputNom.value;
        clubActuel.pays = inputPays.value;
        clubActuel.niveau = inputNiveau.value;
        clubActuel.stade = inputStade.value;
        clubActuel.anneeCreation = inputAnneeCreation.value;

        clubActuel.valider();

        console.log('Club modifié:', clubActuel);
        clubActuel.afficher();

        fetch(`/clubs/${clubId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clubActuel.toJSON())
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Erreur HTTP : ${res.status}`);
            }
            return res.json();
        })
        .then((response) => {
            console.log('Réponse serveur:', response);
            alert('Club modifié avec succès !');
            window.location.href = '/pages/liste.html';
        })
        .catch((err) => {
            console.error('Erreur lors de la modification:', err);
            alert('Erreur lors de la modification du club');
        });

    } catch (error) {
        console.error('Erreur de validation:', error);
        alert(`${error.message}`);
    }
});

import Club from './club.js';

const form = document.querySelector('#formAjout');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const nom = document.querySelector('#nom').value;
    const pays = document.querySelector('#pays').value;
    const niveau = document.querySelector('#niveau').value;
    const stade = document.querySelector('#stade').value;
    const anneeCreation = document.querySelector('#anneeCreation').value;

    try {
        const nouveauClub = new Club();
        
        nouveauClub.nom = nom;
        nouveauClub.pays = pays;
        nouveauClub.niveau = niveau;
        nouveauClub.stade = stade;
        nouveauClub.anneeCreation = anneeCreation;

        nouveauClub.valider();

        console.log('Club à envoyer:', nouveauClub);
        nouveauClub.afficher();

        fetch('/clubs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nouveauClub.toJSON())
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Erreur HTTP : ${res.status}`);
            }
            return res.json();
        })
        .then((response) => {
            console.log('Club ajouté:', response);
            alert('Club ajouté avec succès !');
            
            window.location.href = '/pages/liste.html';
        })
        .catch((err) => {
            console.error('Erreur lors de l\'ajout:', err);
            alert('Erreur lors de l\'ajout du club');
        });

    } catch (error) {
        console.error('Erreur de validation:', error);
        alert(`${error.message}`);
    }
});

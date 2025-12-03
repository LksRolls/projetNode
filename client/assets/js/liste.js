import Club from './club.js';

let myHeaders = new Headers();
let url = '/clubs';
let options = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default'
};

let containerListe = document.querySelector('#club');

fetch(url, options)
    .then((res) => {
        if (!res.ok) {
            throw new Error(`Erreur HTTP : ${res.status}`);
        }
        return res.json();
    })
    .then((response) => {
        console.log('Clubs reçus:', response);

        if (response.length === 0) {
            containerListe.innerHTML = '<p class="alert alert-info">Aucun club trouvé.</p>';
            return;
        }

        const clubs = response.map(obj => Club.fromJSON(obj));
        
        console.log('Instances de Club créées:', clubs);

        clubs.forEach(club => {
            let colDiv = document.createElement('div');
            colDiv.className = 'col-md-4 mb-4';

            let cardDiv = document.createElement('div');
            cardDiv.className = 'card h-100';

            let cardBody = document.createElement('div');
            cardBody.className = 'card-body';

            let cardTitle = document.createElement('h5');
            cardTitle.className = 'card-title';
            cardTitle.innerText = club.nom;

            let cardText = document.createElement('p');
            cardText.className = 'card-text';
            cardText.innerHTML = `
                <strong>Pays:</strong> ${club.pays}<br>
                <strong>Niveau:</strong> ${club.niveau}<br>
            `;

            let cardFooter = document.createElement('div');
            cardFooter.className = 'card-footer d-flex justify-content-between';

            let btnDetail = document.createElement('a');
            btnDetail.href = `detail.html#${club.id}`;
            btnDetail.className = 'btn btn-primary btn-sm';
            btnDetail.innerText = 'Voir détails';

            let btnDelete = document.createElement('button');
            btnDelete.className = 'btn btn-danger btn-sm';
            btnDelete.innerText = 'Supprimer';
            btnDelete.addEventListener('click', () => {
                supprimerClub(club.id);
            });

            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardText);
            
            cardFooter.appendChild(btnDetail);
            cardFooter.appendChild(btnDelete);

            cardDiv.appendChild(cardBody);
            cardDiv.appendChild(cardFooter);

            colDiv.appendChild(cardDiv);

            containerListe.appendChild(colDiv);
        });
    })
    .catch((err) => {
        console.error('Erreur lors de la récupération des clubs:', err);
        containerListe.innerHTML = '<p class="alert alert-danger">Erreur lors du chargement des clubs.</p>';
    });

function supprimerClub(clubId) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce club ?')) {
        return;
    }

    fetch(`/clubs/${clubId}`, {
        method: 'DELETE',
        headers: new Headers(),
        mode: 'cors'
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`Erreur HTTP : ${res.status}`);
        }
        return res.json();
    })
    .then(() => {
        alert('Club supprimé avec succès');
        window.location.reload();
    })
    .catch(err => {
        console.error('Erreur lors de la suppression:', err);
        alert('Erreur lors de la suppression du club');
    });
}

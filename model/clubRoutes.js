const express = require('express');
const router = express.Router();
const Club = require('./club');

router.get('/', (req, res) => {
    Club.find({})
        .then((clubs) => {
            res.json(clubs);
        })
        .catch((err) => {
            console.error('Erreur lors de la recup', err);
            res.status(500).json({ error: 'Erreur' });
        });
});

router.delete('/:id', (req, res) => {
    const clubId = req.params.id;
    
    console.log('Tentative de suppression du club :', clubId);

    Club.deleteOne({ _id: clubId })
        .then((result) => {
            if (result.deletedCount === 0) {
                return res.status(404).json({ error: 'Club non trouver' });
            }
            
            console.log('Club supprimé');
            res.json({ 
                message: 'Club supprimé',
                deletedCount: result.deletedCount 
            });
        })
        .catch((err) => {
            console.error('Erreur lors de la suppression:', err);
            res.status(500).json({ error: 'Erreur lors de la suppression' });
        });
});

router.post('/', (req, res) => {
    console.log('Données reçues:', req.body);

    const nouveauClub = new Club({
        nom: req.body.nom,
        pays: req.body.pays,
        niveau: req.body.niveau,
        stade: req.body.stade,
        anneeCreation: req.body.anneeCreation
    });

    nouveauClub.save()
        .then((clubSauvegarde) => {
            console.log('Club créé:', clubSauvegarde);
            res.status(201).json(clubSauvegarde);
        })
        .catch((err) => {
            console.error('Erreur lors de la création:', err);
            res.status(500).json({ error: 'Erreur lors de la création' });
        });
});

// ===== ROUTE GET : Récupérer UN club par son ID =====
// URL complète : GET /clubs/:id
router.get('/:id', (req, res) => {
    // Récupération de l'ID depuis les paramètres de l'URL
    const clubId = req.params.id;
    
    console.log('Recherche du club:', clubId);

    // ===== RECHERCHE DU CLUB PAR SON ID =====
    // Selon le cours (document 3, page "Mongoose: GET élément unique")
    Club.findOne({ _id: clubId })
        .then((club) => {
            // Vérification si le club existe
            if (!club) {
                return res.status(404).json({ error: 'Club non trouvé' });
            }
            
            // Club trouvé : on l'envoie au client
            console.log('Club trouvé:', club);
            res.json(club);
        })
        .catch((err) => {
            console.error('Erreur lors de la recherche:', err);
            res.status(500).json({ error: 'Erreur lors de la recherche du club' });
        });
});

router.put('/:id', (req, res) => {
    const clubId = req.params.id;
    const nouvellesDonnees = req.body;
    
    console.log('Modification du club:', clubId);
    console.log('Nouvelles données:', nouvellesDonnees);

    Club.findOneAndUpdate(
        { _id: clubId },
        nouvellesDonnees,
        { 
            new: true,
            runValidators: true
        }
    )
    .then((clubModifie) => {
        if (!clubModifie) {
            return res.status(404).json({ error: 'Club non trouvé' });
        }
        
        console.log('Club modifié:', clubModifie);
        res.json(clubModifie);
    })
    .catch((err) => {
        console.error('Erreur lors de la modification:', err);
        res.status(500).json({ error: 'Erreur lors de la modification' });
    });
});

module.exports = router;

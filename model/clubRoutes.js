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

module.exports = router;

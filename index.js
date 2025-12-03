const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

app.use(express.static('client'));

const url = 'mongodb+srv://lukasrolland57_db_user:lyRYNrdVU1iC3d8D@listecourse.w8sz04d.mongodb.net/?appName=listeCourse';

const clubRoutes = require('./model/clubRoutes');
app.use('/clubs', clubRoutes);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/index.html');
});

mongoose.connect(url)
    .then(() => {
        console.log('DB connectée');
        app.listen(3000, () => {
            console.log('Serveur démarré');
        });
    })
    .catch(err => {
        console.error('Erreur de connexion MongoDB:', err);
    });
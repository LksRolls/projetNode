const express = require('express');
const app = express(); 

app.use(express.json()); 
app.use(express.static('public')); 

const mongoose = require('mongoose');
const listesRoutes = require('./routes/listes'); 

const url = 'mongodb+srv://lukasrolland57_db_user:lyRYNrdVU1iC3d8D@listecourse.w8sz04d.mongodb.net/?appName=listeCourse';

mongoose.connect(url)
    .then(() => {
        console.log('DB connecté');
        app.listen(3000, () => {
            console.log('Listening on port 3000!');
        });
    })
    .catch(err => {
        console.error('Erreur de connexion à MongoDB:', err);
    });
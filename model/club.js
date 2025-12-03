const mongoose = require('mongoose');

var clubSchema = mongoose.Schema({
    nom: String,           
    pays: String,         
    niveau: String,       
    stade: String,         
    anneeCreation: Number  
});

var Club = mongoose.model('Club', clubSchema);

module.exports = Club;
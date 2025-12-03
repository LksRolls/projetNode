class Club {
    constructor(nom = '', pays = '', niveau = '', stade = '', anneeCreation = null, id = null) {
        this._id = id;
        this._nom = nom;
        this._pays = pays;
        this._niveau = niveau;
        this._stade = stade;
        this._anneeCreation = anneeCreation;
    }

    get id() {
        return this._id;
    }

    get nom() {
        return this._nom;
    }

    get pays() {
        return this._pays;
    }

    get niveau() {
        return this._niveau;
    }

    get stade() {
        return this._stade;
    }

    get anneeCreation() {
        return this._anneeCreation;
    }

    set id(value) {
        this._id = value;
    }

    set nom(value) {
        if (!value || value.trim() === '') {
            throw new Error('Le nom du club ne peut pas être vide');
        }
        this._nom = value.trim();
    }

    set pays(value) {
        if (!value || value.trim() === '') {
            throw new Error('Le pays ne peut pas être vide');
        }
        this._pays = value.trim();
    }

    set niveau(value) {
        if (!value || value.trim() === '') {
            throw new Error('Le niveau ne peut pas être vide');
        }
        this._niveau = value.trim();
    }

    set stade(value) {
        if (!value || value.trim() === '') {
            throw new Error('Le stade ne peut pas être vide');
        }
        this._stade = value.trim();
    }

    set anneeCreation(value) {
        const annee = Number(value);
        const anneeActuelle = new Date().getFullYear();
        
        if (isNaN(annee)) {
            throw new Error('L\'année de création doit être un nombre');
        }
        
        if (annee < 1800 || annee > anneeActuelle) {
            throw new Error(`L'année doit être entre 1800 et ${anneeActuelle}`);
        }
        
        this._anneeCreation = annee;
    }

    toJSON() {
        const obj = {
            nom: this._nom,
            pays: this._pays,
            niveau: this._niveau,
            stade: this._stade,
            anneeCreation: this._anneeCreation
        };
        
        if (this._id) {
            obj._id = this._id;
        }
        
        return obj;
    }

    static fromJSON(obj) {
        return new Club(
            obj.nom,
            obj.pays,
            obj.niveau,
            obj.stade,
            obj.anneeCreation,
            obj._id
        );
    }

    valider() {
        if (!this._nom || this._nom.trim() === '') {
            throw new Error('Le nom du club est obligatoire');
        }
        
        if (!this._pays || this._pays.trim() === '') {
            throw new Error('Le pays est obligatoire');
        }
        
        if (!this._niveau || this._niveau.trim() === '') {
            throw new Error('Le niveau est obligatoire');
        }
        
        if (!this._stade || this._stade.trim() === '') {
            throw new Error('Le stade est obligatoire');
        }
        
        if (!this._anneeCreation || isNaN(this._anneeCreation)) {
            throw new Error('L\'année de création est obligatoire');
        }
        
        return true;
    }

    afficher() {
        console.log(`Club: ${this._nom}`);
        console.log(`Pays: ${this._pays}`);
        console.log(`Niveau: ${this._niveau}`);
        console.log(`Stade: ${this._stade}`);
        console.log(`Année: ${this._anneeCreation}`);
    }
}

export default Club;

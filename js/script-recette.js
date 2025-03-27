document.addEventListener('DOMContentLoaded', () => {
    // Sélectionner les éléments nécessaires
    const coeurRouge = document.querySelector('.coeur.rouge');
    const coeurVide = document.querySelector('.coeur.vide');
    const boutonAjoutFavoris = document.querySelector('.ajout-fav');

    // Récupérer la classe de l'article
    const classeRecette = 'article-ratatouille-provencale';

    // Fonction pour vérifier si la recette est déjà dans les favoris
    function estDansFavoris() {
        const favoris = JSON.parse(localStorage.getItem('favoris')) || [];
        return favoris.includes(classeRecette);
    }

    // Fonction pour mettre à jour l'affichage des cœurs
    function mettreAJourAffichageFavoris(estFavori) {
        if (estFavori) {
            coeurRouge.classList.add('show');
            coeurVide.classList.remove('show');
        } else {
            coeurRouge.classList.remove('show');
            coeurVide.classList.add('show');
        }
    }

    // Fonction pour ajouter/retirer des favoris
    function toggleFavoris() {
        // Récupérer les favoris actuels
        let favoris = JSON.parse(localStorage.getItem('favoris')) || [];

        // Vérifier si la recette est déjà dans les favoris
        const indexRecette = favoris.indexOf(classeRecette);

        if (indexRecette === -1) {
            // Ajouter aux favoris
            favoris.push(classeRecette);
            mettreAJourAffichageFavoris(true);
        } else {
            // Retirer des favoris
            favoris.splice(indexRecette, 1);
            mettreAJourAffichageFavoris(false);
        }

        // Sauvegarder dans le localStorage
        localStorage.setItem('favoris', JSON.stringify(favoris));
    }

    // Initialiser l'état des cœurs au chargement
    mettreAJourAffichageFavoris(estDansFavoris());

    // Ajouter des écouteurs d'événements
    coeurRouge.addEventListener('click', toggleFavoris);
    coeurVide.addEventListener('click', toggleFavoris);
    boutonAjoutFavoris.addEventListener('click', toggleFavoris);
});
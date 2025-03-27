// Récupérer les favoris du localStorage
let favoris = JSON.parse(localStorage.getItem('favoris')) || [];

// Sélectionner tous les articles de recettes
const recettes = document.querySelectorAll('article');

// Fonction pour mettre à jour les favoris dans le localStorage
function updateFavorites() {
    localStorage.setItem('favoris', JSON.stringify(favoris));
}

// Initialiser l'affichage des favoris
recettes.forEach(recette => {
    // Extraire la classe spécifique de l'article (ex: article-tarte-aux-pomme)
    const recetteClass = Array.from(recette.classList)
        .find(cls => cls.startsWith('article-'));

    // Vérifier si la recette est dans les favoris
    if (favoris.includes(recetteClass)) {
        // Ajouter la classe show-fav si la recette est dans les favoris
        recette.classList.add('show-fav');
    } else {
        // Retirer la classe show-fav si la recette n'est pas dans les favoris
        recette.classList.remove('show-fav');
    }

    // Sélectionner le bouton de suppression pour chaque recette
    const supp = recette.querySelector('.supp');
    supp.addEventListener('click', function() {
        // Retirer la classe show-fav de l'article
        recette.classList.remove('show-fav');

        // Retirer la recette des favoris dans le localStorage
        const recetteClass = Array.from(recette.classList)
            .find(cls => cls.startsWith('article-'));

        // Filtrer le tableau des favoris pour supprimer la recette
        favoris = favoris.filter(fav => fav !== recetteClass);

        // Mettre à jour le localStorage
        updateFavorites();
    });
});
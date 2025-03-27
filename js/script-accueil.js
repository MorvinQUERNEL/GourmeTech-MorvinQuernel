document.addEventListener('DOMContentLoaded', () => {
    // Sélectionner tous les articles de recettes et les cases à cocher
    const recettes = document.querySelectorAll('#section-liste-de-recettes article');
    const checkboxesCategoriesPlat = document.querySelectorAll('.type-recherche article:first-child input[type="checkbox"]');
    const checkboxesTempsCuisson = document.querySelectorAll('.type-recherche article:nth-child(2) input[type="checkbox"]');
    const checkboxesDifficulte = document.querySelectorAll('.type-recherche article:last-child input[type="checkbox"]');

    // Fonction pour vérifier si une recette correspond aux filtres
    function correspondAuxFiltres(recette) {
        // Récupérer les informations de la recette
        const typePlat = recette.querySelector('.type-plat').textContent.trim();
        const tempsCuisson = recette.querySelector('.type-temps').textContent.trim();
        const difficulte = recette.querySelector('.type-dificulte').textContent.trim();

        // Vérifier les filtres de catégorie de plat
        const filtreCategorie = [...checkboxesCategoriesPlat]
            .some(checkbox => checkbox.checked && typePlat.toLowerCase() === checkbox.nextElementSibling.textContent.toLowerCase());

        // Vérifier les filtres de temps de cuisson
        const filtreTempsCuisson = [...checkboxesTempsCuisson]
            .some(checkbox => {
                const tempsLabel = checkbox.nextElementSibling.textContent.toLowerCase();
                const temps = parseInt(tempsCuisson);

                if (tempsLabel.includes('rapide')) return temps >= 5 && temps <= 35;
                if (tempsLabel.includes('moyen')) return temps > 35 && temps <= 55;
                if (tempsLabel.includes('long')) return temps > 55;
                return false;
            });

        // Vérifier les filtres de difficulté
        const filtreDifficulte = [...checkboxesDifficulte]
            .some(checkbox => checkbox.checked && difficulte.toLowerCase() === checkbox.nextElementSibling.textContent.toLowerCase());

        // Si aucun filtre n'est coché, tout afficher
        const aucunFiltreCoche =
            ![...checkboxesCategoriesPlat, ...checkboxesTempsCuisson, ...checkboxesDifficulte].some(cb => cb.checked);

        // Logique de filtrage
        if (aucunFiltreCoche) return true;

        // Filtre par catégorie ET temps ET difficulté
        if (checkboxesCategoriesPlat[0].checked || checkboxesTempsCuisson[0].checked || checkboxesDifficulte[0].checked) {
            return (
                (!checkboxesCategoriesPlat[0].checked || filtreCategorie) &&
                (!checkboxesTempsCuisson[0].checked || filtreTempsCuisson) &&
                (!checkboxesDifficulte[0].checked || filtreDifficulte)
            );
        }

        return false;
    }

    // Fonction pour appliquer les filtres
    function appliquerFiltres() {
        recettes.forEach(recette => {
            if (correspondAuxFiltres(recette)) {
                recette.style.display = 'block';
            } else {
                recette.style.display = 'none';
            }
        });
    }

    // Ajouter des écouteurs d'événements sur toutes les checkboxes
    [...checkboxesCategoriesPlat, ...checkboxesTempsCuisson, ...checkboxesDifficulte].forEach(checkbox => {
        checkbox.addEventListener('change', appliquerFiltres);
    });
});

const coeurs = document.querySelectorAll('.contenaire-img');

// Fonction pour mettre à jour l'état des cœurs au chargement
function mettreAJourFavoris() {
    // Récupérer les favoris actuels du localStorage
    let favoris = JSON.parse(localStorage.getItem('favoris')) || [];

    for (const coeur of coeurs) {
        const coeurRouge = coeur.querySelector('.coeur.rouge');
        const coeurVide = coeur.querySelector('.coeur.vide');
        const recette = coeur.closest('article');
        const recetteId = recette.id; // Utilisez l'ID unique de l'article

        // Vérifier si la recette est dans les favoris
        if (favoris.includes(recetteId)) {
            // Afficher le cœur rouge, masquer le cœur vide
            coeurRouge.classList.add('show');
            coeurVide.classList.remove('show');
        } else {
            // Afficher le cœur vide, masquer le cœur rouge
            coeurRouge.classList.remove('show');
            coeurVide.classList.add('show');
        }
    }
}

// Ajouter un écouteur d'événements pour chaque cœur
for (const coeur of coeurs) {
    const coeurRouge = coeur.querySelector('.coeur.rouge');
    const coeurVide = coeur.querySelector('.coeur.vide');
    const recette = coeur.closest('article');
    const recetteId = recette.id; // Utilisez l'ID unique de l'article

    coeur.addEventListener('click', () => {
        coeurRouge.classList.toggle('show');
        coeurVide.classList.toggle('show');

        // Récupérer les favoris actuels du localStorage
        let favoris = JSON.parse(localStorage.getItem('favoris')) || [];

        if (coeurRouge.classList.contains('show')) {
            // Ajouter la recette aux favoris
            if (!favoris.includes(recetteId)) {
                favoris.push(recetteId);
                localStorage.setItem('favoris', JSON.stringify(favoris));
            }
        } else {
            // Retirer la recette des favoris
            favoris = favoris.filter(id => id !== recetteId);
            localStorage.setItem('favoris', JSON.stringify(favoris));
        }
    });
}

// Appeler la fonction de mise à jour au chargement de la page
document.addEventListener('DOMContentLoaded', mettreAJourFavoris);
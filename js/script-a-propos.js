// Fonction de validation du formulaire
function validateForm() {
    // Récupérer les éléments du formulaire
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const checkboxInput = document.getElementById('check');

    // Réinitialiser les messages d'erreur précédents
    clearPreviousErrors();

    // Indicateur de validation
    let isValid = true;

    // Validation du nom
    if (nameInput.value.trim() === '') {
        displayError(nameInput, 'Veuillez saisir votre nom');
        isValid = false;
    } else if (nameInput.value.trim().length < 2) {
        displayError(nameInput, 'Le nom doit contenir au moins 2 caractères');
        isValid = false;
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value.trim() === '') {
        displayError(emailInput, 'Veuillez saisir votre email');
        isValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
        displayError(emailInput, 'Veuillez saisir un email valide');
        isValid = false;
    }

    // Validation du message
    if (messageInput.value.trim() === '') {
        displayError(messageInput, 'Veuillez saisir un message');
        isValid = false;
    } else if (messageInput.value.trim().length < 10) {
        displayError(messageInput, 'Le message doit contenir au moins 10 caractères');
        isValid = false;
    }

    // Validation de la case à cocher RGPD
    if (!checkboxInput.checked) {
        displayError(checkboxInput, 'Vous devez accepter les conditions RGPD');
        isValid = false;
    }

    // Empêcher l'envoi du formulaire si la validation échoue
    return isValid;
}

// Fonction pour afficher les messages d'erreur
function displayError(inputElement, errorMessage) {
    // Créer un élément de message d'erreur
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.style.color = 'red';
    errorElement.style.fontSize = '0.8em';
    errorElement.textContent = errorMessage;

    // Ajouter le message d'erreur après l'élément de formulaire
    inputElement.parentNode.insertBefore(errorElement, inputElement.nextSibling);

    // Mettre en évidence l'élément avec bordure rouge
    inputElement.style.border = '1px solid red';
}

// Fonction pour effacer les messages d'erreur précédents
function clearPreviousErrors() {
    // Supprimer tous les messages d'erreur existants
    const previousErrors = document.querySelectorAll('.error-message');
    previousErrors.forEach(error => error.remove());

    // Réinitialiser les styles des champs de formulaire
    const formInputs = document.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.style.border = '';
    });
}

// Ajouter un écouteur d'événements au chargement du document
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('form[name="contactForm"]');

    // Ajouter un écouteur d'événements de soumission
    contactForm.addEventListener('submit', function(event) {
        // Empêcher la soumission automatique du formulaire
        event.preventDefault();

        // Appeler la fonction de validation
        if (validateForm()) {
            // Si la validation réussit, vous pouvez ajouter ici le code pour envoyer le formulaire
            alert('Formulaire soumis avec succès !');
            // Réinitialiser le formulaire
            this.reset();
        }
    });
});
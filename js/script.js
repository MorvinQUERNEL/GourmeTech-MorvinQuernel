
// Changement de thème (clair/sombre)
const mode = document.querySelector('.mode');
const modeJour = document.querySelector('.mode-jour');
const modeNuit = document.querySelector('.mode-nuit');
const body = document.body;

mode.addEventListener('click', () => {
    modeJour.classList.toggle('show');
    modeNuit.classList.toggle('show');
});

const setTheme = (theme) => {
    body.className = theme;
    localStorage.setItem('theme', theme);
};

modeJour.addEventListener('click', () => setTheme('jour'));
modeNuit.addEventListener('click', () => setTheme('nuit'));

// Charger le thème depuis localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    setTheme(savedTheme);
}

const burgerMenu = document.querySelector('.burger-menu');
const navMenu = document.querySelector('.nav-menu');
const closeMenu = document.querySelector('#close');
burgerMenu.addEventListener('click', function () {
    navMenu.classList.add('show');
})
closeMenu.addEventListener('click', function () {
    navMenu.classList.remove('show');
})
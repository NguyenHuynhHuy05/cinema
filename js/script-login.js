const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.button-login');
const iconClose = document.querySelector('.icon-close');
if (registerLink) {
    registerLink.addEventListener('click', () => {
        wrapper.classList.add('active');
    });
}

if (loginLink) {
    loginLink.addEventListener('click', () => {
        wrapper.classList.remove('active');
    });
}
if (registerLink) {
    btnPopup.addEventListener('click', () => {
        wrapper.classList.add('active-popup');
    });
}
if (registerLink) {
    iconClose.addEventListener('click', () => {
        wrapper.classList.remove('active-popup');
    });
}
window.onload = function() {
    wrapper.classList.add('active-popup');
};

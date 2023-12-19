const form = document.querySelector('form');
const input = form.querySelector('input');

input.addEventListener('focus', () => input.setAttribute('placeholder', ''));
input.addEventListener('blur', () => input.setAttribute('placeholder', 'Search GitHub username...'));
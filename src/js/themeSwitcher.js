function setTheme(theme) {
  const htmlEl = document.documentElement;
  const themeTxt = document.querySelector('#btnChangeMode span');
  const svgUse = document.querySelector('#btnChangeMode use');

  if (theme === 'dark') {
    htmlEl.classList.add('dark');

    // Change the icon to sun
    themeTxt.textContent = 'light';
    svgUse.setAttribute('href', '../src/images/sprites.svg#sun');
  } else {
    htmlEl.classList.remove('dark');

    // Change the icon to moon
    themeTxt.textContent = 'dark';
    svgUse.setAttribute('href', '../src/images/sprites.svg#moon');
  }

  // Update localStorage with the selected theme
  localStorage.theme = theme;
}

// Event listener for theme change button
const btnChangeMode = document.querySelector('#btnChangeMode');

btnChangeMode.addEventListener('click', () => {
  const currentTheme = localStorage.theme === 'dark' ? 'light' : 'dark';
  setTheme(currentTheme);
});

btnChangeMode.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const currentTheme = localStorage.theme === 'dark' ? 'light' : 'dark';
    setTheme(currentTheme);
  }
});

// Check user preference and apply theme on page load
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  setTheme('dark');
} else {
  setTheme('light');
}
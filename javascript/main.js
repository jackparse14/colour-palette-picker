/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
window.addEventListener('load', () => {
  const hexCharacters = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
  const generateBtn = document.getElementById('generate-btn');

  function getColour() {
    let hexString = '#';
    for (let i = 0; i < 6; i++) {
      hexString += hexCharacters[Math.floor(Math.random() * hexCharacters.length)];
    }
    return hexString;
  }
  function createPalette() {
    const palette = document.getElementById('palette');
    for (const colour of palette.children) {
      const currColour = getColour();
      colour.style.backgroundColor = currColour;
      colour.textContent = currColour;
    }
  }
  createPalette();

  generateBtn.addEventListener('click', () => {
    createPalette();
  });
});

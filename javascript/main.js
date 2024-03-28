/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
window.addEventListener('load', () => {
  const hexCharacters = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
  const generateBtn = document.getElementById('generate-btn');

  const lockColourBtns = document.getElementsByClassName('lock-btn');

  function changeLockImage(lockBtn) {
    const lockImg = lockBtn.firstElementChild;
    if (!lockImg.stateLocked) {
      lockImg.src = '/assets/lock.png';
      lockImg.alt = 'An image of a closed padlock';
      lockImg.stateLocked = true;
    } else {
      lockImg.src = '/assets/open-padlock.png';
      lockImg.alt = 'An image of an open padlock';
      lockImg.stateLocked = false;
    }
  }
  for (const lockBtn of lockColourBtns) {
    lockBtn.firstElementChild.stateLocked = false;
    lockBtn.addEventListener('click', () => {
      changeLockImage(lockBtn);
    });
  }

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
      colour.firstElementChild.innerHTML = currColour;
    }
  }
  createPalette();

  generateBtn.addEventListener('click', () => {
    createPalette();
  });
});

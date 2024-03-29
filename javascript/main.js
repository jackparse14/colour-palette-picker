/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
window.addEventListener('load', () => {
  const hexCharacters = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
  const generateBtn = document.getElementById('generate-btn');

  const lockColourBtns = document.getElementsByClassName('lock-btn');

  function unlockImage(lockImg, colour) {
    lockImg.src = '/assets/open-padlock.png';
    lockImg.alt = 'An image of an open padlock';
    colour.isLocked = false;
  }
  function lockImage(lockImg, colour) {
    lockImg.src = '/assets/lock.png';
    lockImg.alt = 'An image of a closed padlock';
    colour.isLocked = true;
  }
  function lockColour() {

  }
  function unlockColour() {

  }

  function changeLockState(lockBtn) {
    const lockImg = lockBtn.firstElementChild;
    const colour = lockBtn.parentElement;
    if (!colour.isLocked) {
      lockImage(lockImg, colour);
      lockColour();
    } else {
      unlockImage(lockImg, colour);
      unlockColour();
    }
  }

  for (const lockBtn of lockColourBtns) {
    lockBtn.parentElement.isLocked = false;
    lockBtn.addEventListener('click', () => {
      changeLockState(lockBtn);
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
      if (!colour.isLocked) {
        const currColour = getColour();
        colour.style.backgroundColor = currColour;
        colour.firstElementChild.innerHTML = currColour;
      }
    }
  }
  createPalette();

  generateBtn.addEventListener('click', () => {
    createPalette();
  });
});

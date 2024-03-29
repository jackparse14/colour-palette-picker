/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
window.addEventListener('load', () => {
  const hexCharacters = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
  const generateBtn = document.getElementById('generate-btn');
  const saveBtn = document.getElementById('save-btn');

  const lockColourBtns = document.getElementsByClassName('lock-btn');
  const palette = document.getElementById('palette');
  let currColours = [];

  function unlockImage(lockImg) {
    lockImg.src = '/assets/open-padlock.png';
    lockImg.alt = 'An image of an open padlock';
  }
  function lockImage(lockImg) {
    lockImg.src = '/assets/lock.png';
    lockImg.alt = 'An image of a closed padlock';
  }

  function changeLockState(lockBtn) {
    const lockImg = lockBtn.firstElementChild;
    const colour = lockBtn.parentElement;
    if (!colour.isLocked) {
      lockImage(lockImg);
      colour.isLocked = true;
    } else {
      unlockImage(lockImg);
      colour.isLocked = false;
    }
  }

  function savePalette() {
    localStorage.setItem('palette', JSON.stringify(currColours));
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
    currColours = [];
    for (const colour of palette.children) {
      if (!colour.isLocked) {
        const currColour = getColour();
        colour.style.backgroundColor = currColour;
        colour.firstElementChild.innerHTML = currColour;
      }
      currColours.push(colour.firstElementChild.innerHTML);
    }
  }
  createPalette();

  generateBtn.addEventListener('click', () => {
    createPalette();
  });
  saveBtn.addEventListener('click', () => {
    savePalette();
  });
});

/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */

window.addEventListener('load', () => {
  const hexCharacters = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
  const generateBtn = document.getElementById('generate-btn');
  const saveBtn = document.getElementById('save-btn');
  const exportBtn = document.getElementById('export-btn');
  const exportDropdown = document.getElementById('export-dropdown');
  const exportPopUp = document.getElementById('export-pop-up');
  const exportText = document.getElementById('main-text');
  const exportHeading = document.getElementById('heading-text');
  const exitPopUpBtn = document.getElementById('exit-btn');

  const exportAsCSSBtn = document.getElementById('export-css-btn');
  const exportAsJSONBtn = document.getElementById('export-json-btn');
  const exportAsHEXBtn = document.getElementById('export-hex-btn');

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
  function exportPaletteAsCSS() {
    exportPopUp.showModal();
    let cssResult = '';
    for (let i = 1; i < currColours.length + 1; i++) {
      cssResult += `--colour-${i}: ${currColours[i - 1]}`;
      if (i !== currColours.length) { cssResult += ', '; }
    }
    exportText.textContent = cssResult;
    exportHeading.textContent = 'CSS:';
  }
  function exportPaletteAsJSON() {
    const paletteAsJSON = JSON.stringify(currColours);
    exportPopUp.showModal();
    exportText.textContent = paletteAsJSON;
    exportHeading.textContent = 'JSON:';
  }
  function exportPaletteAsHEX() {
    exportPopUp.showModal();
    exportText.textContent = currColours;
    exportHeading.textContent = 'HEX:';
  }
  function showExportDropdown() {
    if (exportDropdown.style.display === 'none') {
      exportDropdown.style.display = 'flex';
    } else {
      exportDropdown.style.display = 'none';
    }
  }

  function hexToDecimal(hexColour) {
    return parseInt(hexColour, 16);
  }
  function checkBrightness(colour) {
    let hex = colour[1] + colour[2];
    console.log(hex);
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
      checkBrightness(colour);
      console.log(colour);
    }
  }
  createPalette();

  exitPopUpBtn.addEventListener('click', () => {
    exportPopUp.close();
  });

  exportAsHEXBtn.addEventListener('click', () => {
    exportPaletteAsHEX();
  });
  exportAsJSONBtn.addEventListener('click', () => {
    exportPaletteAsJSON();
  });
  exportAsCSSBtn.addEventListener('click', () => {
    exportPaletteAsCSS();
  });

  for (const lockBtn of lockColourBtns) {
    lockBtn.parentElement.isLocked = false;
    lockBtn.addEventListener('click', () => {
      changeLockState(lockBtn);
    });
  }
  generateBtn.addEventListener('click', () => {
    createPalette();
  });
  saveBtn.addEventListener('click', () => {
    savePalette();
  });
  exportBtn.addEventListener('click', () => {
    showExportDropdown();
  });
});

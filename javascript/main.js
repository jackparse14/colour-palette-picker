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

  function unlockImage(lockImg, imgString) {
    lockImg.src = imgString;
    lockImg.alt = 'An image of an open padlock';
  }
  function lockImage(lockImg, imgString) {
    lockImg.src = imgString;
    lockImg.alt = 'An image of a closed padlock';
  }

  function makeLockWhite(colour) {
    colour.isWhite = true;
    if (colour.isLocked) {
      lockImage(colour.lastElementChild.firstElementChild, '/assets/lock-white.png');
    } else {
      unlockImage(colour.lastElementChild.firstElementChild, '/assets/open-padlock-white.png');
    }
  }
  function makeLockBlack(colour) {
    colour.isWhite = false;
    if (colour.isLocked) {
      lockImage(colour.lastElementChild.firstElementChild, '/assets/lock-black.png');
    } else {
      unlockImage(colour.lastElementChild.firstElementChild, '/assets/open-padlock-black.png');
    }
  }
  function changeLockState(lockBtn) {
    const lockImg = lockBtn.firstElementChild;
    const colour = lockBtn.parentElement;
    if (!colour.isLocked) {
      if (colour.isWhite) {
        lockImage(lockImg, '/assets/lock-white.png');
      } else {
        lockImage(lockImg, '/assets/lock-black.png');
      }
      colour.isLocked = true;
    } else {
      if (colour.isWhite) {
        unlockImage(lockImg, '/assets/open-padlock-white.png');
      } else {
        unlockImage(lockImg, '/assets/open-padlock-black.png');
      }
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
  function changeColourToWhite(colour) {
    colour.style.color = 'white';
    makeLockWhite(colour);
  }
  function changeColourToBlack(colour) {
    colour.style.color = 'black';
    makeLockBlack(colour);
  }
  function checkBrightness(colour) {
    const decimalColour = [];
    const colourText = colour.firstElementChild.innerHTML;
    for (let i = 1; i < colourText.length; i += 2) {
      const hex = colourText[i] + colourText[i + 1];
      decimalColour.push(hexToDecimal(hex));
    }
    const brightness = (
      (0.2126 * decimalColour[0]) + (0.7152 * decimalColour[1]) + (0.0722 * decimalColour[2])
    );
    if (brightness < 128) {
      changeColourToWhite(colour);
    } else {
      changeColourToBlack(colour);
    }
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

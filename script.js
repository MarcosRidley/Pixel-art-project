let firstBoard = true;

function addListenersToColors() {
  const colors = document.querySelectorAll('.color');
  for (let color of colors) {
    color.addEventListener('click', changeActiveColor);
  }
}
function addListenersToPixels() {
  const pixels = document.querySelectorAll('.pixel');
  for (let pixel of pixels) {
    pixel.addEventListener('click', paintPixel);
  }
}
function addListenersToButtons() {
  document.querySelector('#clear-board').addEventListener('click', clearPixels);
  document
    .getElementById('generate-board')
    .addEventListener('click', generateBoard);
}
addListenersToColors();
makeColorsRandom();
addListenersToButtons();
addListenersToPixels();

function changeActiveColor(event) {
  document.querySelector('.selected').classList.remove('selected');
  event.target.classList.add('selected');
}

function paintPixel(event) {
  event.target.style.backgroundColor =
    document.querySelector('.selected').style.backgroundColor;
}

function clearPixels() {
  const pixels = document.querySelectorAll('.pixel');
  for (let pixel of pixels) {
    pixel.style.backgroundColor = 'white';
  }
}
function generatePixels() {
  let boardSide = document.getElementById('board-size').value;
  if (!boardSide) {
    alert('Board inválido!');
    return;
  }
  if (boardSide < 5) boardSide = 5;
  if (boardSide > 50) boardSide = 50;
  const container = document.getElementById('pixel-board');
  for (let i = 0; i < boardSide * boardSide; i++) {
    const newPixel = document.createElement('div');
    newPixel.className = 'pixel generated';
    newPixel.style.backgroundColor = 'white';
    container.appendChild(newPixel);
  }
  document
    .querySelector(':root')
    .style.setProperty('--numero-width-board', 42.5 * boardSide + 'px');
  addListenersToPixels();
}

function generateBoard() {
  if (firstBoard) {
    const defaultPixels = document.querySelectorAll('.default-pixel');
    for (let pixel of defaultPixels) {
      pixel.remove();
      firstBoard = false;
    }
  }
  if (!firstBoard) {
    const generatedPixels = document.querySelectorAll('.generated');
    for (let pixel of generatedPixels) {
      pixel.remove();
    }
  }
  generatePixels();
}

function makeColorsRandom() {
  const randomColors = document.querySelectorAll('.random');
  for (let i of randomColors) {
    i.style.backgroundColor = getRandomRgb();
  }
}

function getRandomRgb() {
  var num = Math.round(0xffffff * Math.random());
  var r = num >> 16;
  var g = (num >> 8) & 255;
  var b = num & 255;
  return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}
//Credits to CORY, 2014, at https://stackoverflow.com/questions/23095637/how-do-you-get-random-rgb-in-javascript for the random rgb generation function

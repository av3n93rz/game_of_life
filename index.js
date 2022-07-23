import { Rectangle } from './rectangle.js'
const canvas = document.getElementById('canvas')
const selectSound = new Audio('./sounds/select.wav');
const unselectSound = new Audio('./sounds/unselect.wav');

const padding = 20;
const squareSize = 10;
const gapSize = 2;
const squarePlusGap = squareSize + gapSize;

const horizontalSquarCount = Math.floor((window.innerWidth - padding - squareSize)/squarePlusGap)
const verticalSquarCount = Math.floor((window.innerHeight - 200 - padding - squareSize)/squarePlusGap)

canvas.setAttribute("height", (verticalSquarCount  * squarePlusGap) - gapSize);
canvas.setAttribute("width", (horizontalSquarCount * squarePlusGap) - gapSize);


const createArrayOfLength = (length) => new Array(length).fill(null)

const rectangles = createArrayOfLength(verticalSquarCount).map(
  () => createArrayOfLength(horizontalSquarCount)
);

canvas.addEventListener('click', ({ target }) => {
  if (target.tagName === 'rect') {
    if (target.classList.contains('selected')){
      target.classList.remove('selected');
      unselectSound.play();
    } else {
      target.classList.add('selected');
      selectSound.play();
    }
  }
})

rectangles.forEach((row, verticalIndex) => {
  row.forEach((_, horizontalIndex) => {
    new Rectangle(squareSize, horizontalIndex * squarePlusGap, verticalIndex * squarePlusGap)
  })
})
import { Rectangle } from './rectangle.js'
const reset = document.getElementById('reset');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const selectSound = new Audio('./sounds/select.wav');
const unselectSound = new Audio('./sounds/unselect.wav');

const padding = 20;
const squareSize = 10;
const gapSize = 1;
const squarePlusGap = squareSize + gapSize;
let cameraZoom = 1
let MAX_ZOOM = 2
let MIN_ZOOM = 0.5
let SCROLL_SENSITIVITY = 0.001
let cameraOffset = { x: window.innerWidth/2, y: window.innerHeight/2 }

const horizontalSquarCount = Math.floor((window.innerWidth - padding - squareSize)/squarePlusGap)
const verticalSquarCount = Math.floor((window.innerHeight - 200 - padding - squareSize)/squarePlusGap)
const canvasWidth = ((horizontalSquarCount * squarePlusGap) - gapSize)
const canvasHeight = ((verticalSquarCount  * squarePlusGap) - gapSize)

const createArrayOfLength = (length) => new Array(length).fill(null)

const rectangles = createArrayOfLength(1000).map(
  () => createArrayOfLength(1000)
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


const draw = () => {
  canvas.height = canvasHeight;
  canvas.width = canvasWidth;
  //ctx.translate( canvasWidth / 2, canvasHeight / 2 )
  ctx.scale(cameraZoom, cameraZoom)
  ctx.translate( -canvasWidth / 2 + cameraOffset.x, -canvasHeight / 2 + cameraOffset.y )
  ctx.clearRect(0,0, canvasWidth, canvasHeight)
  ctx.fillStyle = "#C8C8C8"
  requestAnimationFrame( draw )
  rectangles.forEach((row, verticalIndex) => {
    row.forEach((_, horizontalIndex) => {
      ctx.fillRect( horizontalIndex * squarePlusGap, verticalIndex * squarePlusGap, squareSize, squareSize)
    })
  })
}

canvas.addEventListener("wheel", (e) => {
  cameraZoom = cameraZoom + (e.deltaY*SCROLL_SENSITIVITY*-1)
  cameraZoom = Math.min( cameraZoom, MAX_ZOOM )
  cameraZoom = Math.max( cameraZoom, MIN_ZOOM )
})

canvas.addEventListener('mousedown', function(event) {
  if (event.detail > 1) {
    event.preventDefault();
  }
}, false);

draw();

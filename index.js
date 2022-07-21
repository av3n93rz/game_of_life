const svgns = "http://www.w3.org/2000/svg";
const canvas = document.getElementById('canvas')

const padding = 20;
const squareSize = 10;
const gapSize = 2;
const squarePlusGap = squareSize + gapSize;

const horizontalSquarCount = Math.floor((window.innerWidth - padding - squareSize)/squarePlusGap)
const verticalSquarCount = Math.floor((window.innerHeight - 200 - padding - squareSize)/squarePlusGap)

canvas.setAttribute("height", (verticalSquarCount  * squarePlusGap) - gapSize);
canvas.setAttribute("width", (horizontalSquarCount * squarePlusGap) - gapSize);


const createSVGRectangle = () => {
  const rectangle = document.createElementNS(svgns, 'rect')
  rectangle.setAttribute('width', squareSize);
  rectangle.setAttribute('height', squareSize);
  rectangle.setAttribute('style', 'fill: rgb(173, 216, 230)');
  return rectangle;
};

const createArrayOfLength = (length) => new Array(length).fill(null)

const rectangles = createArrayOfLength(verticalSquarCount).map(
  () => createArrayOfLength(horizontalSquarCount).map(createSVGRectangle)
);

rectangles.forEach((row, verticalIndex) => {
  row.forEach((rect, horizontalIndex) => {
    rect.setAttribute("transform", `translate(${horizontalIndex * squarePlusGap}, ${verticalIndex * squarePlusGap})`)
    canvas.appendChild(rect)
  })
})
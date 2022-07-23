const svgns = "http://www.w3.org/2000/svg";

export class Rectangle {

    #createSVGRectangle = (squareSize, x, y) => {
        const rectangle = document.createElementNS(svgns, 'rect')
        rectangle.setAttribute('width', squareSize);
        rectangle.setAttribute('height', squareSize);
        rectangle.setAttribute("transform", `translate(${x}, ${y})`)
        this.rectangle = rectangle;
    };
    
    constructor(squareSize, x, y) {
        this.canvas = document.getElementById('canvas');
        this.#createSVGRectangle(squareSize, x, y);
        this.canvas.appendChild(this.rectangle)
    }
}
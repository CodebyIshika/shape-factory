'use strict';

import { Shape } from "./shape.js";
import { onEvent, select } from "./utils.js";

// selections
const shapeSelector = select('.shapes-selection');
const colorSelector = select('.color-selection');
const createButton = select('.button');
const shapesFactory = select('.shapes-factory');
const message = select('.message');

// Main code 
const shapes = [];

// Creating shape function
function createShape() {
    if (shapes.length >= 20) {
        message.textContent = 'Your shape factory storage is full';
        return;
    }

    const selectedShape = shapeSelector.value;
    const selectedColor = colorSelector.value;

    const shape = new Shape(selectedShape, selectedColor);
    shapes.push(shape);

    const shapeElement = createShapeElement(shape, selectedShape, selectedColor);
    appendShapeToFactory(shapeElement);
}

function createShapeElement(shape, shapeType, colorCode) {
    const newShapeDiv = document.createElement('div');
    newShapeDiv.classList.add('shape');

    if (shapeType === 'square') {
        newShapeDiv.classList.add('square');
    }

    newShapeDiv.style.backgroundColor = `#${colorCode}`;

    newShapeDiv.addEventListener('click', function () {
        alert(shape.getInfo());
    });

    return newShapeDiv;
}

function appendShapeToFactory(shapeElement) {
    const position = shapes.length - 1;

    const row = Math.floor(position / 5);
    const col = position % 5;

    shapeElement.style.gridRowStart = 5 - row; 
    shapeElement.style.gridColumnStart = 5 - col; 

    shapesFactory.appendChild(shapeElement);
}

// Event listener
onEvent('click', createButton, createShape);

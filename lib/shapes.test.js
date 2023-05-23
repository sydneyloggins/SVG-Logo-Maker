const { test } = require('node:test');
const {Circle, Square, Triangle} = require('./shapes');

describe('Circle', () => {
    test  ('should return a circle', () => {
        const shape = new Circle();
        var color = 'red';
        shape.setColor(color);
        expect(shape.render()).toEqual(`<circle cx="50%" cy="50%" r="100" height="100%" width= "100%" fill="${color}">`);
    });
});

describe('Square', () => {
    test  ('should return a square', () => {
        const shape = new Square();
        var color = 'blue';
        shape.setColor(color);
        expect(shape.render()).toEqual(`<rect x="50" y="50" width="200" height="200" fill="${color}">`);
    });
});

describe('Triangle', () => {
    test  ('should return a triangle', () => {
        const shape = new Triangle();
        var color = 'green';
        shape.setColor(color);
        expect(shape.render()).toEqual(`<polygon height="100%" width = "100%" points="0, 200 300, 200 150, 0" fill="${color}">`);
    });
});
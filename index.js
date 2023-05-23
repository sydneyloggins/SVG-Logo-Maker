const filesystem = require('./node_modules/graceful-fs/graceful-fs');
const inquirer = require('inquirer');
const {Circle, Square, Triangle} = require('./lib/shapes');
const { async } = require('rxjs');

class Svg{
    constructor(){
        this.textElement = '';
        this.shapeElement = '';
    }
    render(){
        return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200">${this.textElement}${this.shapeElement}</svg>`;
    }
    setTextElement(text, color){
        this.textElement = '<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${text}</text>';
    }
    setShapeElement(shape){
        this.shapeElement = shape.render();
    }
}

//Questions using inquirer library

const questions = [
    {
        type: 'input',
        name: 'text',
        message: 'TEXT: What would you like to write on your shape? (3 characters)',
    },
    {
        type: 'input',
        name: 'text-color',
        message: 'TEXT COLOR: What color would you like your text to be?',
    },
    {
        type: 'input',
        name: 'shape',
        message: 'SHAPE COLOR: What color would you like your shape to be?',
    },
    {
        type: 'list',
        name: 'pixel-image',
        message: 'PIXEL IMAGE: What shape would you like to use?',
        choices: ['Circle', 'Square', 'Triangle'],
    }, 
];

//Function to write the SVG file
function writeToFile(fileName, data) {
    filesystem.writeFile(fileName, data, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
}

//Function to initialize the program
async function init() {
    console.log('Starting initialization...');
    var svgString = '';
    var svg_file = 'logo.svg';

    //Prompt user for input
    const answers = await inquirer.prompt(questions);

    var user_text = '';
    if (answers.text.length > 0 && answers.text.length < 4){
        user_text = answers.text;
    } else {
        console.log('Please enter a valid input (1-3 characters)');
        return; 
    }
    console.log('User text: [' + user_text + ']');
    user_font_color = answers['text-color'];
    console.log('User font color: [' + user_font_color + ']');
    user_shape_color = answers['shape'];
    console.log('User shape color: [' + user_shape_color + ']');
    user_shape_type = answers['pixel-image'];
    console.log('User shape: [' + user_shape_type + ']');

    let user_shape;
    if (user_shape_type === 'Circle' || user_shape_type === 'circle'){
        user_shape = new Circle();
        console.log('User shape: [Circle]');
    } 
    else if (user_shape_type === 'Square' || user_shape_type === 'square'){
        user_shape = new Square();
        console.log('User shape: [Square]');
    } 
    else if (user_shape_type === 'Triangle' || user_shape_type === 'triangle'){
        user_shape = new Triangle();
        console.log('User shape: [Triangle]');
    } else {
        console.log('Please enter a valid input (Circle, Square, Triangle)');
        return;
    } 
    user_shape.setColor(user_shape_color);

    //Create SVG object
    var svg = new Svg();
    svg.setTextElement(user_text, user_font_color);
    svg.setShapeElement(user_shape);
    svgString = svg.render();

    //print shape to log
    console.log('Displaying shape...');

    console.log('Shape complete!');
    console.log('Writing to file...');
    writeToFile(svg_file, svgString);
}
init();


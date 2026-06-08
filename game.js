// game.js

// 1. Grab the elements from the HTML
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const playButton = document.getElementById('play-button');
const backButton = document.getElementById('back-button');

//ingredients
const egg = document.getElementById('ingredient-egg');
const tomato = document.getElementById('ingredient-tomato');
const bacon = document.getElementById('ingredient-bacon');


const stove = document.getElementById('stove');
const plate = document.getElementById('plate');


const stoveContainer = document.getElementById('stove-container');
const plateContainer = document.getElementById('plate-container');
// 2. Add an event listener to the Play button
playButton.addEventListener('click', () => {
    // Hide the start screen
    startScreen.classList.add('hidden');

    // Show the game screen
    gameScreen.classList.remove('hidden');
});

// 3. (Bonus) Make the Quit button work so you can test going back and forth!
backButton.addEventListener('click', () => {
    gameScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
});


function onDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
}

egg.addEventListener('dragstart', onDragStart);
tomato.addEventListener('dragstart', onDragStart);
bacon.addEventListener('dragstart', onDragStart);

stoveContainer.addEventListener('dragover', (e) => {
    e.preventDefault();
});

stoveContainer.addEventListener('drop', (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const item = document.getElementById(id);
    if (!item) return;

    // Stove accepts only raw eggs
    if (item.dataset.type === 'egg' && item.dataset.state === 'raw') {
        item.src = 'fried-egg/cooked-egg.svg';
        item.dataset.state = 'cooked';
        item.classList.add('on-stove');
        stoveContainer.appendChild(item);
        console.log('Dropped the egg on the stove! It is now cooked.');
    } else {
        console.log('That cannot be cooked on the stove.');
    }
});
plateContainer.addEventListener('dragover', (e) => {
    e.preventDefault();
});
plateContainer.addEventListener('drop', (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const item = document.getElementById(id);
    if (!item) return;

    const type = item.dataset.type;
    const state = item.dataset.state;

    // Plate accepts only cooked eggs or sliced tomatoes
    const canServeEgg = (type === 'egg' && state === 'cooked');
    const canServeTomato = (type === 'tomato' && state === 'sliced');
    const canServeBacon = (type === 'bacon' && state === 'sliced');

    if (canServeEgg || canServeTomato || canServeBacon) {
        item.classList.remove('on-stove');
        item.classList.add('on-plate');
        item.dataset.state = 'served';
        plateContainer.appendChild(item);
        console.log('Order up! Served:', type);
    } else {
        console.log('You cannot serve that! Wrong state or ingredient.');
    }
});

// Clicking the tomato slices it (changes state and image)
tomato.addEventListener('click', () => {
    if (tomato.dataset.state === 'whole') {
        tomato.src = 'fried-egg/sliced-tomato.svg';
        tomato.dataset.state = 'sliced';
        console.log('Tomato sliced and ready to serve.');
    } else {
        console.log('Tomato is already sliced.');
    }
});

bacon.addEventListener('click', () => {
    if (bacon.dataset.state === 'raw') {
        bacon.src = 'fried-egg/sliced-bacon.svg';
        bacon.classList.add('sliced-bacon');
        bacon.dataset.state = 'sliced';
        console.log('Bacon sliced and ready to serve.');
    } else {
        console.log('Bacon is already sliced.');
    }
});

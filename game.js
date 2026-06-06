// game.js

// 1. Grab the elements from the HTML
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const playButton = document.getElementById('play-button');
const backButton = document.getElementById('back-button');
const raw_egg = document.getElementById('ingredient-egg');
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


raw_egg.addEventListener('dragstart', (e) => {

    console.log('Started dragging the egg!');
});

stoveContainer.addEventListener('dragover', (e) => {
    e.preventDefault();
});

stoveContainer.addEventListener('drop', (e) => {
    e.preventDefault();

    raw_egg.src = '/fried-egg/cooked-egg.svg';
    //stove.appendChild(raw_egg);
    raw_egg.classList.add('on-stove')
    stoveContainer.appendChild(raw_egg);

    console.log('Dropped the egg on the stove!');
});
plateContainer.addEventListener('dragover', (e) => {
    e.preventDefault();
});
plateContainer.addEventListener('drop', (e) => {
    e.preventDefault();

    // Only allow the drop IF the egg is cooked
    if (raw_egg.src.includes('cooked-egg.svg')) {
        
        raw_egg.classList.remove('on-stove');
        raw_egg.classList.add('on-plate');
        plateContainer.appendChild(raw_egg);
        
        console.log('Order up! Perfect egg served.');
        
    } else {
        // Optional: Let the player know they messed up!
        console.log('You cannot serve that! It is raw or burnt!');
    }
});


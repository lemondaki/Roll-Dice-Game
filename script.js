'use strict';
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const player0El = document.querySelector('.player--0')
const player1El = document.querySelector('.player--1')
score0El.innerText = 0;
score1El.innerText = 0;
diceEl.classList.add('hidden');
let currentScore;
let activePlayer;
let score;
let isPlaying;

// INIT EVEN WHEN START A GAME:
const init = function () {
    currentScore = 0;
    activePlayer = 0;
    score = [0, 0];
    isPlaying = true;
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}
init();
// NEW GAME FEATURE:
btnNew.addEventListener('click', init);

//  SHOW CURRENT SCORE:
const showCurrentScore = function (currentScore) {
    document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
}
// SWITCH THE NEXT PLAYER:
const switchPlayer = function () {
    activePlayer = activePlayer ? 0 : 1;
    document.querySelector('.player--0').classList.toggle('player--active');
    document.querySelector('.player--1').classList.toggle('player--active');
}

// ROLLING THE DICE
btnRoll.addEventListener('click', function () {
    if (isPlaying) {
        const dice = Math.trunc(Math.random() * 6) + 1;
        currentScore += dice;
        diceEl.classList.remove('hidden');
        // DISPLAY IMG TƯƠNG ƯNG ~ DICE RANDOM VALUE BY CHANGE SRC, SRC IMG DẠNG: (dice-1.png, dice-2.png)
        diceEl.src = `./image/dice-${dice}.png`;
        // IF DICE !== 1 => ADD TO CURRENT SCORE AND SHOW
        if (dice !== 1) {
            showCurrentScore(currentScore);
        }
        // IF DICE === 1 => SET CURRENT SCORE = 0 AND SWITCH PLAYER
        else {
            currentScore = 0;
            showCurrentScore(currentScore);
            switchPlayer();
        }
    }
})

// HOLDING THE SCORE:
btnHold.addEventListener('click', function () {
    if (isPlaying) {
        score[activePlayer] += currentScore;
        document.querySelector(`#score--${activePlayer}`).textContent = score[activePlayer];
        currentScore = 0;
        showCurrentScore(currentScore);
        // IF SCORE OF PLAYER >= 50 => HAVE A WINNER:
        if (score[activePlayer] >= 50) {
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector('.player--0').classList.remove('player--active');
            document.querySelector('.player--1').classList.remove('player--active');
            diceEl.classList.add('hidden');
            // HAD A WINNER AND SET isPlaying = false => END GAME;
            isPlaying = false;
        }
        // IF HAVEN'T A WINNER => SWITCH PLAYER
        switchPlayer();
    }
})


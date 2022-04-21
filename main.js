'use strict'

// Selected Elements
const player0El = document.querySelector('.player--0')
const player1El = document.querySelector('.player--1')
const score0El = document.getElementById('score--0')
const score1El = document.getElementById('score--1')

const diceEl = document.querySelector('.dice')

const current0El = document.getElementById('current--0')
const current1El = document.getElementById('current--1')

const btnNew = document.querySelector('.btn--new')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')


// Starting Condition  --------------
let currentScore, activePlayer, playing, scores;

const newGame = function () {
    score0El.textContent = 0
    score1El.textContent = 0
    current0El.textContent = 0
    current1El.textContent = 0
    diceEl.classList.add('hidden')

    scores = [0, 0]
    currentScore = 0
    activePlayer = 0
    playing = true;

    player0El.classList.remove('player--winner')
    player1El.classList.remove('player--winner')
    player0El.classList.add('player--active')
    player1El.classList.remove('player--active')


}
newGame()

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0El.classList.toggle('player--active')
    player1El.classList.toggle('player--active')
}

btnRoll.addEventListener('click', function () {
    if (playing) {
        // Generate Random Dice number
        const dice = Math.trunc(Math.random() * 6) + 1;

        // Display dice
        diceEl.classList.remove('hidden')
        diceEl.src = `dice-${dice}.png`

        // If dice-1 Switch to next player
        if (dice !== 1) {
            currentScore = currentScore + dice
            document.getElementById(`current--${activePlayer}`).textContent = currentScore
        } else {
            switchPlayer()
        }
    }
})


btnHold.addEventListener('click', function () {
    if (playing) {
        // Add current score to Active's players score
        scores[activePlayer] += currentScore;

        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // check if player's score is >=100
        if (scores[activePlayer] >= 50) {
            playing = false
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            diceEl.classList.add('hidden')
        }
        // finesh the game
        else {
            // switch to the next player
            switchPlayer()
        }
    }

})

btnNew.addEventListener('click', function () {
    newGame()
})
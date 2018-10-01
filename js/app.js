// cards array
const icons = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-bolt", "fa fa-cube", "fa fa-anchor",
    "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb", "fa fa-diamond",
    "fa fa-paper-plane-o", "fa fa-bolt", "fa fa-cube", "fa fa-anchor",
    "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb"
]

const cardContainer = document.querySelector('.deck');

let openCards = [];
let matchedCards = [];
let modalShow = document.getElementsByClassName('modal')[0];

function init() {
  //  clearInterval(intId);
    window.onload = function() {
        modalShow.style.display = 'none';
    }
    shuffle(icons);
    // create the cards
    for (let i = 0; i < icons.length; i++) {
        const card = document.createElement('li');
        card.classList.add("card");
        card.innerHTML = `<i class="${icons[i]}"></i>`;
        cardContainer.appendChild(card);
        //Add click event
        click(card);

    }
}

//click event
function click(card) {

    //card click event
    card.addEventListener('click', function() {
        
        const currentCard = this;
        const previousCard = openCards[0];
        // existing opencard
        if (openCards.length === 1) {
            card.classList.add('open', 'show', 'disabled');
            openCards.push(this);
            compare(currentCard, previousCard);
        } else {
            // no opencard
            currentCard.classList.add('open', 'show', 'disabled');
            openCards.push(this);
        }

    });
}

function compare(currentCard, previousCard) {
    //comparing cards
    if (currentCard.innerHTML === previousCard.innerHTML) {
        currentCard.classList.add('match');
        previousCard.classList.add('match');
        matchedCards.push(currentCard, previousCard);
        openCards = [];

        //check if the game is over
        setTimeout(gameover, 500);
    } else {

        setTimeout(function() {
            // matching cards
            currentCard.classList.remove('open', 'show', 'disabled');
            previousCard.classList.remove('open', 'show', 'disabled');

        }, 500);
        openCards = [];

    }

    addMove();
}

//timer
let duration = document.querySelector('.time');
let count = 0;
let intId = setInterval(counting, 1000);

function counting() {
    duration.textContent = count++ + ' Seconds';
}

//function gameover
function gameover() {
    if (matchedCards.length === icons.length) {
        clearInterval(intId);
        modalContent();

    }
}



const movesContainer = document.querySelector('.moves');
//add move
let moves = 0;
movesContainer.innerHTML = 0;

function addMove() {
    moves++;
    movesContainer.innerHTML = moves;
    rating();
}

//Rating

var startsContainer = document.querySelector(".stars");

function rating() {
    if (moves < 17) {
        startsContainer.innerHTML = `<li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>`;

    } else if (moves < 25) {
        startsContainer.innerHTML = ` <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>`;

    } else if (moves > 25) {
        startsContainer.innerHTML = ` <i class="fa fa-star"></i></li>`;
    }

}
// Restart
const restartBtn = document.querySelector('.restart');
restartBtn.addEventListener('click', function() {
    cardContainer.innerHTML = "";
    init();
    // restart
    openCards = [];
    matchedCards = [];
    moves = 0;
    count = 0;
    movesContainer.innerHTML = moves;
    startsContainer.innerHTML = ` <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;

});
// initiaze the game
init();

// modal
var modal = document.getElementById('simpleModal');
var modalBtn = document.getElementById('modalBtn');
var closeBtn = document.getElementsByClassName('closeBtn')[0];

//open modal event listener
modalBtn.addEventListener('click', openModal);

function openModal() {
    modal.style.display = 'block';
};

closeBtn.addEventListener('click', closeModal);

function closeModal() {
    modal.style.display = 'none';
}

window.addEventListener('click', clickOutside);

function clickOutside(e) {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
}

//modal content
let modalText = document.querySelector('.modal-content');

function modalContent() {
    modalShow.style.display = 'block';
    modalText.textContent = ` congratulations you finish the game in ${count} seconds and ${moves} moves you have ${startsContainer} `;
    
    }



// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
/*-------------------------------- Constants --------------------------------*/
const suits = ["spades", "diamonds", "clubs", "hearts"];
const cardValues = ["A", "02", "03", "04", "05", "06", "07", "08", "09", "10", "J", "Q", "K"];
const playerCash = 1000;

/*--------------------------------Game State Variables --------------------------------*/
let dealerCards = [];
let playerCards = [];
let playerCurrentCash;
let playerCurrentBet;
let deck = [];
/*------------------------ Cached Element References ------------------------*/
const playerCardsEl = document.getElementById('playerStack'); //Dont forget to style this so it shows up. This is where the cards will be displayed 
const dealerCardsEl = document.getElementById('dealerStack'); //Dont forget to style this
const hitButton = document.getElementById('hitButton');
const stayButton = document.getElementById('stayButton');
const playButton = document.getElementById('playButton');
const doubleDownButton = document.getElementById('doubleDownButton');
const splitButton = document.getElementById('splitButton');
/*----------------------------- Event Listeners -----------------------------*/
hitButton.addEventListener('click', (Event) => {
    let card = hit();
    playerCards.push(card);

    //check for player bust and end round
    let playerHandValue = calculateCards(playerCards);
    if (playerHandValue > 21) {
        alert('Player bust... better luck next time')
    }
});
stayButton.addEventListener('click', dealerTurn);
playButton.addEventListener('click', init);
doubleDownButton.addEventListener('click', doubleDown);
splitButton.addEventListener('click', split);

/*-------------------------------- Functions --------------------------------*/

function init() {
    console.log('init');
    //1. This will not be kicked off until user places bet
    //If user bet, proceed
    //placeBet();
    deck = [];
    playerCards = [];
    dealerCards = [];
    removeAllChildNodes(playerCardsEl);
    removeAllChildNodes(dealerCardsEl);
    //2. call Deal()
    firstDeal();
}

function reset() {
    console.log('reset');
    //2. refresh all game stats and set everything back to zero
}

function placeBet() {
    const bet = prompt('Please enter a bet less than 1000');
    console.log(bet);
    playerCurrentBet = bet;
}

function firstDeal() {
    //Shuffle and create deck
    deck = []
    for (i = 0; i < 13; i++) {
        deck.push('s' + cardValues[i]);
        deck.push('d' + cardValues[i]);
        deck.push('c' + cardValues[i]);
        deck.push('h' + cardValues[i]);
    }
    console.log(deck);

    //Deal a random int index card to the player, remove from deck
    const dealerFirstCard = hit();
    const playerFirstCard = hit();
    const dealerSecondCard = hit();
    const playerSecondCard = hit();
    console.log(deck);
    dealerCards.push(dealerFirstCard, dealerSecondCard);
    playerCards.push(playerFirstCard, playerSecondCard);
    //Wait for user input...
    //Render dealer and player card images
    renderCards();

    alert(`Dealer:${dealerCards} Player: ${playerCards}`);
    let playerHandValue = calculateCards(playerCards);

    if(playerHandValue === 21) {
        alert('INSTANT BLACKJACK!!');
        //render player win
    }
}

function hit() {
    //Return and remove random card from deck
    return deck.splice([Math.floor(Math.random() * deck.length)], 1);
}

function dealerTurn() {
    //After player is done betting, doubling down, splitting, entering input...

    //Dealer shows all of his cards
    //If dealer has 16 or less, must hit until passes 16
    while(calculateCards(dealerCards) < 16) {
        let card = hit();
        dealerCards.push(card);
    }

    console.log('done');
    let dealerHandValue = calculateCards(dealerCards);
    let playerHandValue = calculateCards(playerCards);
    console.log(`dealerHandValue: ${dealerHandValue} playerHandValue: ${playerHandValue}`);

    //After dealer is done drawing cards or busts --> decide winner
    if (dealerHandValue > 21) {
        alert('dealer busts! you win!');
    }
    else if (dealerHandValue <= 21 && dealerHandValue > playerHandValue) {
        alert('House wins... better luck next time');
    }
    else if (dealerHandValue === playerHandValue) {
        alert('Push! (tie)');
    }
    else if (playerHandValue > dealerHandValue) {
        alert('Player beat dealer!!!');
    }
}

function calculateCards(playerCardArray) {
    let total = 0;
    console.log(`playerCardArray: ${playerCardArray}`);
    playerCardArray.forEach(card => {
        //console.log(`card: ${card}`)
        let cardValue = String(card).substring(0,1);
        //console.log(`cardvalue: ${cardValue}`);
        if (cardValue === 'J' || cardValue === 'Q' || cardValue === 'K') {
            total += 10;
        }
        else if (cardValue === 'A') {
            total += 11;
        }
        else {
            total += parseInt(cardValue);
        }
    })
    return total;
}

function doubleDown() {
    //Render another chip on the board and double players bet HUD
    if (playerCards.length == 2) {
        //Can only double down after the first 2 cards are dealt
        //This should be the only time this button is not disabled

    }
}

function split() {
    let playerCard1 = String(playerCards[0]).substring(0,1);
    let playerCard2 = String(playerCards[1]).substring(0,1);
    console.log(`SPLIT FUNCTION: playerCard1: ${playerCard1} playerCard2: ${playerCard2}`);
    if (playerCards.length == 2 &&  (playerCard1 === playerCard2)) {

    }
}

function renderCards() {
    console.log(playerCards);
    console.log(dealerCards);

    if (playerCards.length < 3 && dealerCards.length < 3) {
        playerCards.forEach(card => {
            let newCard = document.createElement("div");
            newCard.id = 'playerCard'
            newCard.className = 'card xlarge ' + card;
            playerCardsEl.appendChild(newCard);
        })
    
        dealerCards.forEach(card => {
            let newCard = document.createElement("div");
            newCard.id = 'playerCard'
            newCard.className = 'card xlarge ' + card;
            dealerCardsEl.appendChild(newCard);
        })
    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

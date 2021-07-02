/*-------------------------------- Constants --------------------------------*/
const suits = ["spades", "diamonds", "clubs", "hearts"];
const cardValues = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const playerCash = 1000;

/*--------------------------------Game State Variables --------------------------------*/
let dealerCards = [];
let playerCards = [];
let playerCurrentCash;
let playerCurrentBet;
let deck = [];
/*------------------------ Cached Element References ------------------------*/
const playerCardsEl = document.getElementById('playerCardStack'); //Dont forget to style this so it shows up. This is where the cards will be displayed 
const dealerCardsEl = document.getElementById('dealerCardStack'); //Dont forget to style this
const hitButton = document.getElementById('hitButton');
const stayButton = document.getElementById('stayButton');
const playButton = document.getElementById('playButton');
const doubleDownButton = document.getElementById('doubleDownButton');
const splitButton = document.getElementById('hitButton');
/*----------------------------- Event Listeners -----------------------------*/



/*-------------------------------- Functions --------------------------------*/
init();
firstDeal();

function init() {
    //1. This will not be kicked off until user places bet
    //If user bet, proceed

    //2. refresh all game stats and set everything back to zero
    //3. call Deal()
}

function reset() {

}

function firstDeal() {
    //Shuffle and create deck
    deck = []
    for (i = 0; i < 13; i++) {
        deck.push(cardValues[i] + 'S');
        deck.push(cardValues[i] + 'D');
        deck.push(cardValues[i] + 'C');
        deck.push(cardValues[i] + 'H');
    }
    console.log(deck);

    //Deal a random int index card to the player, remove from deck
    const dealerFirstCard = deck.splice([Math.floor(Math.random() * 52 + 1)], 1);
    //Deal a random int index card to the dealer, remove from deck
    const playerFirstCard = deck.splice([Math.floor(Math.random() * 52 + 1)], 1);
    //Deal a random int index card to the player, remove from deck
    const dealerSecondCard = deck.splice([Math.floor(Math.random() * 52 + 1)], 1);
    //Deal a random int index card card to the dealer, remove from deck
    const playerSecondCard = deck.splice([Math.floor(Math.random() * 52 + 1)], 1);
    console.log(deck);
    dealerCards.push(dealerFirstCard, dealerSecondCard);
    playerCards.push(playerFirstCard, playerSecondCard);
    //Wait for user input...
    console.log(`dealer first card: ${dealerFirstCard} dealer second card ${dealerSecondCard} player first card: ${playerFirstCard} player second card:${playerSecondCard}`);

    //Render dealer and player card images
}

function hit(currentPlayer) {
    const hit = deck.splice([Math.floor(Math.random() * 52 + 1)], 1);
    currentPlayer.push(playerHit);
}

function dealerTurn() {
    //After player is done betting, doubling down, splitting, entering input...

    //Dealer shows all of his cards

    //If dealer has 16 or less, must hit until passes 16

    //call DecideRoundWinner()
}

function stay () {

}

function doubleDown() {
    
}

function split() {

}

function DecideRoundWinner() {
    //If player wins round...Play celebratory winning audio or animation

    //If player loses round...Play crowd sad audio or animation

    //clear game table and prepare for next round

}

function renderCards() {

}

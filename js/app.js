/*-------------------------------- Constants --------------------------------*/
const suits = ["spades", "diamonds", "clubs", "hearts"];
const cardValues = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const deck = [];
const playerCash = 1000;

/*--------------------------------Game State Variables --------------------------------*/
let dealerCards = [];
let playerCards = [];
let playerCurrentCash;
let playerCurrentBet;

/*------------------------ Cached Element References ------------------------*/
 const playerCardsEl = document.getElementById('playerCardStack'); //Dont forget to style this so it shows up. This is where the cards will be displayed 
 const dealerCardsEl = document.getElementById('dealerCardStack'); //Dont forget to style this

/*----------------------------- Event Listeners -----------------------------*/



/*-------------------------------- Functions --------------------------------*/
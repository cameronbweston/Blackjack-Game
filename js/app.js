/*-------------------------------- Constants --------------------------------*/
const suits = ["spades", "diamonds", "clubs", "hearts"];
const cardValues = ["A", "02", "03", "04", "05", "06", "07", "08", "09", "10", "J", "Q", "K"];
const cardDealSound = new Audio("../audio/cardDeal.ogg");
const cardFlipSound = new Audio('../audio/cardFlip.wav');
cardDealSound.volume = 0.5
cardFlipSound.volume = 0.5
//const backgroundSound = new Audio('../audio/backgroundNoise.wav');
/*--------------------------------Game State Variables --------------------------------*/
let dealerCards = [];
let playerCards = [];
let playerSplitCards = [];
let playerCurrentBet = 0;
let deck = [];
let playerCurrentCash = 1000;

/*------------------------ Cached Element References ------------------------*/
const playerCardsEl = document.getElementById('playerStack'); //Dont forget to style this so it shows up. This is where the cards will be displayed 
const playerSplitCardsEl = document.getElementById('splitStack')
const dealerCardsEl = document.getElementById('dealerStack'); //Dont forget to style this
const message = document.getElementById('message');
const currentBetEl = document.getElementById('currentBet');
const totalCashEl = document.getElementById('totalCash');
const hitButton = document.getElementById('hitButton');
const stayButton = document.getElementById('stayButton');
const playButton = document.getElementById('playButton');
const doubleDownButton = document.getElementById('doubleDownButton');
const splitButton = document.getElementById('splitButton');
const currentBetDisplay = document.getElementById('betValue');
const betSlider = document.getElementById('betSlider');
/*----------------------------- Event Listeners -----------------------------*/
hitButton.addEventListener('click', (Event) => {
    doubleDownButton.disabled = true;

    let card = hit();
    playerCards.push(card);
    renderCards('p');
    cardDealSound.play();
    //check for player bust and end round
    let playerHandValue = calculateCards(playerCards);
    if (playerHandValue > 21) {
        stay();
    }
});

stayButton.addEventListener('click', stay);

playButton.addEventListener('click', init);
doubleDownButton.addEventListener('click', doubleDown);
splitButton.addEventListener('click', split);
betSlider.addEventListener('input', (Event) => {
    console.log(`betSlider: ${this.value}`)
    currentBetDisplay.innerText = `BET: $${betSlider.value}`;
    playerCurrentBet = betSlider.value;
    betSlider.max = playerCurrentCash;
});

/*-------------------------------- Functions --------------------------------*/

function init() {
    console.log('init');
    playerCurrentBet = betSlider.value
    deck = [];
    playerCards = [];
    dealerCards = [];
    playerSplitCards = [];
    removeAllChildNodes(playerCardsEl);
    removeAllChildNodes(dealerCardsEl);
    removeAllChildNodes(playerSplitCardsEl);
    hitButton.disabled = false;
    stayButton.disabled = false;
    doubleDownButton.disabled = false;
    message.innerText = 'Insurance Pays 2 to 1'
    splitButton.innerText = 'SPLIT'

    //2. call Deal()
    firstDeal();
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

    //Deal a random int index card to the player, remove from deck
    const dealerFirstCard = hit();
    const playerFirstCard = hit();
    const dealerSecondCard = hit();
    const playerSecondCard = hit();
    dealerCards.push(dealerFirstCard, dealerSecondCard);
    playerCards.push(playerFirstCard, playerSecondCard);
    //Wait for user input...
    //Render dealer and player card images

    renderCards('d');
    renderCards('p');

    let playerHandValue = calculateCards(playerCards);
    let possibleSplit = checkForSplit();
    if (possibleSplit) { splitButton.disabled = false; }

    if(playerHandValue === 21) {
        hitButton.disabled = true;
        stayButton.disabled = true;
        doubleDownButton.disabled = true;
        splitButton.disabled = true; 

        let payout = Math.floor(playerCurrentBet * 1.5); //Payout is 3:2
        message.innerText = `BLACKJACK $${payout}!!!`;
        playerCurrentCash += payout;
        totalCashEl.innerText = `Cash: $${playerCurrentCash}`;
        //render player win
        //end round
    }
}

function stay() {
    let firstGameOverMessage = dealerTurn(playerCards);
    let secondGameOverMessage = '';

    if (playerSplitCards.length > 0) {
        if (calculateCards(playerSplitCards) > 21) {
            secondGameOverMessage = 'Player bust... better luck next time';
        }
        else {
            console.log('Calculating SPLIT Hand')
            secondGameOverMessage = dealerTurn(playerSplitCards);
            message.innerText = `First: ${firstGameOverMessage}, Second: ${secondGameOverMessage}`;
        }
    }
    else {
        message.innerText = firstGameOverMessage;
    }
}

function hit() {
    //Return and remove random card from deck
    return deck.splice([Math.floor(Math.random() * deck.length)], 1);
}

function dealerTurn(cardArray) {
    //After player is done betting, doubling down, splitting, entering input...
    //Dealer shows all of his cards
    //If dealer has 16 or less, must hit until passes 16
    hitButton.disabled = true;
    stayButton.disabled = true;
    doubleDownButton.disabled = true;
    splitButton.disabled = true;


    while(calculateCards(dealerCards) < 16) {
            let card = hit();
            dealerCards.push(card);
            renderCards('d');
    }

    //Flip over dealer's face down card
    dealerCardsEl.firstChild.className = 'card x-large ' + dealerCards[0];
    cardFlipSound.play();

    let dealerHandValue = calculateCards(dealerCards);
    let playerHandValue = calculateCards(cardArray);
    console.log(`dealerHandValue: ${dealerHandValue} playerHandValue: ${playerHandValue}`);


    let payout = Math.floor(playerCurrentBet * 1.5); //Payout is 3:2
    console.log(playerCurrentCash);

    let gameOverMessage = '';

    if (playerHandValue > 21) {
        gameOverMessage = 'Player bust - better luck next time';
        playerCurrentCash -= playerCurrentBet;
        totalCashEl.innerText = `Cash: $${playerCurrentCash}`;
    }
    else if (dealerHandValue > 21) {
        playerCurrentCash += payout;
        gameOverMessage = `Dealer busts! You win $${payout}`
        totalCashEl.innerText = `Cash: $${playerCurrentCash}`;
    }
    else if (dealerHandValue <= 21 && dealerHandValue > playerHandValue) {
        gameOverMessage = 'House wins... better luck next time';
        playerCurrentCash -= playerCurrentBet;
        totalCashEl.innerText = `Cash: $${playerCurrentCash}`;
    }
    else if (dealerHandValue === playerHandValue) {
        gameOverMessage = 'Push';
        totalCashEl.innerText = `Cash: $${playerCurrentCash}`;
    }
    else if (playerHandValue > dealerHandValue) {
        gameOverMessage = `Player wins $${payout}!`;
        playerCurrentCash += payout;
        totalCashEl.innerText = `Cash: $${playerCurrentCash}`;
    }

    return gameOverMessage;
}

function calculateCards(playerCardArray) {
    let total = 0;
    playerCardArray.forEach(card => {
        let cardValue = String(card).substring(1,3);
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
        playerCurrentBet *= 2;
        let newCard = hit();
        playerCards.push(newCard);
        renderCards('p');
        //In most casinos, player can double down only once and must play that hand after hitting again.
        let playerHandValue = calculateCards(playerCards);
        if (playerHandValue > 21) {
            message.innerText = 'Player bust... better luck next time';
        }
    }
    stay();
}

function checkForSplit() {
    let playerCard1 = String(playerCards[0]).substring(1,3);
    let playerCard2 = String(playerCards[1]).substring(1,3);
    let array = [playerCard1, playerCard2];
    let faces = ['J', 'Q', 'K', 'A', '10'];
    let faceCard1 = faces.includes(playerCard1);
    let faceCard2 = faces.includes(playerCard2);

    console.log(`SPLIT FUNCTION: playerCard1: ${playerCard1} playerCard2: ${playerCard2}`);
    console.log(`faceCard1 = ${faceCard1} faceCard2=${faceCard2}`);

    //Checks if card values are the same OR if both cards are face cards or face card and 10
    if ((playerCards.length == 2 && playerCard1 === playerCard2) || (faceCard1 && faceCard2)) { return true }
}

function split() {

    //Checks if card values are the same OR if both cards are face cards or face card and 10
    if (checkForSplit()) {
        cardDealSound.play();

        playerSplitCards.push(playerCards.splice(1, 1));
        let card = playerSplitCards[0];
        let newCard = document.createElement("div");
        newCard.id = 'playerCard'
        newCard.className = 'card xlarge ' + card;
        playerCardsEl.removeChild(playerCardsEl.childNodes[1]); //remove from other stack
        playerSplitCardsEl.appendChild(newCard); //make new stack

        console.log(`player cards: ${playerCards} playerSplitCards: ${playerSplitCards}`);
        splitButton.innerText = 'SPLIT (HIT)'
    }
    else if (playerSplitCards.length > 0) {
        let card = hit();
        playerSplitCards.push(card);
        renderCards('s');
    }
}

function renderCards(currentPlayer) {
    let cardArray, element;

    if (currentPlayer === 'p') {
        cardArray = playerCards;
        element = playerCardsEl;
    } else if (currentPlayer === 'd') {
        cardArray = dealerCards;
        element = dealerCardsEl;
    }
    else if (currentPlayer === 's') {
        cardArray = playerSplitCards;
        element = playerSplitCardsEl;
    }


    if (cardArray.length < 3 && !element.hasChildNodes()) {
        cardArray.forEach(card => {
            let newCard = document.createElement("div");
            newCard.id = 'playerCard'

            //Make dealer's first card, face down
            if (currentPlayer === 'd' && cardArray[0] === card) { 
                newCard.className = 'card xlarge back-red';
                element.appendChild(newCard);
            }
            else {
                newCard.className = 'card xlarge ' + card;
                element.appendChild(newCard);
            }
        })
    } else { //render new card on hit
        let card = cardArray[cardArray.length-1];
        let newCard = document.createElement("div");
        newCard.id = 'playerCard'
        newCard.className = 'card xlarge ' + card;
        element.appendChild(newCard);
    }
    cardDealSound.play();
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

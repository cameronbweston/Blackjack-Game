# Blackjack
Unit-1-Game

## Objective:
My favorite game to play at casino's has always been Blackjack. It's a thrilling combination of both luck and skill and offers you a far better chance of winning (and payout) than most slot machines! I challenged myself by building my own version. This has helped me to learn JavaScript and CSS better and to learn more about the game I love.

## Technologies Utilized
* HTML
* CSS
* Javascript
* Boot

## Wireframe
[Wireframe Link](https://wireframe.cc/upALWn)

## Psuedocode:
	1. Define constants such as:
		1.  cards, card deck array, chip values, user currency, link to a file that pulls HighScores from past games.
	2. Define our GAME STATE variables
		1. copy of the global deck that tracks current game cards => gameDeck [ ] will contain all 52 cards in 4 suits 
		2. dealerCardArray[ ]
		3. playerCardArray [ ] 
		4. playerCurrentMoney
		5. playerCurrentBetAmount
	3. Cache all of our html elements that we are going to need to access so that we can change their values and css later
	4. Set up Event Listeners
		1. Set up click listener so that player can start game. Call our initial function() to set up and start the game.
		2. Set up event listeners for our other buttons but RESTRICT them until player is given the option to use them during the game
	5. User bets and initial currency functionality
		1. Give user a pre-defined amount of money to play the game with.
		2. Let user place initial bet and restrict the game start button until bet is placed
		3. Once player has placed bet, Play button is clickable
	6. Bet function ()
		1. Allow user to enter a bet amount into a pop up text field.
		2. Store the current bet amount into an int variable currentPlayerBetAmount
	7. User hits play button to call Initialize()
		1. Initialize function will refresh all game stats.
		2. Initialize will call Deal() function.
	8. Deal function()
		1. Chose random integer to access the deck.
		2. Going around the table, pull an indexed card at random from the array and then REMOVE that card until later.
		3. Stop once player and dealer have 2 cards each
	9. RenderDeal() function
		1. Have divs to display dealer and player cards. 
		2. Dealer will have 1 card face down, and another LAYERED card placed on top
		3. Player will have all cards face up, LAYERED on top of each other.
		4. Newest card is always on top
		5. (Time allowing, add animations or delays for UI polish)
	10. playerTurn() function
		1. The user will have access to a hit, stand, double down, and split button
		2. Depending on which button is hit --> call the various functions (split will be disabled if not available)
		3. Player will only be able to double down if 10/11 is showing (double down will be disabled if not available)
		4. If player hit, check for bust, blackjack, or under 21. If blackjack or bust, END ROUND
	11. dealerTurn() function 
		1. On dealer turn, show all cards
		2. If dealer has 16 OR LESS, must hit until passes 16.
		3. call decideWinner() function
	12. decideWinner() function
		1. If user card array total is HIGHER than dealer card array total --> display renderPlayerWins()
		2. ELSE --> displayRenderPlayerLoses()
		3. Reset necessary variables and prepare game for next hand -------->
	13. renderPlayerWins() function
		1. Display some sort of victory message or celebration (audio applause) when player wins the hand
		2. Clear game table and prepare for next hand
	14. renderPlayerLoses() function
		1. Display player loss message (audio "ahhhh" or sigh from crowd)
		2. Clear game table and prepare for next hand
	15. RESET board
		1. After a hand, deck will be shuffled and game will start over from step 5
		2. EXCEPT player will maintain current currency until he runs out

## Next Steps
Animation, delayed timers, render betting chips

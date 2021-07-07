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
		Cards, card deck array, chip values, user currency, link to a file that pulls HighScores from past games.
	2. Define our GAME STATE variables
		Copy of the global deck that tracks current game cards => gameDeck [ ] will contain all 52 cards in 4 suits 
		DealerCardArray[ ]
		PlayerCardArray [ ] 
		PlayerCurrentMoney
		PlayerCurrentBetAmount
	3. Cache all of our html elements that we are going to need to access so that we can change their values and css later
	4. Set up Event Listeners
		Set up click listener so that player can start game. Call our initial function() to set up and start the game.
		Set up event listeners for our other buttons but RESTRICT them until player is given the option to use them during the game
	5. User bets and initial currency functionality
		Give user a pre-defined amount of money to play the game with.
		Let user place initial bet and restrict the game start button until bet is placed
		Once player has placed bet, Play button is clickable
	6. Bet function ()
		Allow user to enter a bet amount into a pop up text field.
		Store the current bet amount into an int variable currentPlayerBetAmount
	7. User hits play button to call Initialize()
		Initialize function will refresh all game stats.
		Initialize will call Deal() function.
	8. Deal function()
		Chose random integer to access the deck.
		Going around the table, pull an indexed card at random from the array and then REMOVE that card until later.
		Stop once player and dealer have 2 cards each
	9. RenderDeal() function
		Have divs to display dealer and player cards. 
		Dealer will have 1 card face down, and another LAYERED card placed on top
		Player will have all cards face up, LAYERED on top of each other.
		Newest card is always on top
		(Time allowing, add animations or delays for UI polish)
	10. playerTurn() function
		The user will have access to a hit, stand, double down, and split button
		Depending on which button is hit --> call the various functions (split will be disabled if not available)
		Player will only be able to double down if 10/11 is showing (double down will be disabled if not available)
		If player hit, check for bust, blackjack, or under 21. If blackjack or bust, END ROUND
	11. dealerTurn() function 
		On dealer turn, show all cards
		If dealer has 16 OR LESS, must hit until passes 16.
		Call decideWinner() function
	12. decideWinner() function
		If user card array total is HIGHER than dealer card array total --> display renderPlayerWins()
		ELSE --> displayRenderPlayerLoses()
		Reset necessary variables and prepare game for next hand -------->
	13. renderPlayerWins() function
		Display some sort of victory message or celebration (audio applause) when player wins the hand
		Clear game table and prepare for next hand
	14. renderPlayerLoses() function
		Display player loss message (audio "ahhhh" or sigh from crowd)
		Clear game table and prepare for next hand
	15. RESET board
		After a hand, deck will be shuffled and game will start over from step 5
		EXCEPT player will maintain current currency until he runs out

## Next Steps
Animation, delayed timers, render betting chips

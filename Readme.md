Jarold Sabillon 
Z23638144

Tic Tac Toe - Project 4

	Makes a 3x3 board and then sets the player against an AI,
	bootstrap was used for easier handling of cells and used javascript for logic control.
	The tic tac toe game is able to be replayed after every match and keeps a tally of the winner.
	There are 8 winning conditions to allow the player or AI to win.
	Ties will not count toward a score.
	
	Has several arrays to store cell information and what to do with the cell ID's contained.

	cells[] contains the available moves left after the player or bot moves.
	cellsbyid[] helps map out the board by giving each cell a unique ID that is matched when looking for a specific location.
	checkifwon() function will loop through the possiblewin conditions, gets the ID of the cell and then find if the cell has been filled then count up at each row until 3 		of the same value is found.
	
	Botmove() will create a new array that is reset each time it is called and fill with the ID's of the available moves left.
	
	restart() will reset the board and available moves and call on the start() function everytime a button is hit.
	
	
	

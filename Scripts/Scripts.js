let cells = [
    [0, 0, 0],
    [0, 0, 0],                                  //2d array to show what moves are available.
    [0, 0, 0]
];
let cellsbyid = [
    [0, 1, 2],                                  //2d array to identify each cell.
    [3, 4, 5],
    [6, 7, 8]
];
let possiblewins = [
    [0, 1, 2],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],                             //contains all possible winning conditions.
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let cellsforwin = [];                        //empty array that will contain the cells that caused a human towin and then colors it.      
let cellsforlose = [];                       //empty array that will contain the cells that caused the bot to win and then colors it.
var locofrow = 0;
var locofcol = 0;
var locofvalue = 0;
var randomChoice = 0;
var randomValue = 0;
var playing = false;
var won = false;                                   //Global values
var lost = false;
var tie = false;
var humanscore = 0;
var botscore = 0;
var counter = 0;
var counterBot = 0;
let idinpossiblewins = 0;
var idtolocationcol = 0;
var idtolocationrow = 0;
let sum = 0;
let scorebot = 0;
let scorehuman = 0;
$(document).ready(function(){
    $("#play").click(function(){
        $(this).hide();
        start();
    });
  });
//$("p").click(start());
$(document).ready(function(){
    $("#playagain").click(function(){
      
    for (let row in cells) {
        for (let cell in cells[row]) {
            cells[row][cell] = 0;                           //sets cells array with available moves back to zero.
        }
        for (let row in cellsbyid) {
            for (let cell in cellsbyid[row]) {
                $("#"+cellsbyid[row][cell]).text('');
                $("#"+cellsbyid[row][cell]).css("background-color", "");
                      //removes X/O's from board.
            }
        }
    }
    console.log("Map of cells after reset: " + cells);          //logs to show that the available moves have been reset.
    cellsforwin = [];
    cellsforlose = [];
    availablemoves = [];
    locofrow = 0;
    locofcol = 0;
    locofvalue = 0;
    randomChoice = 0;                                                 //ensures all values are reset 
    randomValue = 0;
    won = false;
    lost = false;
    tie = false;
    humanscore = 0;
    botscore = 0;
    counter = 0;
    counterBot = 0;
    idtolocationcol = 0;
    idtolocationrow = 0;
    sum = 0;
    //console.log(cells);
    start();                                                             //Starts a new match.;
    });
});


start = ()=> {
               //Hides initial play button
    console.log(won);
    console.log(lost);
    let playing = true;
    var currentTurn = 0;
    const rndInt = randomIntFromInterval(1, 2);
    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)

    }                                                                             // random number to choose who goes first.

    if (rndInt === 1) {
        $("#status").text("Human goes first!");
        currentTurn = 1;
    }
    else if (rndInt === 2) {
        $("#status").text("AI goes first!");           //Statement is overwritten when bot makes a move.
        currentTurn = 2;

    }
    console.log(currentTurn);
    tie=()=> {
        if (won === false && lost === false) {
            for (let row in cells) {
                for (let cell in cells[row]) {
                    sum = sum + cells[row][cell];                                           //Checks if theres a tie if no one won, and the tiles sum up to either 13 or 14
                    //console.log(sum);                                                     // 5(2)+4(1) = 14 or 4(2)+5(1) =13 sum changes depending on who goes first.
                    if (sum === 13 || sum === 14) {
                        $("#status").text("Tie!");
                    }
                }
            }
            sum = 0;
        }
    }
    checkifwon = ()=>{
        console.log("After move: " + cells);
        for (let row in possiblewins) {
            cellsforwin = [];                                           //resets array of cells to color after every row since no win condition was found.
            cellsforlose = [];
            for (let cell in possiblewins[row]) {
                idinpossiblewins = possiblewins[row][cell];
                idtolocationcol = ((idinpossiblewins) % 3);                                                        //Gets ID number from possiblewins array, and then matches its ID to
                idtolocationrow = ((idinpossiblewins - (idinpossiblewins % 3)) / 3);                               //corresponding row and column in cells.
                //console.log("Row found in possiblewins: " + idtolocationrow);
                //console.log("Column found in possiblewins: " + idtolocationcol);                              // console logs from bug fixing when finding the appropriate row and cols for a cell ID.
                //console.log("Id of cell picked: " + cells[idtolocationrow][idtolocationcol]);
                if (cells[idtolocationrow][idtolocationcol] === 1) {
                    cellsforwin.push(idinpossiblewins);                                                 //pushing ID's that will cause a win to then color
                    console.log("checking updated ids to color for win: " + cellsforwin);
                    counter = counter + 1;
                    if (counter === 3) {
                        $("#status").text("You win!");
                        currentTurn = 0;                                                              //counts the values in a possiblewin condition.
                        won = true;                                                                   //If 3 of the same values is found in a possiblewin then it is a win condition 
                        scorehuman = scorehuman + 1;                                                  // Tallies up score if won
                        $("#human").text(scorehuman);
                        for (let cell in cellsforwin) {
                            $("#"+cellsforwin[cell]).css("background-color", "#90ee90");         //colors in cells that caused a win.
                        }
                    }
                }
                if (cells[idtolocationrow][idtolocationcol] === 2) {                                   //same as above except for the bots winning condition
                    counterBot = counterBot + 1;
                    cellsforlose.push(idinpossiblewins);
                    // console.log("checking updated ids to color for lose : " + cellsforlose);
                    if (counterBot === 3) {
                        currentTurn = 0;
                        $("#status").text("You Lose!");
                        lost = true;
                        //colorthewinner();
                        scorebot = scorebot + 1;
                        $("#bot").text(scorebot);                                                   //tallies bot score if lost
                        
                        for (let cell in cellsforlose) {
                            $("#"+cellsforlose[cell]).css("background-color", "#ff6347");
                        }
                    }

                }
            }
            counter = 0;         //restarts counter after every row
            counterBot = 0;
        }
    }
    locationOfBotmove=()=> {
        locofvalue = 0;
        locofvalue = 0;
        for (let row in cells) {
            for (let cell in cells[row]) {
                if (randomValue === cellsbyid[row][cell]) {                                   //Matches available Id to the random ID and returns its location
                    locofrow = row;
                    locofcol = cell;
                    cells[row][cell] = 2;
                }
            }
        }
    }
    botMove=()=> {
        currentTurn = 1;
        checkifwon();
        let availablemoves = [];                              //creates an array with available moves. It is reset every time it is called to update it with new values.

        for (let row in cells) {
            for (let cell in cells[row]) {                            //traverses array to check what cells are available.
                var cellvalue = cells[row][cell];
                if (cellvalue === 0) {
                    var idvalue = cellsbyid[row][cell];
                    availablemoves.push(idvalue);                   //adds the id of cells that are available to an array
                }
            }
        }
        console.log(availablemoves);
        var randomChoice = Math.floor(Math.random() * availablemoves.length)    //chooses a random index from available moves.
        randomValue = availablemoves[randomChoice];                     //gets the id of the available move.
        locationOfBotmove();                                           //Finds the index of the available move in the cellsbyid array.
        locofvalue = cellsbyid[locofrow][locofcol];
        $("#locofvalue").text("O");
        document.getElementById(locofvalue).innerHTML = "O";                 //bot places move at the random location.
        $("#status").text("Computer went, humans turn!");
        console.log(cells);
        checkifwon();                                                           //checks winning conditions after every move.
        tie();
    }
    if (currentTurn === 2) {                  //bots move
        botMove();
    }
    if (currentTurn === 1) {               //players move 
        playerMove();
    }
    function playerMove() {
        for (let row in cellsbyid) {
            for (let cell in cellsbyid[row]) {
                $("#"+cellsbyid[row][cell]).click(function(){
                    if (currentTurn === 1 && cells[row][cell] === 0) {
                        currentTurn = 2;
                        $(this).text("X");
                        cells[row][cell] = 1;
                        console.log(cells);
                        checkifwon();                             // checks for win and tie conditions after every move.
                        tie();
                        if (won === false) {                      //lets the bot keep moving if no one has won
                            botMove();
                        }
                        if (lost === true) {
                            currentTurn = 2;                       //prevents further clicking if the bot wins.
                        }
                    }
                });
        
            }

        }
    }
}
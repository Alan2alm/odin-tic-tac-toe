//3 objects, 1 for the gameboard, 1 for the players and 1 to control the flow of the game.
//store the gameboard as an array
//tic tac toe = is the game with X and O, where you have to make a line of 3, 
// in any direction as long as it is a straight line
//numb decides if the player uses X or O, player 1 = X, player 2 = O

function createPlayer(name, mark){
    var name = name;
    var mark = mark;
    var points = 0;
    return {name, mark, points};
}

const player1 = createPlayer("Alan", "X");
const player2 = createPlayer("Enzo", "O");

const gameboard = (function (){
    let board = ["", "", "", "", "", "", "", "", ""];

    const getBoardPosition = (i) => {
        return board[i];
    }
    //use and change printBoard to print it in the html using DOM.
    const printBoard = () => {
        console.log("---------------");
        console.log("|" + board[0] + " | " + board[1] + " | " + board[2] + "|");
        console.log("|" + board[3] + " | " + board[4] + " | " + board[5] + "|");
        console.log("|" + board[6] + " | " + board[7] + " | " + board[8] + "|");
        console.log("---------------");
    }
    //change it to update the text in the container element in the html using DOM.
    const updateBoard = (player, x) =>{
        if(board[x] === ""){
            board[x] = player.mark;
            console.log(player.mark);
        }else{console.log("Already Played")};
        gameboard.printBoard();
    };

    const resetBoard = ()=>{
        board = ["", "", "", "", "", "", "", "", ""];
        gameboard.printBoard();
    };

    const checkMarks = ()=>{
        let isInBoard = [];
        board.forEach(positionMark => {
            if(positionMark === "X" || positionMark === "O"){
                isInBoard.push(true);
            }else{
                isInBoard.push(false);
            }
        });
        console.log(isInBoard);
        return isInBoard;
    }

   return {updateBoard, resetBoard, printBoard, getBoardPosition, checkMarks};
})();


const playGame = (function(){
    let players = [];
    const winConditions = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
    const addPlayer = (newPlayer) => {
        if(newPlayer.mark === "X"){
            players[0] = newPlayer;
            console.log("Player 1 added");
        }else if(newPlayer.mark === "O"){
            players[1] = newPlayer;
            console.log("Player 2 added");
        }
    };
    const playerPlay = (name, position) => {
        let activePlayer;
        players.forEach(player => {
            if (name === player.name){
                return activePlayer = player;
                
            }
        });
        console.log(activePlayer);
        gameboard.updateBoard(activePlayer, position);
        if(checkWinner(activePlayer)){
            console.log(`${activePlayer.name} won the game`);
            gameboard.resetBoard();
        }else if(checkTie(activePlayer)){
            console.log('Tie');
            gameboard.resetBoard();
        }
    };

    const checkWinner = (player) => {
        let roundWon = false;
        for(i = 0 ; i < winConditions.length; i++){
            const condition = winConditions[i];
            const firstCell = gameboard.getBoardPosition(condition[0]);
            const SecondCell = gameboard.getBoardPosition(condition[1]);
            const ThirdCell = gameboard.getBoardPosition(condition[2]);

            if(firstCell == "" || SecondCell == "" || ThirdCell == ""){
                continue;
            }else if( player.mark == firstCell && firstCell == SecondCell && SecondCell == ThirdCell){
                roundWon = true;
                player.points += 1;
                break;
            }
        }

        return roundWon;
    }

    const checkTie = (player) => {
        let isTie = false;
        let index = 0;
        let marksOnBoard = gameboard.checkMarks();
        marksOnBoard.forEach(markCheck =>{
            if(markCheck){
                index += 1;
            }
        })
        if(index == 9){
            isTie = true;
        };
        return isTie;
    }

    /*const tie = ()=>{
        playerPlay(players[0].name, 0);
        playerPlay(players[1].name, 1);
        playerPlay(players[0].name, 4);
        playerPlay(players[1].name, 2);
        playerPlay(players[0].name, 5);
        playerPlay(players[1].name, 3);
        playerPlay(players[0].name, 6);
        playerPlay(players[1].name, 8);
        playerPlay(players[0].name, 7);
    }*/

    return{addPlayer, playerPlay, checkWinner, checkTie/*, tie*/};
})();


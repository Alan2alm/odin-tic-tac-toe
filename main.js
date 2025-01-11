//3 objects, 1 for the gameboard, 1 for the players and 1 to control the flow of the game.
//store the gameboard as an array
//tic tac toe = is the game with X and O, where you have to make a line of 3, 
// in any direction as long as it is a straight line
//numb decides if the player uses X or O, player 1 = X, player 2 = O
const playBtn = document.querySelector("#playBtn");
const restartBtn = document.querySelector("#restartBtn");

function createPlayer(name, mark){
    var name = name;
    var mark = mark;
    var points = 0;
    return {name, mark, points};
}

const player1 = createPlayer("Alan", "X");
const player2 = createPlayer("Enzo", "O");

const gameboard = (function (){
    let board = [];

    
    const prepareBoard = () =>{
        board = document.querySelectorAll("[id^=box-]");
        board.forEach(box => {
            box.textContent = "";
            console.log(box);
            box.addEventListener('click', ()=>{
                console.log("Hizo click en la posicion");
                playGame.playerPlay(box);
            });
        });
        console.log("Board prepared");
        console.log(board);
    };

    //change it to update the text in the container element in the html using DOM.
    const updateBoard = (position, player) =>{
        let index;
        for (i=0; i < board.length; i++){
            if(position === board[i]){
                index = i;
                break;
            }
        }
        if(board[index].textContent === ""){
            board[index].textContent = player.mark;
            console.log(player.mark);
        }else{console.log("Already Played")};
    };

    const resetBoard = ()=>{
        board.forEach(box => {
            box.textContent = "";
        });
    };

    const checkMarks = ()=>{
        let isInBoard = [];
        board.forEach(positionMark => {
            if(positionMark.textContent === "X" || positionMark.textContent === "O"){
                isInBoard.push(true);
            }else{
                isInBoard.push(false);
            }
        });
        console.log(isInBoard);
        return isInBoard;
    };

    const getBoardMark = (i) => {

        return board[i].textContent;
    };

   return {updateBoard, resetBoard, getBoardMark, checkMarks, prepareBoard};
})();


const playGame = (function(){
    let players = [];
    let isPlaying = 0; //who turn is, 0 = player 1, 1 = player 2.
    let running = false;
    const winConditions = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
    const startGame = () => {
        players[0] = createPlayer(document.querySelector("#textInput1").value, "X");
        players[1] = createPlayer(document.querySelector("#textInput2").value, "O");
        isPlaying = 0;
        running = true;
        //changed prepareBoard() for resetBoard because it was adding new eventListener functions to the mark boxes
        gameboard.resetBoard();
    };

    const restartGame = () => {
        gameboard.resetBoard();
        players = [];
        isPlaying = 0;
        running = false;
    };

    const playerPlay = (position) => {
        if(position.textContent === "" && running === true){
            console.log(players[isPlaying]);
            gameboard.updateBoard(position, players[isPlaying]);
            
            if(checkWinner(players[isPlaying])){
                if(players[isPlaying].points == 3){
                    alert(`${players[isPlaying].name} won the 3 games, congratulations!`);
                    players[0].points = 0;
                    players[1].points = 0;
                    restartGame();
                }else{
                    alert(`${players[isPlaying].name} won the game`);
                    isPlaying = 0;
                    gameboard.resetBoard();
                }
                
                
            }else if(checkTie(players[isPlaying])){
                alert("Tie!");
                gameboard.resetBoard();
                isPlaying = 0;
            }else{
                (isPlaying == 0)?isPlaying = 1:isPlaying = 0;
            };
        };
        
    };

    const checkWinner = (player) => {
        let roundWon = false;
        for(i = 0 ; i < winConditions.length; i++){
            const condition = winConditions[i];
            const firstCell = gameboard.getBoardMark(condition[0]);
            const SecondCell = gameboard.getBoardMark(condition[1]);
            const ThirdCell = gameboard.getBoardMark(condition[2]);

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

    const checkTie = () => {
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

    return{startGame, playerPlay, checkWinner, checkTie, restartGame};
})();

gameboard.prepareBoard();

//initialize the IIFE playgame.
playBtn.addEventListener('click', (event)=>{
    event.preventDefault();
    playGame.startGame();
});

//restart all values from gameboard and playgame.
restartBtn.addEventListener('click', ()=>{
    playGame.restartGame();
    alert("Game restarted, please insert the players name.");
});

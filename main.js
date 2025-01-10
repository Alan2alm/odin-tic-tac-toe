//3 objects, 1 for the gameboard, 1 for the players and 1 to control the flow of the game.
//store the gameboard as an array
//tic tac toe = es el juego de los X y O, donde tienen que hacer una linea de 3, 
// en cuanquier direccion siempre y cuando sea una recta
//numb decides if the player uses X or O, player 1 = X, player 2 = O
//crear la funcion industrial gameboard y crear el objeto dentro de playGame para usarlo y crear las distintas funciones 
// sin que se puedan cambiar variables desde fuera de playGame (encapsularlo)
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
    
    const printBoard = () => {
        console.log("---------------");
        console.log("|" + board[0] + " | " + board[1] + " | " + board[2] + "|");
        console.log("|" + board[3] + " | " + board[4] + " | " + board[5] + "|");
        console.log("|" + board[6] + " | " + board[7] + " | " + board[8] + "|");
        console.log("---------------");
    }

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

   return {updateBoard, resetBoard, printBoard, getBoardPosition};
})();


const playGame = (function(){
    let players = [];
    //let gameOver;
    const winConditions = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
    const addPlayer = (newPlayer) => {
        if(players.length == 0){
            players[0] = newPlayer;
            console.log("Player 1 added");
        }else{
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
            console.log(activePlayer.name + ' won the game');
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

    return{addPlayer, playerPlay, checkWinner};
})();


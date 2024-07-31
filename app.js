let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector(".msg");
let newBtn = document.querySelector(".new-btn");

let turnO = true; //playerX, playerO

let winPatterns = [[0,1,2], [3,4,5], [6,7,8], [0,4,8], [2,4,6], [0,3,6], [1,4,7], [2,5,8]];
let countBox = 0;
let winnerBool = false;

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO){ // playerO's turn
            box.innerText = "O";
            turnO = false;
        }
        else{ // playerX's turn
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;

        checkWinner();
        countBox++;
        checkBoxCount(countBox);
    });
});

const checkBoxCount = (cnt) => {
    if((!winnerBool) && cnt === 9){
        showDraw();
    }
}

const checkWinner = () => {
    for(let pattern of winPatterns){
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if(pos1 != "" && pos2 != "" && pos3 != ""){
            if(pos1 === pos2 && pos2 === pos3){
                winnerBool = true;
                showWinner(pos1);
            }
        }

    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulation, Player${winner} has won.`
    msgContainer.classList.remove("hide");
    disableBtns();
}

const showDraw = () => {
    msg.innerText = `Game Drawn.`
    msgContainer.classList.remove("hide");
    disableBtns();
    console.log("drawn");
}

const disableBtns = () => {
    for(box of boxes){
        box.disabled = true;
    }
}

const enableBtns = () => {
    for(box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const resetGame = () => {
    turnO = true;
    enableBtns();
    msgContainer.classList.add("hide");
    countBox = 0;
    winnerBool = false;
}

resetBtn.addEventListener("click", resetGame);

newBtn.addEventListener("click", resetGame);
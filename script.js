
const playerScreen = document.querySelector("#playerScreen");
const gameContainer = document.querySelector("#gameContainer");
const startGameBtn = document.querySelector("#start-game");
const player1Input = document.querySelector("#player1");
const player2Input = document.querySelector("#player2");
const p1Display = document.querySelector("#p1-display");
const p2Display = document.querySelector("#p2-display");
const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const newGameBtn = document.querySelector("#new-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");


let turnO = true;
let count = 0;
let players = {
    X: '',
    O: ''
};

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];


startGameBtn.addEventListener("click", () => {
    if (player1Input.value.trim() === "" || player2Input.value.trim() === "") {
        alert("Please enter names for both players!");
        return;
    }

    players.X = player1Input.value.trim();
    players.O = player2Input.value.trim();
    
    
    p1Display.textContent = players.X;
    p2Display.textContent = players.O;

    
    playerScreen.style.display = "none";
    gameContainer.classList.add("active");
    updateTurnIndicator();
});


function updateTurnIndicator() {
    const player1Div = p1Display.parentElement;
    const player2Div = p2Display.parentElement;
    
    if (turnO) {
        player2Div.classList.add("active");
        player1Div.classList.remove("active");
    } else {
        player1Div.classList.add("active");
        player2Div.classList.remove("active");
    }
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        
        box.disabled = true;
        count++;
        
       
        box.classList.add("clicked");
        
        let isWinner = checkWinner();
        
        if (count === 9 && !isWinner) {
            gameDraw();
        }
        
        updateTurnIndicator();
    });
});


const gameDraw = () => {
    msg.innerText = `Game is a Draw!`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};


const disableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = true;
    });
};


const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("clicked", "win");
    });
};


const showWinner = (winner) => {
    const winnerName = winner === "X" ? players.X : players.O;
    msg.innerText = `Congratulations ${winnerName}! You've won! 🎉`;
    msgContainer.classList.remove("hide");
    
    
    winPatterns.forEach(pattern => {
        const pos1Val = boxes[pattern[0]].innerText;
        const pos2Val = boxes[pattern[1]].innerText;
        const pos3Val = boxes[pattern[2]].innerText;
        
        if (pos1Val === winner && pos2Val === winner && pos3Val === winner) {
            boxes[pattern[0]].classList.add("win");
            boxes[pattern[1]].classList.add("win");
            boxes[pattern[2]].classList.add("win");
        }
    });
    
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        const pos1Val = boxes[pattern[0]].innerText;
        const pos2Val = boxes[pattern[1]].innerText;
        const pos3Val = boxes[pattern[2]].innerText;
        
        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return true;
            }
        }
    }
    return false;
};


const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
    updateTurnIndicator();
};


const newGame = () => {
    resetGame();
    playerScreen.style.display = "flex";
    gameContainer.classList.remove("active");
    player1Input.value = "";
    player2Input.value = "";
};


newGameBtn.addEventListener("click", newGame);
resetBtn.addEventListener("click", resetGame);


gameContainer.classList.remove("active");
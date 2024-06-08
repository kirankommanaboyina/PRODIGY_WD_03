// Query all box elements and initialize game state variables
let boxes = document.querySelectorAll(".box");
let turn = "X";
let isGameOver = false;

// Initialize each box with an event listener for the click event
boxes.forEach(e => {
    e.innerHTML = "";
    e.addEventListener("click", () => {
        if (!isGameOver && e.innerHTML === "") {
            e.innerHTML = turn;
            checkWin();
            checkDraw();
            changeTurn();
        }
    });
});

// Function to change the turn
function changeTurn() {
    if (turn === "X") {
        turn = "O";
        document.querySelector(".bg").style.left = "85px";
    } else {
        turn = "X";
        document.querySelector(".bg").style.left = "0";
    }
}

// Function to check for a win condition
function checkWin() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (boxes[a].innerHTML && boxes[a].innerHTML === boxes[b].innerHTML && boxes[a].innerHTML === boxes[c].innerHTML) {
            isGameOver = true;
            document.querySelector("#results").innerHTML = `${turn} wins!`;
            document.querySelector("#play-again").style.display = "inline";
            condition.forEach(i => {
                boxes[i].style.backgroundColor = "#08D9D6";
                boxes[i].style.color = "#000";
            });
            createFallingPapers();
            return;
        }
    }
}

// Function to check for a draw
function checkDraw() {
    if (!isGameOver && Array.from(boxes).every(box => box.innerHTML)) {
        isGameOver = true;
        document.querySelector("#results").innerHTML = "Draw!";
        document.querySelector("#play-again").style.display = "inline";
    }
}

// Function to create falling paper animation
function createFallingPapers() {
    const paperFall = document.getElementById("paper-fall");
    paperFall.innerHTML = ""; // Clear previous papers
    const numPapers = 1000;
    for (let i = 0; i < numPapers; i++) {
        const paper = document.createElement("div");
        paper.classList.add("paper");
        paper.style.left = Math.random() * 100 + "vw";
        paper.style.animationDuration = Math.random() * 2 + 3 + "s";
        paperFall.appendChild(paper);
    }
}

// Event listener for play again button
document.querySelector("#play-again").addEventListener("click", () => {
    isGameOver = false;
    turn = "X";
    document.querySelector(".bg").style.left = "0";
    document.querySelector("#results").innerHTML = "";
    document.querySelector("#play-again").style.display = "none";
    boxes.forEach(box => {
        box.innerHTML = "";
        box.style.removeProperty("background-color");
        box.style.color = "#fff";
    });
    document.getElementById("paper-fall").innerHTML = ""; // Clear the falling papers
});

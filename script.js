let boxes = document.querySelectorAll(".cells");
let resetBtn = document.querySelector("#reset");
let currentPlayerX = true;
let status = document.querySelector("#statusText");

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
];

// Function to disable all boxes
const disableBoxes = () => {
    boxes.forEach(box => box.disabled = true);
}

// Function to enable all boxes and clear their content
const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
    });
}

// Function to restart the game
const restartGame = () => {
    status.innerText = "";
    currentPlayerX = true;
    enableBoxes();
}

// Function to check for a winner or a tie
const checkWinner = () => {
    for (let pattern of winConditions) {
        let [pos1, pos2, pos3] = pattern.map(index => boxes[index].innerText);

        if (pos1 !== '' && pos1 === pos2 && pos2 === pos3) {
            status.innerText = `${pos1} is the WINNER`;
            disableBoxes();
            return;
        }
    }

    // Check for a tie (all boxes filled without a winner)
    if ([...boxes].every(box => box.innerText !== '')) {
        status.innerText = "It's a TIE!";
    }
}

// Event listener for each box to handle clicks
boxes.forEach(box => {
    box.addEventListener("click", () => {
        if (box.innerText === "") {  // Ensuring box is empty before placing mark
            box.innerText = currentPlayerX ? "X" : "O";
            currentPlayerX = !currentPlayerX;
            box.disabled = true;
            checkWinner();
        }
    });
});

// Event listener for the reset button
resetBtn.addEventListener("click", restartGame);

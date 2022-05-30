// Get all the board’s cells:
const currentBoardState = ["X", 1, "O", "X", 4, "X", "O", "O", 8];
const aiMark = "X";
const humanMark = "O";


// Step 3 - Store the board’s current state in an array and define each mark's owner:

// Step 4 - Create a function to get the indexes of all the empty cells:
function getAllEmptyCellsIndexes(currBdSt) {
    return currBdSt.filter(i => i != "O" && i != "X");
}

// Step 5 - Create a winner determiner function:
function checkIfWinnerFound(currBdSt, currMark) {
    if (
        (currBdSt[0] === currMark && currBdSt[1] === currMark && currBdSt[2] === currMark) ||
        (currBdSt[3] === currMark && currBdSt[4] === currMark && currBdSt[5] === currMark) ||
        (currBdSt[6] === currMark && currBdSt[7] === currMark && currBdSt[8] === currMark) ||
        (currBdSt[0] === currMark && currBdSt[3] === currMark && currBdSt[6] === currMark) ||
        (currBdSt[1] === currMark && currBdSt[4] === currMark && currBdSt[7] === currMark) ||
        (currBdSt[2] === currMark && currBdSt[5] === currMark && currBdSt[8] === currMark) ||
        (currBdSt[0] === currMark && currBdSt[4] === currMark && currBdSt[8] === currMark) ||
        (currBdSt[2] === currMark && currBdSt[4] === currMark && currBdSt[6] === currMark)
) {
        return true;
    } else {
        return false;
    }
}

// Step 6 - Create the minimax algorithm:
function minimax(currBdSt, currMark) {
    // Step 8 - Store the indexes of all empty cells:
    const availCellsIndexes = getAllEmptyCellsIndexes(currBdSt);
    
    // Step 9 - Check if there is a terminal state:
    if (checkIfWinnerFound(currBdSt, humanMark)) {
        return {score: -1};
    } else if (checkIfWinnerFound(currBdSt, aiMark)) {
        return {score: 1};
    } else if (availCellsIndexes.length === 0) {
        return {score: 0};
    }
    
    // Step 10 - Create a place to record the outcome of each test drive:
    const allTestPlayInfos = [];
    
    // Step 10 - Create a for-loop statement that will loop through each of the empty cells:
    for (let i = 0; i < availCellsIndexes.length; i++) {
        // Step 11 - Create a place to store this test-play’s terminal score:
        const currentTestPlayInfo = {};
        
        // Step 11 - Save the index number of the cell this for-loop is currently processing:
        currentTestPlayInfo.index = currBdSt[availCellsIndexes[i]];
        
        // Step 11 - Place the current player’s mark on the cell for-loop is currently processing:
        currBdSt[availCellsIndexes[i]] = currMark;
        
        if (currMark === aiMark) {
            // Step 11 - Recursively run the minimax function for the new board:
            const result = minimax(currBdSt, humanMark);
            
            // Step 12 - Save the result variable’s score into the currentTestPlayInfo object:
            currentTestPlayInfo.score = result.score;
        } else {
            // Step 11 - Recursively run the minimax function for the new board:
            const result = minimax(currBdSt, aiMark);
            
            // Step 12 - Save the result variable’s score into the currentTestPlayInfo object:
            currentTestPlayInfo.score = result.score;
        }
        
        // Step 12 - Reset the current board back to the state it was before the current player made its move:
        currBdSt[availCellsIndexes[i]] = currentTestPlayInfo.index;
        
        // Step 12 - Save the result of the current player’s test-play for future use:
        allTestPlayInfos.push(currentTestPlayInfo);
    }
    
    // Step 15 - Create a store for the best test-play’s reference:
    let bestTestPlay = null;
    
    // Step 16 - Get the reference to the current player’s best test-play:
    if (currMark === aiMark) {
        let bestScore = -Infinity;
        for (let i = 0; i < allTestPlayInfos.length; i++) {
            if (allTestPlayInfos[i].score > bestScore) {
                bestScore = allTestPlayInfos[i].score;
                bestTestPlay = i;
            }
        }
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < allTestPlayInfos.length; i++) {
            if (allTestPlayInfos[i].score < bestScore) {
                bestScore = allTestPlayInfos[i].score;
                bestTestPlay = i;
            }
        }
    }
    
    // Step 17 - Get the object with the best test-play score for the current player:
    return allTestPlayInfos[bestTestPlay];
} 

// Step 7 - First minimax invocation:
const bestPlayInfo = minimax(currentBoardState, aiMark);
const gameCells = document.querySelectorAll(".box");

// Below is the variable we created at step 3:
// Here is the bestPlayInfo we created at step 7 to contain the best test-play object for the AI player:

// Play the AI’s mark on the cell that is best for it:
gameCells[bestPlayInfo.index].innerText = aiMark;
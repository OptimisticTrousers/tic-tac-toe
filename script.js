const gameBoard = function(){

    let boardList = ["", "", "", "", "", "", "", "", ""];

    const points = document.querySelectorAll('div.box');

    const addElementToBoardList = (mark, index) => {

        boardList[index] = mark;
    }

    const getBoardList = () => {

        return boardList;
    }

    const getNodeList = () => {
        return points;
    }

    const getElementAtIndex = index => {
        return boardList[index];
    }


    return {addElementToBoardList, getNodeList, getBoardList, getElementAtIndex};
}();


const displayController = function(){

    const render = () => {

        gameBoard.getNodeList().forEach((point,index) => point.addEventListener('click', (event) => {

                event.target.innerText = gameBoard.getElementAtIndex(index);
        }))
    }

    return {render};
}();

const Player = (name) => {

    let aiMark = "";

    let humanMark = "";

    const getHumanMark = () => {

        return humanMark;
    }

    const getAiMark = () => {

        return aiMark;
    }

    const setMark = function(computer, human) {

        aiMark = computer;
        humanMark = human;
    }

    return {name, getAiMark, getHumanMark, setMark};
}


const Human = (name) => {

    const prototype = Player(name);

    const buttonX = document.querySelector('aside .marks button:nth-child(1)');

    const buttonO = document.querySelector('aside .marks button:nth-child(2)');

    const restartButton = document.querySelector('aside > button')

    restartButton.addEventListener('click', () => {

        location.reload();
    })

    buttonX.addEventListener('click', function() {

        prototype.setMark("O", "X");
        buttonO.classList.add('inactive');
    })

    buttonO.addEventListener('click', function() {

        prototype.setMark("X", "O");
        buttonX.classList.add('inactive');
    })

    const addMarks = () =>{

        gameBoard.getNodeList().forEach((point, index) => point.addEventListener('click', () => {

            if(gameBoard.getElementAtIndex(index) == ""){

                const humanMark = prototype.getHumanMark();

                gameBoard.addElementToBoardList(humanMark, index);
            }
        }))
    }

    return Object.assign({}, prototype, {addMarks});
}

const Computer = (name) => {

    const prototype = Player(name);

    return Object.assign({}, prototype);
}

const game = function(){

    const human = Human('Bob');

    const computer = Computer("Computer");

    const aiMark = computer.getAiMark();

    const humanMark = human.getHumanMark();

    const getAllEmptyCellsIndexes = (currBdSt) =>{

        return currBdSt.filter(i => Number.isInteger(i));
    }

    const checkIfWinnerFound = (currBdSt, currMark) => {

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

    const minimax = (currBdSt, currMark) => {

    const availCellsIndex = getAllEmptyCellsIndexes(currBdSt);

        if(checkIfWinnerFound(currBdSt, humanMark)){
            return {score: -1}
        }
        else if(checkIfWinnerFound(currBdSt, aiMark)){
            return {score: 1};
        }
        else if(availCellsIndex.length === 0){
            return {score: 0};
        }

    const allTestPlayInfos = [];

    for(let i = 0; i < availCellsIndex.length; i++){

        const currentTestPlayInfo = {};

        currentTestPlayInfo.index = currBdSt[availCellsIndex[i]];

        currBdSt[availCellsIndex[i]] = currMark;

        if(currMark === aiMark){

            const result = minimax(currBdSt, humanMark);

            currentTestPlayInfo.score = result.score;
        }
        else {

            const result = minimax(currBdSt, aiMark);

            currentTestPlayInfo.score = result.score;
        }

        currBdSt[availCellsIndex[i]] = currentTestPlayInfo.index;

        allTestPlayInfos.push(currentTestPlayInfo);

    }

    let bestTestPlay = null;

        if(currMark === aiMark){

            let bestScore = -Infinity;
            for(let i = 0; i < allTestPlayInfos.length; i++){

                if(allTestPlayInfos[i].score > bestScore){

                    bestScore = allTestPlayInfos[i].score;

                    bestTestPlay = i;
                }
            }
        }
        else {
            let bestScore = Infinity;

            for(let i = 0; i < allTestPlayInfos.length; i++){

                if(allTestPlayInfos[i].score < bestScore){

                    bestScore = allTestPlayInfos[i].score
                    bestTestPlay = i;
                }
            }
        }

        return allTestPlayInfos[bestTestPlay];
    }



    const play = () => {
        


        human.addMarks();


        const bestPlayInfo = minimax(gameBoard.getBoardList(), aiMark);

        gameBoard.addElementToBoardList(aiMark, bestPlayInfo.index);

        displayController.render();


    }

    return {play}
}();



game.play();

console.log(gameBoard.getBoardList())




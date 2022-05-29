const gameBoard = function(){

    let boardList = ['', '', '', '', '', '', '', ''];

    return {boardList};
}();

const displayController = function() {

    const {boardList} = gameBoard;

    const points = document.querySelectorAll('div.box');

    const render = function(){

        points.forEach((point,index) => point.addEventListener('click', (event) => {
            
            event.target.innerText = boardList[index];
        }))
    }

    return {render};
}();

const Player = (name) => {

    const points = document.querySelectorAll('div.box');

    const boardList = gameBoard;

    return {name, points, boardList};
}

const Human = (name) => {

    const boardList = Player(name).boardList;

    const points = Player(name).points;

    const buttonX = document.querySelector('aside .marks button:nth-child(1)');

    const buttonO = document.querySelector('aside .marks button:nth-child(2)');

    const restartButton = document.querySelector('aside > button')

    restartButton.addEventListener('click', () => {

        location.reload();
    })

    function setMark(value){
        mark = value;
        addMarks();
    }

    let mark = "";

    buttonX.addEventListener('click', setMark("X"))

    buttonO.addEventListener('click', setMark("O"))

    function addMarks(){

        points.forEach((point, index) => point.addEventListener('click', () => {

            mark = boardList[index];
        }))
    }

    return {addMarks}
}

const Computer = () => {

    const {boardList} = Player("Computer").boardList;

    const {points} = Player("Computer").points;

}

const human = Human('Bob');

const computer = Computer();

human.addMarks();

displayController.render();

const gameBoard = function(){

    let boardList = ['', '', '', '', '', '', '', ''];

    const points = document.querySelectorAll('div.box');

    function addElementToList(mark, index){

        boardList[index] = mark;
    }

    function getList(){
        return points;
    }

    const getElementAtIndex = function(index){
        return boardList[index];
    }

    return {addElementToList, getList, getElementAtIndex};
}();

const displayController = function() {

    const render = function(){

        gameBoard.getList().forEach((point,index) => point.addEventListener('click', (event) => {

            event.target.innerText = gameBoard.getElementAtIndex(index);
        }))
    }

    return {render};
}();

const Player = (name) => {

    return {name};
}

const Human = (name) => {

    const humanName = Player(name);

    const buttonX = document.querySelector('aside .marks button:nth-child(1)');

    const buttonO = document.querySelector('aside .marks button:nth-child(2)');

    const restartButton = document.querySelector('aside > button')

    let mark = "";

    restartButton.addEventListener('click', () => {

        location.reload();
    })

    function setMark(value){
        mark = value;
    }

    buttonO.addEventListener('click', setMark("O"))

    buttonX.addEventListener('click', setMark("X"))

    function addMarks(){

        gameBoard.getList().forEach((point, index) => point.addEventListener('click', () => {

            gameBoard.addElementToList(mark, index);
        }))
    }

    return {addMarks}
}

const Computer = () => {

    const {name} = Player("Computer");
}

const human = Human('Bob');

const computer = Computer();

human.addMarks();

displayController.render();

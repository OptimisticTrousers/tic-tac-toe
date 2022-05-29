const gameBoard = function(){

    let boardList = ['', '', '', '', '', '', '', ''];

    const points = document.querySelectorAll('div.box');

    function addElementToList(mark, index){

        boardList[index] = mark;
    }

    function getPoints(){
        return points;
    }

    return {setList, getPoints};
}();

const displayController = function() {

    const render = function(){

        points.forEach((point,index) => point.addEventListener('click', (event) => {

            gameBoard.addElementToList(event.target.innerText, index);
        }))
    }

    return {render};
}();

const Player = (name) => {

    return {name};
}

const Human = (name) => {

    const {name} = Player(name);

    const buttonX = document.querySelector('aside .marks button:nth-child(1)');

    const buttonO = document.querySelector('aside .marks button:nth-child(2)');

    const restartButton = document.querySelector('aside > button')

    let mark = "";

    restartButton.addEventListener('click', () => {

        location.reload();
    })

    function setMark(value){
        mark = value;
        addMarks();
    }

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

    const {name} = Player("Computer");
}

const human = Human('Bob');

const computer = Computer();

human.addMarks();

displayController.render();

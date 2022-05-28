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

const playerFactory = (name) => {

    const {boardList} = gameBoard;

    const buttonX = document.querySelector('aside > button:nth-child(1)');

    const buttonO = document.querySelector('aside > button:nth-child(2)');

    let mark = "";

    const points = document.querySelectorAll('div.box');

    buttonX.addEventListener('click', () => {

        mark = "X";
        console.log('bob jones')
    })
    buttonO.addEventListener('click', () => {

        mark = "O";
    })

    const addMarks = function(){

        points.forEach((point, index) => point.addEventListener('click', () => {

            mark = boardList[index];
        }))

    }

    return { name, addMarks }
}

const player = playerFactory('Bob');

player.addMarks();

const computer = playerFactory('Computer');

displayController.render();
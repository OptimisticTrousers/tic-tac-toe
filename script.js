const gameBoard = function(){
    let boardList = ['X', 'O', '', '', '', '', '', ''];

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

    const addMarks = () => console.log('do stuff');

    return { name }
}

const player = playerFactory('Bob');

const computer = playerFactory('Computer');

displayController.render();
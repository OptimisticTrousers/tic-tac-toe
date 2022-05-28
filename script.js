const gameBoard = function(){
    let boardList = ['X', 'O', '', '', '', '', '', ''];

    return {boardList};
}();

const displayController = function() {

    const {boardList} = gameBoard;

    const render = function(){

        const points = document.querySelectorAll('div.box');

        points.forEach((point,index) => point.addEventListener('click', (event) => {

            
            event.target.innerText = boardList[index];
            console.log(event);

        }))

    }

    return {render: render};

}();

const playerFactory = (name) => {

    const {boardList} = gameBoard;

    const addMarks = () => console.log('do stuff');

    return { name }
}

const player = playerFactory('Bob');

const computer = playerFactory('Computer');

displayController.render();
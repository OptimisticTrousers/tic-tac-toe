const gameBoard = function(){
    let boardList = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O'];
    let gameOver = false;

    const render = function(){

        const points = document.querySelectorAll('div.box');

        points.forEach(point => point.addEventListener('click', pointClick))

        const pointClick = function(){
            this.textContent = "bob";
        }
    }

}();

const displayController = function() {

}();

const playerFactory = (name) => {
    const move = () => {};

    return { name, move}
}

const player = playerFactory('Bob');

const computer = playerFactory('Computer');
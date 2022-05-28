const gameBoard = function(){
    let boardList = ['', '', '', '', '', '', '', ''];

    return {boardList};
}();

const displayController = function() {

    const render = function(){

        const points = document.querySelectorAll('div.box');

        points.forEach(point => point.addEventListener('click', pointClick))

        function pointClick(){
            this.textContent = "Bob";
        }
    }

}();

const playerFactory = (name) => {

    const addMarks = () => console.log('do stuff');

    return { name, move }
}

const player = playerFactory('Bob');

const computer = playerFactory('Computer');

gameBoard.render();
const container = document.querySelector('.main_container');
const numberCells = [36, 49, 81, 100, 144];
const playButton = document.querySelector('header button');
const numberBombs = 16;
let listBombs = [];

playButton.addEventListener('click', function(){
  container.innerHTML = ""
  listBombs = [];
  const difficulty = document.querySelector('header select').value;
  createGrid(numberCells[difficulty]);
  playButton.innerHTML = "New game"
})

function createGrid(numberCells){
  for(let i = 0; i < numberCells; i++){
    container.append(createCell(numberCells, i+1));
  }
  cellsCollection = document.getElementsByClassName('box');
  createBombs(cellsCollection);
}

function createCell(numberCells, index){
  const box = document.createElement('div');
  box.classList.add('box');
  box.style.width = 'calc(100% / ' + Math.sqrt(numberCells) + ')';
  box.style.height = 'calc(100% / ' + Math.sqrt(numberCells) + ')';
  box.boxId = index;
  box.bombFlag = 0;
  box.innerHTML = box.boxId;
  box.addEventListener('click', clickedBox);
  return box;
}

function clickedBox(){
  console.log(this.innerHTML);
  this.classList.add('active');
}

function createBombs(cellsCollection){
  let rnd;
  while (listBombs.length<numberBombs) {
    rnd = Math.floor(Math.random()*cellsCollection.length);
    if (!listBombs.includes(rnd)) {
      listBombs.push(rnd);
      cellsCollection[rnd].bombFlag = 1;
    }
  }
}
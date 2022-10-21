const container = document.querySelector('.main_container');
const numberCells = [36, 49, 81, 100, 144];
const playButton = document.querySelector('header button');
const numberBombs = 6;
let listBombs = [];
let score = 0;
const output = document.getElementById('output');

playButton.addEventListener('click', function(){
  container.innerHTML = "";
  listBombs = [];
  score = 0;
  output.innerHTML = "";
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
  if(this.bombFlag){
    this.classList.add('bomb');
    this.innerHTML = `<i class="fa-solid fa-bomb"></i>`;
  } else{
    this.classList.add('clicked');
    this.innerHTML = '';
    score++;
  }
  cellsCollection = document.getElementsByClassName('box');
  if(this.bombFlag || score == (cellsCollection.length - numberBombs)) endGame(score, cellsCollection);
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
  console.log(listBombs);
}

function endGame(score, cellsCollection){
  const tot = cellsCollection.length - numberBombs;
  if (score == tot){
    output.innerHTML = `Complimenti hai vinto! Hai totalizzato ${score} / ${tot}!`;
  } else {
    output.innerHTML = `Hai perso! Hai totalizzato ${score} / ${tot}`;
  }
  // Block the grid
  for (let i = 0; i < cellsCollection.length; i++){
    cellsCollection[i].removeEventListener('click', clickedBox);
  }
}
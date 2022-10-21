const container = document.querySelector('.main_container');
const numberCells = [36, 49, 81, 100, 144];
const playButton = document.querySelector('header button');
const numberBombs = 10;
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

  // Per ogni elemento della listbombs che contiene gli indici delle celle con una bomba
  // Richiamo la funzione checkForNearbyBombs e passo come 'this' cellsCollection
  listBombs.forEach(checkForNearbyBombs, cellsCollection);
}

function createCell(numberCells, index){
  const box = document.createElement('div');
  box.classList.add('box');
  box.style.width = 'calc(100% / ' + Math.sqrt(numberCells) + ')';
  box.style.height = 'calc(100% / ' + Math.sqrt(numberCells) + ')';
  box.boxId = index;
  box.bombFlag = 0;
  box.bombsNearby = 0;
  box.alreadyClicked = 0;
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
    this.innerHTML = this.bombsNearby;
    if (!(this.alreadyClicked)){
      score++;
      this.alreadyClicked = 1;
    }
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
  // HACK
  // console.log(listBombs);
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
    if (listBombs.includes(i)){
      cellsCollection[i].classList.add('bomb');
      cellsCollection[i].innerHTML = `<i class="fa-solid fa-bomb"></i>`;
    }
  }
}

function checkForNearbyBombs(value){
  const difficulty = document.querySelector('header select').value;
  const cellsPerRow = Math.sqrt(numberCells[difficulty]);
  // Controlla se la cella SOPRA a quella della bomba esiste, se esiste incrementa il contatore di bombe vicine
  if(this[value-cellsPerRow]) this[value-cellsPerRow].bombsNearby += 1;
  // Controlla se la cella SOTTO a quella della bomba esiste, se esiste incrementa il contatore di bombe vicine
  if(this[value+cellsPerRow]) this[value+cellsPerRow].bombsNearby += 1;
  
  // Controlla se la cella con la bomba è nell'ultima colonna, se lo è non fare i seguenti calcoli
  if((value+1)%cellsPerRow){
    // Incrementa il contatore delle celle a destra, sotto-destra, sopra-destra rispetto alla bomba
    if(this[value+1]) this[value+1].bombsNearby += 1;
    if(this[value+cellsPerRow+1]) this[value+cellsPerRow+1].bombsNearby += 1;
    if(this[value-cellsPerRow+1]) this[value-cellsPerRow+1].bombsNearby += 1;
  } 
  
  // Controlla se la cella con la bomba è nella prima colonna, se lo è non fare i seguenti calcoli
  if((value+1)%cellsPerRow != 1){
    // Incrementa il contatore delle celle a screenX, sotto-sinistra, sopra-sinistra rispetto alla bomba
    if(this[value-1]) this[value-1].bombsNearby += 1;
    if(this[value+cellsPerRow-1]) this[value+cellsPerRow-1].bombsNearby += 1;
    if(this[value-cellsPerRow-1]) this[value-cellsPerRow-1].bombsNearby += 1;
  }

}
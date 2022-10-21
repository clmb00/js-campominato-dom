const container = document.querySelector('.main_container');
const numberRows = [5, 7, 9, 10, 12];
const playButton = document.querySelector('header button');

playButton.addEventListener('click', function(){
  container.innerHTML = ""
  const difficulty = document.querySelector('header select').value;
  createGrid(numberRows[difficulty]);
  playButton.innerHTML = "New game"
})

function createGrid(numberRows){
  for(let i = 0; i < Math.pow(numberRows, 2); i++){
    container.append(createCell(numberRows, i+1));
  }
}

function createCell(numberRows, index){
  const box = document.createElement('div');
  box.classList.add('box');
  box.style.width = 'calc(100% / ' + numberRows + ')';
  box.style.height = 'calc(100% / ' + numberRows + ')';
  box.innerHTML = index;
  box.addEventListener('click', clickedBox);
  return box;
}

function clickedBox(){
  console.log(this.innerHTML);
  this.classList.add('active');
}
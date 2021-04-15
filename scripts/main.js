const beep = new Audio('./audio/beep.wav');
const main = document.querySelector('.main');

function playBeep() {
  beep.currentTime = 0;
  beep.playbackRate = 3.2;
  beep.preload = 'auto';
  beep.play();
}

function clearScreen() {
  main.innerHTML = '';
}

function addButton(text, func) {
  let button = document.createElement('button');
  button.innerHTML = text;
  button.onclick = func;
  button.addEventListener("mouseenter", playBeep);
  button.addEventListener("focus", playBeep);
  main.appendChild(button);
}

function homepage() {
  clearScreen();
  let div = document.createElement('div');
  div.classList.add('title');
  let h1 = document.createElement('h1');
  h1.innerHTML = "Survive Audio Game";
  div.appendChild(h1);
  main.appendChild(div);
  addButton('iniciar jogo', startGame);
  addButton('sobre o jogo', aboutGame);
}

function aboutGame() {
  clearScreen();
  let about = 'Esse jogo foi desenvolvido para o projeto final da disciplina de Introdução à Multimídia do Centro de Informática (UFPE) no semestre 2020.1.';
  main.innerHTML = '<div class="about"><p>' + about + '</p></div>';
  addButton('voltar', homepage);
}

function startGame() {
  clearScreen();
}

homepage();
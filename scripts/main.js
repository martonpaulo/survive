const main = document.querySelector('.main');

const sounds = {
  'click': new Audio('./audio/click.wav'),
  'drums': new Audio('./audio/drums.wav'),
  'music': new Audio('./audio/music.mp3'),
  'flowStart': new Audio('./audio/0.wav'),
};

let flowData = '';


function playClick() {
  sounds['click'].play();
}

function clearScreen() {
  main.innerHTML = '';
}

function loadJSON(callback) {   
  let xObj = new XMLHttpRequest();
  xObj.overrideMimeType("application/json");
  xObj.open('GET', './data/flow.json', true);
  xObj.onreadystatechange = function () {
    if (xObj.readyState == 4 && xObj.status == "200") {
      callback(xObj.responseText);
      if (flowData === '') flowData = xObj.responseText;  
    }
  };
  xObj.send(null);
}



function addButton(text, func) {
  const button = document.createElement('button');
  button.innerHTML = text;
  button.onclick = func;
  button.addEventListener("mouseenter", playClick);
  button.addEventListener("focus", playClick);
  main.appendChild(button);
}

function addFlowButton(text, id) {
  const button = '<button onclick="flow(' + id + ')" onmouseover="playClick()" onfocus="playClick()">' + text + '</button>';
  main.innerHTML += button;
}

function addText(text) {
  const div = document.createElement('div');
  div.classList.add('text');

  const p = document.createElement('p');
  p.innerHTML = text;
  
  div.appendChild(p);
  main.appendChild(div);
}



function firstLoad() {
  loadJSON(function(response) {
    JSON.parse(response);
  });

  loadHomepage();
}

function loadHomepage() {
  clearScreen();

  const div = document.createElement('div');
  div.classList.add('title');
  const h1 = document.createElement('h1');
  h1.innerHTML = "Survive";
  const h5 = document.createElement('h5');
  h5.innerHTML = "Audio Game";
  
  div.appendChild(h1);
  div.appendChild(h5);
  main.appendChild(div);

  addButton('iniciar jogo', startGame);
  addButton('sobre o jogo', loadAboutGamePage);
}

function loadAboutGamePage() {
  clearScreen();
  const about = 'Este jogo foi desenvolvido para o projeto final da disciplina de Introdução à Multimídia do Centro de Informática (UFPE) no semestre 2020.1.';
  addText(about);
  addButton('voltar', loadHomepage);
}

function startGame() {
  clearScreen();
  
  sounds['music'].pause();
  sounds['music'].currentTime = 0;
  //sounds['flowStart'].play();

  flowData = JSON.parse(flowData);

  flow(0);
}

function flow(id) {
  clearScreen();
  
  const sound = new Audio('./audio/' + flowData[id].audio);
  sound.play();
  
  addText(flowData[id].text);

  for (const option of flowData[id].options)
    addFlowButton(option.text, option.goTo);
}



sounds['music'].play();
firstLoad();
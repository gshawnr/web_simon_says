// global vars
let currentLevel = 1;
let positionIndex = 0;
let currentSequence = [];

$(document).ready(() => {
  $(document).keypress(() => start());
});

/*
  onload func
    add event listener for any key to start
    callback to:
      hide text
      call start func
*/

/*
  Start game func
*/
const start = (key) => {
  $(document).unbind("keypress");
  showLevel();
  currentSequence.push(generateButton());
  $(".btn").click((e) => btnClickHandler(e));
  runSequence();

  // generate first ele of sequence
  // set onclick listener
};

const btnClickHandler = (event) => {
  const btnId = event.target.id;

  // is the selection valid
  let valid = isValidClick(btnId);

  if (valid) {
    showSelected(btnId);
    setTimeout(() => {}, 1000);
    currentSequence.push(generateButton());
    if (positionIndex === 0) runSequence();
  } else end();
};

const runSequence = () => {
  console.log("current sequence", currentSequence);
  for (let i = 0; i < currentSequence.length; i++) {
    showSelected(currentSequence[i]);
  }
};

const showLevel = () => {
  $("#level-title").text(`Level ${currentLevel}`);
};

const isValidClick = (btnId) => {
  const valid = currentSequence[positionIndex] === btnId;
  positionIndex =
    positionIndex === currentSequence.length - 1 ? 0 : positionIndex++;

  console.log("posIndex", positionIndex);

  return valid;
};

/*
  generate random button fnc
*/
const generateButton = () => {
  const btns = ["red", "blue", "green", "yellow"];

  const number = randomNum();
  const button = btns[number];

  console.log("random button", button);
  return button;
};

const randomNum = () => {
  const number = Math.floor(Math.random() * 4);
  console.log("random generated number", number);
  return number;
};

/*
  end game func
  set listener to start game
*/
const end = () => {
  const audio = new Audio(`./sounds/wrong.mp3`);
  audio.play();
  $("#level-title").text("Game Over - Press Any Key to Start");
  $(".btn").unbind("click");
  currentSequence = [];
  $(document).keypress(() => start());
};

const playSound = (btnId) => {
  const audio = new Audio(`./sounds/${btnId}.mp3`);
  audio.play();
};
const showSelected = (btnId) => {
  const audio = new Audio(`./sounds/${btnId}.mp3`);
  audio.play();
  const selector = "#" + btnId;
  $(selector).addClass("pressed");

  setTimeout(() => {
    $(selector).removeClass("pressed");
  }, 150);
};

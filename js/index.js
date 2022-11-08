// declare global vars
let level;
let newSequence;
let seqIndex;
let sequence;

// load game
$(document).ready(() => loadGame());

const loadGame = () => {
  $(document).keydown(() => start());
};

const start = async (key) => {
  // initialze globals
  level = 1;
  newSequence = false;
  seqIndex = 0;
  sequence = [];

  updateLevel(level);

  // update event handlers
  $(document).unbind("keydown");
  $(".btn").click((e) => btnClickHandler(e));

  // add initial sequence on start
  sequence.push(generateButton());

  await playSequence();
};

const btnClickHandler = async (event) => {
  const btnId = event.target.id;
  let valid = isValidClick(btnId);

  if (valid) {
    playSound(btnId);
    showSelected(btnId);
    if (newSequence) await playSequence();
  } else {
    playSound("wrong");
    showSelected(btnId);
    end();
  }
};

const playSequence = async () => {
  // add start delay to allow players to prepare
  setTimeout(async () => {
    for (let i = 0; i < sequence.length; i++) {
      // slow execution of the loop for UX purposes
      await sleep(700);
      playSound(sequence[i]);
      showSelected(sequence[i]);
    }
  }, 700);
};

const isValidClick = (btnId) => {
  const isValid = sequence[seqIndex] === btnId;
  const isEndOfSequence = seqIndex === sequence.length - 1;

  if (isEndOfSequence) {
    const sequenceLength = ++sequence.length;
    seqIndex = 0;
    updateLevel(++level);
    generateSequence(sequenceLength);
    newSequence = true;
  } else {
    seqIndex++;
    newSequence = false;
  }

  return isValid;
};

const end = () => {
  $(".btn").unbind("click");
  $("#level-title").text("Game Over - Press Any Key to Start");

  // flash red screen
  $("body").addClass("red");
  setTimeout(() => {
    $("body").removeClass("red");
  }, 150);

  loadGame();
};

// HELPER FUNCS
const generateButton = () => {
  const btns = ["red", "blue", "green", "yellow"];
  const number = Math.floor(Math.random() * 4);
  const button = btns[number];
  return button;
};

const generateSequence = (length) => {
  const arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(generateButton());
  }
  sequence = arr;
};

const playSound = (btnId) => {
  const audio = new Audio(`./sounds/${btnId}.mp3`);
  audio.play();
};

const updateLevel = (newLevel) => {
  $("#level-title").text(`Level ${newLevel}`);
};

const showSelected = (btnId) => {
  $(`#${btnId}`).addClass("pressed");
  // remove selection after delay
  setTimeout(() => {
    $(`#${btnId}`).removeClass("pressed");
  }, 150);
};

const sleep = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

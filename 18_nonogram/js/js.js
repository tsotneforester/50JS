//   ,@▒▒╜  ╣▒║╖     ▄▓█████  ▐██████▄ ▐██▌  ██▓       ▄█████▌  ███████
// ╓╣▒▒╜ @╝╣╖`╢▒▒╗   ███      ▐██▌ ███  █▓█▄███▀      ▐██▌      ███▌
// ╢▒▒╖  ╢╗@╝  ╢▒▒╝  ███  ███ ▐███████  ▄▓█▓▓█▄       ▐██▌ ▐██▌ ██████
//  ╙╢▒╢╖ ║╜,╢▒▒╝    ███▄▄███ ▐██▌     ▐██▌ ▐███  ███ ▐███▄███▌ ███▄▄▄▄
//    `╢▒╜  ╣▒╜       ▀▀▀▀▀▀▀  ▀▀      ▀▀▀   ▀▀▀  ▀▀▀   ▀▀▀▀▀▀  ▀▀▀▀▀▀▀
"use strict";

const DATA = {
  d001: {
    puzzleDemensions: [10, 10], //x, y
    hintDemensions: [2, 2], //x, y
    horizontalHints: [
      ["", "2", "3", "5", "7", "", "5", "3", "2", ""],
      ["1", "1", "2", "2", "2", "3", "2", "2", "1", "1"],
    ],
    verticalHints: [
      ["", "1"],
      ["", "2"],
      ["2", "1"],
      ["2", "1"],
      ["3", "2"],
      ["4", "3"],
      ["5", "4"],
      ["", "1"],
      ["", "8"],
      ["", "6"],
    ],

    solution: ["", "", "", "", "t", "", "", "", "", "", "", "", "", "", "t", "", "", "", "", "", "", "", "", "t", "t", "", "t", "", "", "", "", "", "", "t", "t", "", "t", "", "", "", "", "", "t", "t", "t", "", "t", "t", "", "", "", "t", "t", "t", "t", "", "t", "t", "t", "", "t", "t", "t", "t", "t", "", "t", "t", "t", "t", "", "", "", "", "", "t", "", "", "", "", "", "t", "t", "t", "t", "t", "t", "t", "t", "", "", "", "t", "t", "t", "t", "t", "t", "", ""],
  },
};

let body = document.getElementsByTagName("body");

let solved = document.querySelector(`.solved`);
let footer = document.querySelector(`footer`);

let check = document.querySelector(`check`);
let clear = document.querySelector(`clear`);

let puzzle = document.querySelector(`main`);
let puzzle_id = puzzle.dataset.puzzle;
let solution = DATA[puzzle_id].solution;

let mychart = document.querySelectorAll(".chart");
let myhint = document.querySelectorAll(".hint");
let chart_length = mychart.length;
let hint_length = myhint.length;
let isToggling1 = false;
let isToggling2 = false;
let isToggling3 = false;

//----------------------------------------------------

function clear_board() {
  console.log("clear board");
  for (let i = 0; i < chart_length; i++) {
    mychart[i].classList.remove("blackbox");
    mychart[i].classList.remove("crossbox");
    mychart[i].classList.add("whitebox");
  }
  for (let i = 0; i < hint_length; i++) {
    myhint[i].classList.remove("hint_done");
  }
  clear_check();
  solved.innerHTML = "";
}

function hint_click_effect(e) {
  e.target.classList.toggle("hint_done");
}

function clear_check() {
  for (let i = 0; i < chart_length; i++) {
    mychart[i].classList.remove("checkhint");
    mychart[i].classList.remove("wronghint");
  }
}

function continous_effect(e) {
  if (isToggling1) {
    e.target.classList.remove("crossbox");
    e.target.classList.remove("whitebox");
    e.target.classList.add("blackbox");
  }

  if (isToggling2) {
    e.target.classList.remove("whitebox");
    e.target.classList.remove("blackbox");
    e.target.classList.add("crossbox");
  }

  if (isToggling3) {
    e.target.classList.remove("blackbox");
    e.target.classList.remove("crossbox");
    e.target.classList.add("whitebox");
  }
}

function click_effect(e) {
  clear_check();
  if (e.target.classList.contains("whitebox")) {
    e.target.classList.remove("crossbox");
    e.target.classList.remove("whitebox");
    e.target.classList.add("blackbox");
    isToggling1 = true;
  } else if (e.target.classList.contains("blackbox")) {
    e.target.classList.remove("whitebox");
    e.target.classList.remove("blackbox");
    e.target.classList.add("crossbox");
    isToggling2 = true;
  } else if (e.target.classList.contains("crossbox")) {
    e.target.classList.remove("blackbox");
    e.target.classList.remove("crossbox");
    e.target.classList.add("whitebox");
    isToggling3 = true;
  }
}

function disable_continous() {
  isToggling1 = false;
  isToggling2 = false;
  isToggling3 = false;
}

function check_progress() {
  let current_progress = [];
  for (let i = 0; i < chart_length; i++) {
    if (mychart[i].classList.contains("blackbox")) {
      current_progress.push("t");
    } else {
      current_progress.push("");
    }

    if (mychart[i].classList.contains("blackbox")) {
      if (solution[i] == current_progress[i]) {
        mychart[i].classList.add("checkhint");
      }
      if (solution[i] != current_progress[i]) {
        mychart[i].classList.add("wronghint");
      }
    }
  }
}

function solve_status() {
  let current_progress1 = [];
  for (let i = 0; i < chart_length; i++) {
    if (mychart[i].classList.contains("blackbox")) {
      current_progress1.push("t");
    } else {
      current_progress1.push("");
    }
  }
  if (solution.join("|").trim() === current_progress1.join("|").trim()) {
    solved.innerHTML = "Solved";
    console.log("object");
    for (let i = 0; i < chart_length; i++) {
      mychart[i].classList.remove("crossbox");
    }
    check.remove();
    clear.remove();
  } else {
    check_progress();
  }
}

function startGame() {
  for (let i = 0; i < chart_length; i++) {
    mychart[i].onmousedown = click_effect;
    mychart[i].onmouseenter = continous_effect;
    body[0].onmouseup = disable_continous;
  }

  for (let i = 0; i < hint_length; i++) {
    myhint[i].onclick = hint_click_effect;
  }

  footer.children[0].onclick = check_progress;
  footer.children[0].onclick = solve_status;
  footer.children[1].onclick = clear_board;
}
startGame();

const body = document.querySelector("body");
const bigctn = document.querySelector(".bigCtn");
const smlCtns = document.querySelectorAll("div.smlCtn");
const spans = document.querySelectorAll(".smlCtn span");
const btnDiv = document.querySelector(".btnDiv");
const btnO = document.getElementById("btnO");
const btnX = document.getElementById("btnX");
const restartBtn = document.getElementById("restartBtn");
const resetBtn = document.getElementById("resetBtn");
const msgDiv = document.querySelector(".msgDiv");
const closeIcon = document.querySelector("i.closeIcon");
const onloadDiv = document.createElement("div");
const playerName1 = document.getElementById("player1");
const playerName2 = document.getElementById("player2");

let turn = true;
let choose = false;
let turntimes = 0;
let win = false;
let play1 = document.querySelector("span.p1");
let play2 = document.querySelector("span.p2");
let scoreP1 = 0;
let scoreP2 = 0;
let P1Type; // global variable for the playtype for later to sense who is the first player
//to check if the user has chosen X or O

onload();

function onload() {
  const form = document.createElement("form");
  const label1 = document.createElement("label");
  label1.textContent = "Player1: ";
  const p1Input = document.createElement("input");
  label1.appendChild(p1Input);
  form.appendChild(label1);
  const label2 = document.createElement("label");
  label2.textContent = "Player2: ";
  const p2Input = document.createElement("input");
  label2.appendChild(p2Input);
  form.appendChild(label2);
  const sendBtn = document.createElement("button");
  sendBtn.textContent = "Combate!";
  form.appendChild(sendBtn);
  body.appendChild(form);
  sendBtn.addEventListener("click", function(e) {
    let value1 = p1Input.value;
    let value2 = p2Input.value;
    e.stopPropagation();
    if (value1 !== "" && value2 !== "") {
      playerName1.textContent = value1;
      playerName2.textContent = value2;
    }
    body.removeChild(form);
  });
}

bigctn.addEventListener("click", checkchoose);

function checkchoose() {
  if (choose === false) {
    closeIcon.style.display = "block";
    msgDiv.setAttribute(
      "style",
      "display: block; font-size: 1.8rem; padding: 15px;"
    );
    msgDiv.firstChild.textContent =
      playerName1.textContent + ", Please Choose O or X";
  }

  closeIcon.addEventListener("click", function(e) {
    e.stopPropagation(); //bubbling happens because closeIcon is in the msgDiv that's why we nedd to stopPropagation to make the function stop
    //console.log(e.target);
    closeIcon.style.display = "none";
    msgDiv.style.display = "none";
  });
}

function onStartClick(e) {
  if (this.id === "btnO") {
    for (let smlCtn of smlCtns) {
      smlCtn.addEventListener("click", startWithO);
    }
  } else {
    for (let smlCtn of smlCtns) {
      smlCtn.addEventListener("click", startWithX);
    }
  }
  choose = true;
}

btnX.addEventListener("click", onStartClick);
btnO.addEventListener("click", onStartClick);

function onStartClick(e) {
  // let otherBtn;
  if (this.id === "btnO") {
    //otherBtn = btnX;
    for (let smlCtn of smlCtns) {
      smlCtn.addEventListener("click", startWithO);
    }
  } else {
    // otherBtn = btnO;
    for (let smlCtn of smlCtns) {
      smlCtn.addEventListener("click", startWithX);
    }
  }

  btnX.style.display = "none";
  btnO.style.display = "none";
  // this.style.display ="none";
  // otherBtn.style.display = "none";
  choose = true;
}

//  because we merge two functions with same concept but addeventListener to different btns so when user refresh, we must remove the eventListener otherwise
// when the user click on the other button on the second time, the other btn's function will not be triggered because the first btn has triggered the function so we must remove the first btn's event to make the event to happen on the second time
function startWithO(e) {
  startWith("O", e);
}
function startWithX(e) {
  startWith("X", e);
}

// to set the O or X to a parameter as type so let the function control the type
function startWith(type, e) {
  let otherType;
  if (type === "X") {
    otherType = "O";
  } else {
    otherType = "X";
  }

  P1Type = type; // because when user choose O or X, the one who choose is the first player so we know the type chosen by the firstplayer is the same type we set here

  P2Type = otherType;

  if (choose === false) {
    return;
  } else {
    if (e.target.firstChild.textContent !== "") {
      return;
    } else if (e.target.firstChild.textContent === "" && turn === true) {
      e.target.firstChild.textContent = type;
      e.target.firstChild.setAttribute("class", "anima");
      turn = false;
      turntimes++;
      findWinner();
    } else {
      e.target.firstChild.textContent = otherType;
      e.target.firstChild.setAttribute("class", "anima");
      turn = true;
      turntimes++;
      findWinner();
    }
  }
}

// this btn is to refresh the window and reset everything so the score will not continue counting
resetBtn.addEventListener("click", function() {
  // alert("this will reset score to 0, are you sure?");
  location.reload();
});

// this btn is to clear the game board but not to reset everything so the score will continue counting if users play again
restartBtn.addEventListener("click", clearAll);

function clearAll(e) {
  for (let span of spans) {
    span.textContent = "";
  }
  turn = true;
  choose = false;
  turntimes = 0;
  win = false;
  btnO.style.display = "inline";
  btnX.style.display = "inline";
  for (let smlCtn of smlCtns) {
    smlCtn.removeEventListener("click", startWithX);
    smlCtn.removeEventListener("click", startWithO);
  }

  msgDiv.style.display = "none";
  msgDiv.firstChild.textContent = "";

  // to remove the animation when restart, because the animation only occurs when the class is added so it must be reAdded everytime to the element
  for (let el of document.querySelectorAll(".anima")) {
    el.classList.remove("anima");
  }
}

// find winner and accumulate players' score
function findWinner() {
  let xWon = checkIfWinner("X");
  let oWon = checkIfWinner("O");
  if (xWon) {
    //console.log("X WON");
    if (P1Type === "X") {
      scoreP1++;
      showMsg(playerName1.textContent, xWon);
    } else {
      scoreP2++;
      showMsg(playerName2.textContent, xWon);
    }

    decoEmptyBox(xWon);
  } else if (oWon) {
    if (P1Type === "O") {
      showMsg(playerName1.textContent, oWon);
      scoreP1++;
    } else {
      showMsg(playerName2.textContent, oWon);
      scoreP2++;
    }
    //console.log("O WON");

    decoEmptyBox(oWon);
  } else if (turntimes === 9) {
    //console.log("DRAW");
    let result = false;
    showMsg("", result);
  }

  play1.textContent = scoreP1;
  play2.textContent = scoreP2;
}

// check who is the winner
function checkIfWinner(type) {
  console.log("check");
  let boxes = document.querySelectorAll(".smlCtn span");
  let winCases = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
  ];

  for (let i = 0; i < winCases.length; i++) {
    let winCase = winCases[i];
    let win = true; // this must be in loop in this case otherwise this will not work
    for (let index of winCase) {
      if (boxes[index].textContent !== type) {
        win = false;
        break;
      }
    }
    if (win) return true;
  }
  return false;
}

// to stop users next movement once there is a won result
//so we loop through the array of span to find the empty boxes
function decoEmptyBox(result) {
  if (result === true) {
    let emptyboxs = Array.from(spans).filter(span => span.textContent === "");
    console.log(emptyboxs);
    for (let emptybox of emptyboxs) {
      emptybox.parentElement.removeEventListener("click", startWithX);
      emptybox.parentElement.removeEventListener("click", startWithO);
    }
  }
}

// to control the popup message for the game result
function showMsg(playerName, result) {
  if (
    (turntimes >= 4 && result === true) ||
    (turntimes === 9 && result === true)
  ) {
    msgDiv.firstChild.textContent = playerName + " won";
  } else if (result === false) {
    msgDiv.firstChild.textContent = "draw";
  }
  msgDiv.style.display = "block";
  msgDiv.style.fontSize = "3.5rem";
}

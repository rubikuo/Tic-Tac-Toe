const bigctn = document.querySelector(".bigCtn");
const smlCtns = document.querySelectorAll("div.smlCtn");
const spans = document.querySelectorAll(".smlCtn span");
const btnO = document.getElementById("btnO");
const btnX = document.getElementById("btnX");
const restartBtn = document.getElementById("restartBtn");
const resetBtn = document.getElementById("resetBtn");
const msgDiv = document.querySelector(".msgDiv");

let turn = true;
let choose = false;
let turntimes = 0;
let win = false;
let play1 = document.querySelector(".p1");
let play2 = document.querySelector(".p2");
let scoreP1 = 0;
let scoreP2 = 0;
let P1Type; // global variable for the playtype for later to sense who is the first player

// to check if the user has chosen options
bigctn.addEventListener("click", checkchoose);

function checkchoose() {
  if (choose === false) {
    alert("first player please choose 'O' or 'X' ");
  }
}

btnX.addEventListener("click", onStartClick);
btnO.addEventListener("click", onStartClick);

function onStartClick(e) {
  let otherBtn;
  if (this.id === "btnO") {
    otherBtn = btnX;
    for (let smlCtn of smlCtns) {
      smlCtn.addEventListener("click", startWithO);
    }
  } else {
    otherBtn = btnO;
    for (let smlCtn of smlCtns) {
      smlCtn.addEventListener("click", startWithX);
    }
  }
  otherBtn.style.display = "none";
  choose = true;
}

//  because we merge two functions
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
  P1Type = type; // this is already determining the type for the first player
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

resetBtn.addEventListener("click", function(){
 // alert("this will reset score to 0, are you sure?");
  location.reload();
});

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

  // to remove the animation when reset because the transition only occurs when the class is added so it must be reAdded everytime to the element
  for (let el of document.querySelectorAll(".anima")) {
    el.classList.remove("anima");
  }
}

function findWinner() {
  let xWon = checkIfWinner("X");
  let oWon = checkIfWinner("O");
  if (xWon) {
    //console.log("X WON");
    if (P1Type === "X") {
      scoreP1++;
    } else {
      scoreP2++;
    }
    showMsg("X", xWon);
    decoEmptyBox(xWon);
  } else if (oWon) {
    if (P1Type === "O") {
      scoreP1++;
    } else {
      scoreP2++;
    }
    //console.log("O WON");
    showMsg("O", oWon);
    decoEmptyBox(oWon);
  } else if (turntimes === 9) {
    //console.log("DRAW");
    let result = false;
    showMsg("", result);
  }

  play1.textContent = scoreP1;
  play2.textContent = scoreP2;
}

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

function showMsg(type, result) {
  if (
    (turntimes >= 4 && result === true) ||
    (turntimes === 9 && result === true)
  ) {
    msgDiv.style.display = "block";
    msgDiv.firstChild.textContent = type + " won";
  } else if (result === false) {
    msgDiv.style.display = "block";
    msgDiv.firstChild.textContent = "draw";
  }
}



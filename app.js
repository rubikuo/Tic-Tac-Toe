const bigctn = document.querySelector(".bigCtn");
const smlCtns = document.querySelectorAll("div.smlCtn");
const spans = document.querySelectorAll(".smlCtn span");
const btnO = document.getElementById("btnO");
const btnX = document.getElementById("btnX");
const resetBtn = document.getElementById("resetBtn");

const box1 = document.getElementById("1").textContent;
const box2 = document.getElementById("2").textContent;
const box3 = document.getElementById("3").textContent;
const box4 = document.getElementById("4").textContent;
const box5 = document.getElementById("5").textContent;
const box6 = document.getElementById("6").textContent;
const box7 = document.getElementById("7").textContent;
const box8 = document.getElementById("8").textContent;
const box9 = document.getElementById("9").textContent;

let turn = true;
let choose = false;
let turntimes = 0;

bigctn.addEventListener("click", checkchoose);

function checkchoose() {
  if (choose === false) {
    alert("first player please choose 'O' or 'X' ");
  }
}

btnO.addEventListener("click", function() {
  btnX.style.display = "none";
  choose = true;
  for (let smlCtn of smlCtns) {
    smlCtn.addEventListener("click", startWithO);
  }
});

function startWithO(e) {
  if (choose === false) {
    return;
  } else {
    if (e.target.firstChild.textContent !== "") {
      return;
    } else if (e.target.firstChild.textContent === "" && turn === true) {
      e.target.firstChild.textContent = "O";
      turn = false;

      turntimes++;
    } else {
      e.target.firstChild.textContent = "X";
      turn = true;
      turntimes++;
      console.log("turnTimes:" + turntimes);
    }
  }
}

btnX.addEventListener("click", function(e) {
  btnO.style.display = "none";
  choose = true;
  for (let smlCtn of smlCtns) {
    smlCtn.addEventListener("click", startWithX);
  }
});

function startWithX(e) {
  if (choose === false) {
    return;
  } else {
    if (e.target.firstChild.textContent !== "") {
      return;
    } else if (e.target.firstChild.textContent === "" && turn === true) {
      e.target.firstChild.textContent = "X";
      turn = false;
      turntimes++;
    } else {
      e.target.firstChild.textContent = "O";
      turn = true;
      turntimes++;
    }
  }
}

resetBtn.addEventListener("click", clearAll);

function clearAll(e) {
  for (let span of spans) {
    span.textContent = "";
  }
  console.log(turntimes);
  turn = true;
  choose = false;
  turntimes = 0;
  btnO.style.display = "inline";
  btnX.style.display = "inline";
  for (let smlCtn of smlCtns) {
    smlCtn.removeEventListener("click", startWithX);
    smlCtn.removeEventListener("click", startWithO);
  }
}

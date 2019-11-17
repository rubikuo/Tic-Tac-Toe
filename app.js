const bigctn = document.querySelector(".bigCtn");
const smlCtns = document.querySelectorAll("div.smlCtn");
const spans = document.querySelectorAll(".smlCtn span");
const btnO = document.getElementById("btnO");
const btnX = document.getElementById("btnX");
const resetBtn = document.getElementById("resetBtn");

let turn = true;
let choose = false;
let turntimes = 0;
let win = false;

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
      findWinner();
      if (win === true) {
        console.log("ok");
        return;
      }
    } else {
      e.target.firstChild.textContent = "X";
      turn = true;
      turntimes++;
      findWinner();
      if (win === true) {
        console.log("ok");
        return;
      }
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
      findWinner();
      decoEmptyBox();
    } else {
      e.target.firstChild.textContent = "O";
      turn = true;
      turntimes++;
      findWinner();
      decoEmptyBox();
    }
  }
 
}

resetBtn.addEventListener("click", clearAll);

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
    //smlCtn.classList.remove("bkGrey");
  }
}

function findWinner() {
  let box1 = document.getElementById("one");
  let box2 = document.getElementById("two");
  let box3 = document.getElementById("three");
  let box4 = document.getElementById("four");
  let box5 = document.getElementById("five");
  let box6 = document.getElementById("six");
  let box7 = document.getElementById("seven");
  let box8 = document.getElementById("eight");
  let box9 = document.getElementById("nine");
  console.log(turntimes);
  if (turntimes >= 4 && turntimes < 9 && win === false) {
    if (
      box1.textContent !== "" &&
      box1.textContent === box2.textContent &&
      box1.textContent === box3.textContent
    ) {
      console.log("win");

      win = true;
      return;
    } else if (
      box4.textContent !== "" &&
      box4.textContent === box5.textContent &&
      box4.textContent === box6.textContent
    ) {
      console.log("win");
      win = true;
      return;
    } else if (
      box7.textContent !== "" &&
      box7.textContent === box8.textContent &&
      box7.textContent === box9.textContent
    ) {
      console.log("win");
      win = true;
      return;
    } else if (
      box1.textContent !== "" &&
      box1.textContent === box4.textContent &&
      box1.textContent === box7.textContent
    ) {
      console.log("win");
      win = true;
      return;
    } else if (
      box2.textContent !== "" &&
      box2.textContent === box5.textContent &&
      box2.textContent === box8.textContent
    ) {
      console.log("win");
      win = true;
      return;
    } else if (
      box3.textContent !== "" &&
      box3.textContent === box6.textContent &&
      box3.textContent === box9.textContent
    ) {
      console.log("win");
      win = true;
      return;
    } else if (
      box1.textContent !== "" &&
      box1.textContent === box5.textContent &&
      box1.textContent === box9.textContent
    ) {
      console.log("win");
      win = true;
      return;
    } else if (
      box3.textContent !== "" &&
      box3.textContent === box5.textContent &&
      box3.textContent === box7.textContent
    ) {
      console.log("win");
      win = true;
      return;
    } 
  }
}

function decoEmptyBox(){
  if (win === true) {
    let emptyboxs = Array.from(spans).filter(
      span => span.textContent === ""
    );
    console.log(emptyboxs);
    for (let emptybox of emptyboxs) {
      emptybox.parentElement.removeEventListener("click", startWithX);
     // emptybox.parentElement.classList.add("bkGrey");
    }
  }
}

function checkDraw(){
   if(turntimes ===9 && win === false){
     alert("draw");
   }

}
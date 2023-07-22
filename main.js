//start the game
let duration = 1000;
let wrongTriesNum = 0;
let myControl = document.querySelector(".controls span");
myControl.onclick = function () {
  let ControlDiv = document.querySelector(".controls");
  ControlDiv.classList.add("hide");

  // Delay the removal to allow the transition to complete
  setTimeout(function () {
    ControlDiv.remove();
  }, 500); // 500 milliseconds (0.5 seconds) matches the transition duration
};

// setTimeout(function () {
//     let face=document.querySelector(".face");
//     face.style.backfaceVisibility = "visible ";
//     console.log("dssd")
//   }, 2000);

// Select Blocks Container
let gameBlocksContainer = document.querySelector(".game-blocks-container");
let gameBlocks = document.querySelectorAll(
  ".game-blocks-container .game-block"
);

// Create Array From Game Blocks
let blocks = Array.from(gameBlocksContainer.children);

// Create Range Of Keys
let orderRange = [...Array(blocks.length).keys()];

// Add Order Css Property To Game Blocks
blocks.forEach((block, index) => {
  // Add CSS Order Property
  block.style.order = shuffleArray(orderRange)[index];

  // Add Click Event
  block.addEventListener("click", function () {
    // Trigger The Flip Block Function

    flipBlock(block);

    //win the game
    if (gameBlocksContainer.children.length === 2) {
      gameBlocksContainer.innerHTML = "";

      let won_para = document.createElement("p");
      won_para.classList.add("won");
      let Wontext = document.createTextNode("Congratulations! \nYou win.");
      won_para.appendChild(Wontext);
      gameBlocksContainer.appendChild(won_para);
    }
  });
});

function flipBlock(selectedBlock) {
  // Add Class is-flipped
  selectedBlock.classList.add("flipped");

  let allFlippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("flipped")
  );

  // If Theres Two Selected Blocks
  if (allFlippedBlocks.length === 2) {
    // Stop Clicking Function
    stopClicking();

    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
    // console.log(typeof wrongTriesNum);

    endGame(parseInt(wrongTriesNum));
  }
}

function endGame(wrongtr) {
  if (wrongtr === 5) {
    gameBlocksContainer.innerHTML = "";

    let won_para = document.createElement("p");
    won_para.classList.add("failed");
    let Wontext = document.createTextNode("Game Over ...");
    won_para.appendChild(Wontext);
    gameBlocksContainer.appendChild(won_para);
  }
}
// Check Matched Block
function checkMatchedBlocks(firstBlock, secondBlock) {
  let triesElement = document.querySelector(".tries span");

  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    setTimeout(() => {
      firstBlock.classList.remove("flipped");
      secondBlock.classList.remove("flipped");
      firstBlock.classList.add("hasMatch");
      secondBlock.classList.add("hasMatch");
      firstBlock.remove();
      secondBlock.remove();
    }, 1000);

    document.getElementById("success").play();
  } else {
    // let FalseNum=;
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    wrongTriesNum = triesElement.innerHTML;

    setTimeout(() => {
      firstBlock.classList.remove("flipped");
      secondBlock.classList.remove("flipped");
    }, duration);

    document.getElementById("fail").play();
  }
}
// Stop Clicking Function
function stopClicking() {
  // Add Class No Clicking on Main Container
  gameBlocksContainer.classList.add("Noclicking");

  // Wait Duration
  setTimeout(() => {
    // Remove Class No Clicking After The Duration
    gameBlocksContainer.classList.remove("Noclicking");
  }, duration);
}

//random numbers
function shuffleArray(array) {
  const newArray = array.slice(); // Create a shallow copy of the original array

  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Generate a random index

    // Swap elements at index i and j
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return newArray;
}

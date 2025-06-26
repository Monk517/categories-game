const categories = [
  { name: "Video Games", points: [200, 400, 600, 800], image: "assets/images/games.jpg" },
  { name: "Lore", points: [200, 400, 600, 800], image: "assets/images/lore.jpg" },
  { name: "Head-to-Head", points: [400, 400, 400, 400], image: "assets/images/head.jpg" },
  { name: "Memes", points: [200, 400, 600, 800], image: "assets/images/memes.jpg" },
  { name: "Destiny", points: [200, 400, 600, 800], image: "assets/images/destiny.jpg" },
  { name: "Mystery", points: [200, 400, 600, 800], image: "assets/images/mystery.jpg" }
];

let team1Score = 0;
let team2Score = 0;

const questions = {
  // 🎮 Video Games
  "Video Games-200": "<img src='assets/images/1.jpg' width='100%'><br>",
  "Video Games-400": "",
  "Video Games-600": "",
  "Video Games-800": "",

  // 📖 Lore
  "Lore-200": "",
  "Lore-400": "",
  "Lore-600": "",
  "Lore-800": "",

  // 🧠 Head-to-Head
  "Head-to-Head-0": [
    "", "", ""
  ],
  "Head-to-Head-1": [
    "", "", ""
  ],
  "Head-to-Head-2": [
    "", "", ""
  ],
  "Head-to-Head-3": [
    "", "", ""
  ],

  // 😂 Memes
  "Memes-200": "<video width='30%' controls><source src='assets/videos/2.mp4' type='video/mp4'></video><br>شنو قاعد يقول؟",
  "Memes-400": "<video width='30%' controls><source src='assets/videos/1.mp4' type='video/mp4'></video><br> اكمل الجملة",
  "Memes-600": "",
  "Memes-800": "",

  // 🛰 Destiny
  "Destiny-200": "",
  "Destiny-400": "",
  "Destiny-600": "",
  "Destiny-800": "",

  // 🕵️ Mystery
  "Mystery-200": "",
  "Mystery-400": "",
  "Mystery-600": "",
  "Mystery-800": ""
};

function createBoard() {
  const board = document.getElementById("board");
  categories.forEach((cat, colIndex) => {
    const col = document.createElement("div");
    col.className = "column";

    const img = document.createElement("img");
    img.src = cat.image;
    col.appendChild(img);

    const title = document.createElement("div");
    title.className = "column-title";
    title.textContent = cat.name;
    col.appendChild(title);

    cat.points.forEach((point, index) => {
      const id = cat.name === "Head-to-Head" ? `Head-to-Head-${index}` : `${cat.name}-${point}`;
      const card = document.createElement("div");
      card.className = "card";
      card.textContent = point;
      card.onclick = () => showQuestion(id, card, point);
      col.appendChild(card);
    });

    board.appendChild(col);
  });
}

function showQuestion(id, cardElement, pointValue) {
  const modal = document.getElementById("questionModal");
  const title = document.getElementById("questionTitle");
  const text = document.getElementById("questionText");
  const nextBtn = document.getElementById("nextSubQuestion");

  title.textContent = id;
  cardElement.dataset.points = pointValue;

  if (Array.isArray(questions[id])) {
    let subIndex = 0;
    text.innerHTML = questions[id][subIndex];
    nextBtn.innerHTML = `<button onclick="showNextSub(this, '${id}')">Next</button>`;
    nextBtn.dataset.index = 1;
  } else {
    text.innerHTML = questions[id] || "No question added yet.";
    nextBtn.innerHTML = "";
  }

  cardElement.classList.add("used");
  cardElement.onclick = null;
  modal.style.display = "block";
}

function showNextSub(btn, id) {
  let index = parseInt(btn.parentNode.dataset.index);
  const content = questions[id];

  if (index < content.length) {
    document.getElementById("questionText").innerHTML = content[index];
    btn.parentNode.dataset.index = index + 1;
  } else {
    btn.remove(); // Hide button when done
  }
}

function closeQuestion() {
  document.getElementById("questionModal").style.display = "none";
}

function addPoints(team) {
  const idText = document.getElementById("questionTitle").textContent;

  let pointValue = 0;

  if (idText.includes("Head-to-Head")) {
    pointValue = 400;
  } else {
    pointValue = parseInt(idText.split("-")[1]);
  }

  if (!isNaN(pointValue)) {
    if (team === 1) team1Score += pointValue;
    else team2Score += pointValue;

    document.getElementById("team1").textContent = `Team 1: ${team1Score}`;
    document.getElementById("team2").textContent = `Team 2: ${team2Score}`;
  }

  closeQuestion();
}

window.onload = createBoard;

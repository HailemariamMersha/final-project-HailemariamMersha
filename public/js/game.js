// TypeRush: Word Storm - Game Logic

// Word List
const WORDS = [
  "ocean",
  "storm",
  "speed",
  "light",
  "focus",
  "wind",
  "fire",
  "rush",
  "typhoon",
  "spark",
  "energy",
  "wave",
  "code",
  "dream",
  "impact",
  "flow",
  "mind",
  "type",
  "skill",
  "power",
  "accuracy",
  "challenge",
  "victory",
  "thunder",
  "lightning",
  "velocity",
  "momentum",
  "precision",
];

// DOM Elements
const gameArea = document.getElementById("game-area");
const timerDisplay = document.getElementById("timer");
const input = document.getElementById("wordInput");
const scoreDisplay = document.getElementById("score-display");
const accuracyDisplay = document.getElementById("accuracy-display");

// Game Variables
let score = 0;
let timeLeft = 60; // 60 seconds duration
let activeWords = [];
let timerInterval;
let animationFrame;
let gameActive = false;
let wordsTyped = 0;
let wordsCorrect = 0;
let wordsWrong = 0;
const MAX_WORDS = 10; // Maximum words on screen
const WORD_TTL = 8000; // Words disappear after 8 seconds if not typed
const BASE_SPAWN_RATE = 2000; // Spawn word every 2 seconds initially

// Utility Functions
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Update live stats display
function updateStats() {
  scoreDisplay.textContent = score;
  const totalAttempts = wordsCorrect + wordsWrong;
  const accuracy =
    totalAttempts > 0 ? Math.round((wordsCorrect / totalAttempts) * 100) : 100;
  accuracyDisplay.textContent = accuracy + "%";
}

// Get game area dimensions
function getGameAreaBounds() {
  const rect = gameArea.getBoundingClientRect();
  return {
    width: rect.width,
    height: rect.height,
    left: 0,
    top: 0,
  };
}

// Word Class
class Word {
  constructor(text) {
    this.text = text;
    this.el = document.createElement("div");
    this.el.textContent = text;
    this.el.classList.add("word");
    this.el.dataset.word = text;

    // Get game area bounds
    const bounds = getGameAreaBounds();

    // Random starting position within game area
    const maxX = Math.max(50, bounds.width - 200);
    const maxY = Math.max(50, bounds.height - 100);
    this.x = rand(20, maxX);
    this.y = rand(20, maxY);

    // Random velocity (pixels per frame)
    this.vx = (Math.random() - 0.5) * 2; // -1 to 1
    this.vy = (Math.random() - 0.5) * 2; // -1 to 1

    // Ensure minimum velocity
    if (Math.abs(this.vx) < 0.3) this.vx = this.vx > 0 ? 0.5 : -0.5;
    if (Math.abs(this.vy) < 0.3) this.vy = this.vy > 0 ? 0.5 : -0.5;

    // Speed multiplier (increases over time)
    this.speedMultiplier = 1;

    // TTL (Time To Live)
    this.spawnTime = Date.now();
    this.ttl = WORD_TTL;

    // Apply initial position
    this.updatePosition();

    gameArea.appendChild(this.el);
  }

  updatePosition() {
    this.el.style.left = `${this.x}px`;
    this.el.style.top = `${this.y}px`;
  }

  update() {
    // Update position based on velocity
    this.x += this.vx * this.speedMultiplier;
    this.y += this.vy * this.speedMultiplier;

    // Get current bounds
    const bounds = getGameAreaBounds();
    const rect = this.el.getBoundingClientRect();
    const wordWidth = rect.width || 100;
    const wordHeight = rect.height || 40;

    // Bounce off edges
    if (this.x <= 0) {
      this.vx = Math.abs(this.vx);
      this.x = 0;
    }
    if (this.x + wordWidth >= bounds.width) {
      this.vx = -Math.abs(this.vx);
      this.x = bounds.width - wordWidth;
    }

    if (this.y <= 0) {
      this.vy = Math.abs(this.vy);
      this.y = 0;
    }
    if (this.y + wordHeight >= bounds.height) {
      this.vy = -Math.abs(this.vy);
      this.y = bounds.height - wordHeight;
    }

    this.updatePosition();
    // I have updated the game so that words no longer expire
    // Check TTL
    // const elapsed = Date.now() - this.spawnTime;
    // if (elapsed > this.ttl) {
    //   this.remove();
    //   wordsWrong++;
    //   updateStats(); // Update stats when word expires
    //   return false; // Word expired
    // }

    return true; // Word still alive
  }

  remove() {
    if (this.el && this.el.parentNode) {
      this.el.remove();
    }
  }

  matches(input) {
    return this.text.toLowerCase() === input.toLowerCase().trim();
  }
}

// Spawn a random word
function spawnWord() {
  if (!gameActive || activeWords.length >= MAX_WORDS) return;

  const word = WORDS[rand(0, WORDS.length - 1)];
  const wordObj = new Word(word);
  activeWords.push(wordObj);
}

// Start the game
function startGame() {
  score = 0;
  timeLeft = 60;
  wordsTyped = 0;
  wordsCorrect = 0;
  wordsWrong = 0;
  gameActive = true;
  activeWords = [];

  timerDisplay.textContent = timeLeft;
  updateStats(); // Initialize stats display
  input.value = "";
  input.disabled = false;
  input.focus();
  gameArea.innerHTML = "";

  // Wait a bit for game area to be properly sized
  setTimeout(() => {
    // Initial spawn
    for (let i = 0; i < 3; i++) {
      setTimeout(() => spawnWord(), i * 500);
    }

    startTimer();
    startAnimation();
    startSpawning();
  }, 100);
}

// Start spawning words
let spawnInterval;
function startSpawning() {
  spawnInterval = setInterval(() => {
    if (gameActive && activeWords.length < MAX_WORDS) {
      spawnWord();
    }
  }, BASE_SPAWN_RATE);
}

// Animation loop
function startAnimation() {
  function animate() {
    if (!gameActive) {
      cancelAnimationFrame(animationFrame);
      return;
    }

    // Update speed multiplier based on time remaining (storm effect)
    const timeProgress = (60 - timeLeft) / 60; // 0 to 1
    const speedMultiplier = 1 + timeProgress * 1.5; // Gradually increase speed

    // Update all words
    activeWords = activeWords.filter((word) => {
      word.speedMultiplier = speedMultiplier;
      return word.update();
    });

    animationFrame = requestAnimationFrame(animate);
  }

  animate();
}

// Timer logic
function startTimer() {
  timerInterval = setInterval(() => {
    if (!gameActive) return;

    timeLeft--;
    timerDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

// Typing detection
input.addEventListener("keydown", (e) => {
  if (!gameActive || input.disabled) return;

  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    const typed = input.value.trim();

    if (typed) {
      wordsTyped++;

      // Find matching word
      const wordIndex = activeWords.findIndex((w) => w.matches(typed));

      if (wordIndex !== -1) {
        // Correct word
        wordsCorrect++;
        score++;
        activeWords[wordIndex].remove();
        activeWords.splice(wordIndex, 1);

        // Update stats immediately
        updateStats();

        // Spawn new word if under limit
        if (activeWords.length < MAX_WORDS) {
          setTimeout(() => spawnWord(), 300);
        }
      } else {
        // Incorrect - shake animation
        wordsWrong++;
        updateStats(); // Update stats on wrong answer
        gameArea.classList.add("shake");
        setTimeout(() => gameArea.classList.remove("shake"), 300);
      }

      input.value = "";
    }
  }
});

// End game
function endGame() {
  gameActive = false;
  clearInterval(timerInterval);
  clearInterval(spawnInterval);
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
  }

  input.disabled = true;

  // Remove all words
  activeWords.forEach((word) => word.remove());
  activeWords = [];

  // Calculate stats
  const wpm = Math.round((wordsCorrect / 60) * 60); // Words per minute
  const totalAttempts = wordsCorrect + wordsWrong;
  const accuracy =
    totalAttempts > 0 ? Math.round((wordsCorrect / totalAttempts) * 100) : 0;

  // Redirect to results page
  setTimeout(() => {
    window.location.href = `/results?wpm=${wpm}&accuracy=${accuracy}&words=${wordsCorrect}&correct=${wordsCorrect}&wrong=${wordsWrong}`;
  }, 500);
}

// Auto start on page load
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startGame);
} else {
  startGame();
}

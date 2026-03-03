const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 }
};

const DEFAULT_WORD_POOL = [
  { word: 'shop', split: ['sh', 'o', 'p'] },
  { word: 'fish', split: ['f', 'i', 'sh'] },
  { word: 'math', split: ['m', 'a', 'th'] }
];

function samePoint(a, b) {
  return a.x === b.x && a.y === b.y;
}

function isReverseDirection(current, next) {
  return current.x + next.x === 0 && current.y + next.y === 0;
}

function normalizeWordEntry(entry) {
  if (!entry || typeof entry.word !== 'string' || !Array.isArray(entry.split)) {
    return null;
  }

  const word = entry.word.trim().toLowerCase();
  const split = entry.split
    .map((sound) => String(sound).trim().toLowerCase())
    .filter((sound) => sound.length > 0);

  if (!word || split.length < 2) {
    return null;
  }

  return { word, split };
}

function normalizeWordPool(wordPool) {
  if (!Array.isArray(wordPool) || wordPool.length === 0) {
    return DEFAULT_WORD_POOL;
  }

  const seen = new Set();
  const normalized = [];

  wordPool.forEach((entry) => {
    const parsed = normalizeWordEntry(entry);
    if (!parsed) {
      return;
    }

    const key = parsed.word + '|' + parsed.split.join('-');
    if (seen.has(key)) {
      return;
    }

    seen.add(key);
    normalized.push(parsed);
  });

  return normalized.length > 0 ? normalized : DEFAULT_WORD_POOL;
}

function pickWord(wordPool, randomFn = Math.random) {
  const index = Math.floor(randomFn() * wordPool.length);
  return wordPool[index];
}

function spawnFood(gridSize, snake, sound, randomFn = Math.random) {
  const openCells = [];

  for (let y = 0; y < gridSize; y += 1) {
    for (let x = 0; x < gridSize; x += 1) {
      const occupied = snake.some((segment) => segment.x === x && segment.y === y);
      if (!occupied) {
        openCells.push({ x, y });
      }
    }
  }

  if (openCells.length === 0) {
    return null;
  }

  const index = Math.floor(randomFn() * openCells.length);
  const cell = openCells[index];
  return { x: cell.x, y: cell.y, sound };
}

function createInitialGameState(gridSize = 16, options = {}) {
  const randomFn = options.randomFn || Math.random;
  const wordPool = normalizeWordPool(options.wordPool);
  const startingWord = normalizeWordEntry(options.startingWord);
  const word = startingWord || pickWord(wordPool, randomFn);

  const center = Math.floor(gridSize / 2);
  const snake = [{ x: center, y: center }];
  const food = spawnFood(gridSize, snake, word.split[0], randomFn);

  return {
    gridSize,
    snake,
    direction: DIRECTIONS.RIGHT,
    nextDirection: DIRECTIONS.RIGHT,
    food,
    score: 0,
    isGameOver: false,
    isPaused: false,
    currentWord: word.word,
    targetSounds: word.split,
    targetSoundIndex: 0,
    wordsCompleted: 0,
    wordPool
  };
}

function setNextDirection(state, nextDirection) {
  if (state.isGameOver) {
    return state;
  }

  if (isReverseDirection(state.direction, nextDirection)) {
    return state;
  }

  return {
    ...state,
    nextDirection
  };
}

function stepGame(state, randomFn = Math.random) {
  if (state.isGameOver || state.isPaused) {
    return state;
  }

  const direction = state.nextDirection;
  const currentHead = state.snake[0];
  const newHead = {
    x: currentHead.x + direction.x,
    y: currentHead.y + direction.y
  };

  const hitWall =
    newHead.x < 0 ||
    newHead.x >= state.gridSize ||
    newHead.y < 0 ||
    newHead.y >= state.gridSize;

  if (hitWall) {
    return {
      ...state,
      direction,
      isGameOver: true
    };
  }

  const willGrow = state.food && samePoint(newHead, state.food);
  const bodyForCollision = willGrow ? state.snake : state.snake.slice(0, -1);
  const hitSelf = bodyForCollision.some((segment) => samePoint(segment, newHead));

  if (hitSelf) {
    return {
      ...state,
      direction,
      isGameOver: true
    };
  }

  const nextSnake = [newHead, ...state.snake];
  if (!willGrow) {
    nextSnake.pop();
  }

  if (!willGrow) {
    return {
      ...state,
      snake: nextSnake,
      direction
    };
  }

  const nextSoundIndex = state.targetSoundIndex + 1;
  const finishedWord = nextSoundIndex >= state.targetSounds.length;

  if (!finishedWord) {
    const nextFood = spawnFood(state.gridSize, nextSnake, state.targetSounds[nextSoundIndex], randomFn);

    return {
      ...state,
      snake: nextSnake,
      direction,
      food: nextFood,
      score: state.score + 1,
      targetSoundIndex: nextSoundIndex,
      isGameOver: nextFood === null
    };
  }

  const nextWord = pickWord(state.wordPool, randomFn);
  const nextFood = spawnFood(state.gridSize, nextSnake, nextWord.split[0], randomFn);

  return {
    ...state,
    snake: nextSnake,
    direction,
    food: nextFood,
    score: state.score + 1,
    currentWord: nextWord.word,
    targetSounds: nextWord.split,
    targetSoundIndex: 0,
    wordsCompleted: state.wordsCompleted + 1,
    isGameOver: nextFood === null
  };
}

const SnakeGameLogic = {
  DIRECTIONS,
  createInitialGameState,
  setNextDirection,
  stepGame,
  spawnFood,
  normalizeWordPool,
  normalizeWordEntry
};

if (typeof window !== 'undefined') {
  window.SnakeGameLogic = SnakeGameLogic;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = SnakeGameLogic;
}

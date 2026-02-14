const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 }
};

function samePoint(a, b) {
  return a.x === b.x && a.y === b.y;
}

function isReverseDirection(current, next) {
  return current.x + next.x === 0 && current.y + next.y === 0;
}

function spawnFood(gridSize, snake, randomFn = Math.random) {
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
  return openCells[index];
}

function createInitialGameState(gridSize = 16, randomFn = Math.random) {
  const center = Math.floor(gridSize / 2);
  const snake = [{ x: center, y: center }];
  const food = spawnFood(gridSize, snake, randomFn);

  return {
    gridSize,
    snake,
    direction: DIRECTIONS.RIGHT,
    nextDirection: DIRECTIONS.RIGHT,
    food,
    score: 0,
    isGameOver: false,
    isPaused: false
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

  if (willGrow) {
    const nextFood = spawnFood(state.gridSize, nextSnake, randomFn);
    const boardIsFull = nextFood === null;

    return {
      ...state,
      snake: nextSnake,
      direction,
      food: nextFood,
      score: state.score + 1,
      isGameOver: boardIsFull
    };
  }

  return {
    ...state,
    snake: nextSnake,
    direction
  };
}

window.SnakeGameLogic = {
  DIRECTIONS,
  createInitialGameState,
  setNextDirection,
  stepGame,
  spawnFood
};

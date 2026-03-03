const test = require('node:test');
const assert = require('node:assert/strict');

const {
  DIRECTIONS,
  createInitialGameState,
  setNextDirection,
  stepGame,
  spawnFood,
  normalizeWordPool
} = require('./snake-game-logic.js');

function constantRandom(value) {
  return () => value;
}

test('setNextDirection blocks direct reverse direction', () => {
  const state = createInitialGameState(8, {
    wordPool: [{ word: 'shop', split: ['sh', 'o', 'p'] }],
    startingWord: { word: 'shop', split: ['sh', 'o', 'p'] }
  });

  const sameState = setNextDirection(state, DIRECTIONS.LEFT);
  assert.equal(sameState.nextDirection, state.nextDirection);

  const changedState = setNextDirection(state, DIRECTIONS.UP);
  assert.deepEqual(changedState.nextDirection, DIRECTIONS.UP);
});

test('stepGame moves snake head by direction', () => {
  const state = createInitialGameState(8, {
    wordPool: [{ word: 'shop', split: ['sh', 'o', 'p'] }],
    startingWord: { word: 'shop', split: ['sh', 'o', 'p'] }
  });

  const next = stepGame(state, constantRandom(0));
  assert.deepEqual(next.snake[0], { x: state.snake[0].x + 1, y: state.snake[0].y });
  assert.equal(next.isGameOver, false);
});

test('stepGame ends game on wall collision', () => {
  const state = {
    ...createInitialGameState(4, {
      wordPool: [{ word: 'shop', split: ['sh', 'o', 'p'] }],
      startingWord: { word: 'shop', split: ['sh', 'o', 'p'] }
    }),
    snake: [{ x: 3, y: 1 }],
    direction: DIRECTIONS.RIGHT,
    nextDirection: DIRECTIONS.RIGHT
  };

  const next = stepGame(state, constantRandom(0));
  assert.equal(next.isGameOver, true);
});

test('stepGame grows snake and advances to next sound when food is eaten', () => {
  const state = {
    ...createInitialGameState(8, {
      wordPool: [{ word: 'shop', split: ['sh', 'o', 'p'] }],
      startingWord: { word: 'shop', split: ['sh', 'o', 'p'] }
    }),
    snake: [{ x: 3, y: 3 }],
    direction: DIRECTIONS.RIGHT,
    nextDirection: DIRECTIONS.RIGHT,
    food: { x: 4, y: 3, sound: 'sh' },
    targetSoundIndex: 0
  };

  const next = stepGame(state, constantRandom(0));

  assert.equal(next.score, 1);
  assert.equal(next.snake.length, 2);
  assert.equal(next.targetSoundIndex, 1);
  assert.equal(next.food.sound, 'o');
  assert.equal(next.currentWord, 'shop');
});

test('stepGame completes word and switches to next word', () => {
  const wordPool = normalizeWordPool([
    { word: 'shop', split: ['sh', 'o', 'p'] },
    { word: 'math', split: ['m', 'a', 'th'] }
  ]);

  const state = {
    ...createInitialGameState(8, {
      wordPool,
      startingWord: { word: 'shop', split: ['sh', 'o', 'p'] }
    }),
    snake: [{ x: 3, y: 3 }, { x: 2, y: 3 }],
    direction: DIRECTIONS.RIGHT,
    nextDirection: DIRECTIONS.RIGHT,
    food: { x: 4, y: 3, sound: 'p' },
    targetSoundIndex: 2,
    score: 2,
    wordsCompleted: 0
  };

  const next = stepGame(state, constantRandom(0.99));

  assert.equal(next.score, 3);
  assert.equal(next.wordsCompleted, 1);
  assert.equal(next.currentWord, 'math');
  assert.deepEqual(next.targetSounds, ['m', 'a', 'th']);
  assert.equal(next.targetSoundIndex, 0);
  assert.equal(next.food.sound, 'm');
});

test('spawnFood never places food on the snake', () => {
  const snake = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 }
  ];

  const food = spawnFood(4, snake, 'sh', constantRandom(0));
  assert.notDeepEqual(food, { x: 0, y: 0, sound: 'sh' });
  assert.equal(food.sound, 'sh');
});

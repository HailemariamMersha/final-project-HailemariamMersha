import assert from "assert";
import GameSession from "../models/GameSession.mjs";
import User from "../models/Users.mjs";

describe("User model", () => {
  it("sets stat defaults to zero and timestamps new users", () => {
    const user = new User({
      username: "player1",
      email: "player1@example.com",
      passwordHash: "hash123",
    });

    assert.strictEqual(user.bestWPM, 0);
    assert.strictEqual(user.bestAccuracy, 0);
    assert.strictEqual(user.totalGames, 0);
    assert.ok(user.createdAt instanceof Date);
  });

  it("requires username, email, and passwordHash", () => {
    const user = new User({});
    const error = user.validateSync();

    assert.ok(error.errors.username);
    assert.ok(error.errors.email);
    assert.ok(error.errors.passwordHash);
  });
});

describe("GameSession model", () => {
  it("defaults difficulty to Medium and stamps creation date", () => {
    const session = new GameSession({
      wpm: 72,
      accuracy: 94,
      correct: 45,
      wrong: 5,
      missed: 3,
      duration: 60,
    });

    assert.strictEqual(session.difficulty, "Medium");
    assert.ok(session.date instanceof Date);
  });

  it("stores numeric gameplay metrics without mutation", () => {
    const session = new GameSession({
      difficulty: "Hard",
      wpm: 80,
      accuracy: 91,
      correct: 50,
      wrong: 7,
      missed: 2,
      duration: 75,
    });

    assert.strictEqual(session.difficulty, "Hard");
    assert.strictEqual(session.wpm, 80);
    assert.strictEqual(session.accuracy, 91);
    assert.strictEqual(session.correct, 50);
    assert.strictEqual(session.wrong, 7);
    assert.strictEqual(session.missed, 2);
    assert.strictEqual(session.duration, 75);
  });
});

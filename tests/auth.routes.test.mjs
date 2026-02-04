import assert from "assert";
import express from "express";
import session from "express-session";
import request from "supertest";
import bcrypt from "bcrypt";
import authRouter from "../routers/auth.mjs";
import User from "../models/Users.mjs";

const originalFindOne = User.findOne;
const originalCreate = User.create;
const originalCompare = bcrypt.compare;

function buildTestApp() {
  const app = express();
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(
    session({
      secret: "test-secret",
      resave: false,
      saveUninitialized: false,
    }),
  );

  // Replace res.render to return JSON for assertions
  app.use((req, res, next) => {
    res.render = (view, data) => res.status(200).json({ view, data });
    next();
  });

  app.use("/auth", authRouter);
  return app;
}

describe("Auth routes", () => {
  afterEach(() => {
    User.findOne = originalFindOne;
    User.create = originalCreate;
    bcrypt.compare = originalCompare;
  });

  it("returns error when login user does not exist", async () => {
    User.findOne = async () => null;
    bcrypt.compare = async () => false;

    const app = buildTestApp();
    const res = await request(app)
      .post("/auth/login")
      .send({ username: "ghost", password: "pass" });

    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.view, "login");
    assert.strictEqual(
      res.body.data.error,
      "User does not exist. Please register first.",
    );
  });

  it("returns error when password is incorrect", async () => {
    User.findOne = async () => ({ username: "player", passwordHash: "hash" });
    bcrypt.compare = async () => false;

    const app = buildTestApp();
    const res = await request(app)
      .post("/auth/login")
      .send({ username: "player", password: "wrong" });

    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.view, "login");
    assert.strictEqual(
      res.body.data.error,
      "Incorrect password. Please try again.",
    );
  });

  it("rejects duplicate username during registration", async () => {
    User.findOne = async () => ({ username: "taken", email: "other@x.com" });

    const app = buildTestApp();
    const res = await request(app)
      .post("/auth/register")
      .send({ username: "taken", email: "new@x.com", password: "secret" });

    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.view, "register");
    assert.strictEqual(
      res.body.data.error,
      "Username already exists. Please choose a different username.",
    );
  });

  it("rejects duplicate email during registration", async () => {
    User.findOne = async () => ({ username: "other", email: "dup@x.com" });

    const app = buildTestApp();
    const res = await request(app)
      .post("/auth/register")
      .send({ username: "newuser", email: "dup@x.com", password: "secret" });

    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.view, "register");
    assert.strictEqual(
      res.body.data.error,
      "Email already exists. Please use a different email.",
    );
  });

  it("redirects to home on successful login", async () => {
    User.findOne = async () => ({ _id: "user123", username: "player", passwordHash: "hash" });
    bcrypt.compare = async () => true;

    const app = buildTestApp();
    const res = await request(app)
      .post("/auth/login")
      .send({ username: "player", password: "correct" });

    assert.strictEqual(res.status, 302);
    assert.strictEqual(res.headers.location, "/home");
  });
});

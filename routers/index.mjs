import express from "express";
import GameSession from "../models/GameSession.mjs";
const router = express.Router();

// Authentication middleware
export const requireAuth = (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect("/auth/login");
  }
  next();
};

router.get("/", (req, res) => {
  res.render("home", {
    title: "TypeRush: Word Storm",
    username: req.session.username || null,
  });
});

router.get("/home", (req, res) => {
  res.render("home", {
    title: "TypeRush: Word Storm",
    username: req.session.username || null,
  });
});

router.get("/levels", requireAuth, (req, res) => {
  res.render("levels", {
    title: "Choose Level",
    username: req.session.username || null,
  });
});

router.get("/play", requireAuth, (req, res) => {
  const difficulty = req.query.difficulty || "Medium";
  res.render("play", {
    title: "Play TypeRush",
    username: req.session.username || null,
    difficulty: difficulty,
  });
});

router.get("/scores", requireAuth, async (req, res) => {
  const userScores = await GameSession.find({ userId: req.session.userId })
    .sort({ date: -1 })
    .limit(20)
    .lean();

  // Format dates
  const formattedScores = userScores.map((score) => ({
    ...score,
    dateFormatted: new Date(score.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
  }));

  res.render("scores", {
    title: "Your Scores",
    username: req.session.username || null,
    scores: formattedScores,
  });
});

router.get("/results", requireAuth, async (req, res) => {
  const wpm = req.query.wpm || 0;
  const accuracy = req.query.accuracy || 0;
  const words = req.query.words || 0;
  const difficulty = req.query.difficulty || "Medium";

  res.render("results", {
    title: "Results",
    wpm: wpm,
    accuracy: accuracy,
    words: words,
    difficulty: difficulty,
    username: req.session.username || null,
    userId: req.session.userId || null,
  });
});

export default router;

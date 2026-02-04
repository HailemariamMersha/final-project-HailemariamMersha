// routes/api.mjs
import express from "express";
import GameSession from "../models/GameSession.mjs";
import User from "../models/Users.mjs";
const router = express.Router();

router.post("/save", async (req, res) => {
  if (!req.session.userId)
    return res.status(403).json({ error: "Not logged in" });
  const { wpm, accuracy, correct, wrong, words, difficulty } = req.body;

  try {
    const gameSession = await GameSession.create({
      userId: req.session.userId,
      difficulty: difficulty || "Medium",
      wpm: parseInt(wpm),
      accuracy: parseInt(accuracy),
      correct: parseInt(correct),
      wrong: parseInt(wrong),
      missed: parseInt(words) - parseInt(correct) - parseInt(wrong),
      duration: 60,
    });

    // Update user's best stats
    const user = await User.findById(req.session.userId);
    if (wpm > user.bestWPM) user.bestWPM = wpm;
    if (accuracy > user.bestAccuracy) user.bestAccuracy = accuracy;
    user.totalGames = (user.totalGames || 0) + 1;
    await user.save();

    res.json({ success: true, gameSession });
  } catch (err) {
    console.error("Save error:", err);
    res.status(500).json({ error: "Failed to save game" });
  }
});

router.get("/leaderboard", async (req, res) => {
  const top = await GameSession.find()
    .populate("userId")
    .sort({ wpm: -1 })
    .limit(5);
  res.json(top);
});

export default router;

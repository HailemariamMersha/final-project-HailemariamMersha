import mongoose from "mongoose";

const gameSessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  difficulty: { type: String, default: "Medium" },
  wpm: Number,
  accuracy: Number,
  correct: Number,
  wrong: Number,
  missed: Number,
  duration: Number,
  date: { type: Date, default: Date.now },
});

export default mongoose.model("GameSession", gameSessionSchema);

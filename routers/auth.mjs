// routes/auth.mjs
import express from "express";
import bcrypt from "bcrypt";
import User from "../models/Users.mjs";

const router = express.Router();

// --- Register Page ---
router.get("/register", (req, res) => {
  res.render("register", { title: "Register" });
});

// --- Register Logic ---
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      if (existingUser.username === username) {
        return res.render("register", {
          title: "Register",
          error: "Username already exists. Please choose a different username.",
        });
      }
      if (existingUser.email === email) {
        return res.render("register", {
          title: "Register",
          error: "Email already exists. Please use a different email.",
        });
      }
    }

    // Hash password using bcrypt
    const hash = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      username,
      email,
      passwordHash: hash,
    });

    // Set session and redirect to home
    req.session.userId = newUser._id;
    req.session.username = newUser.username;
    res.redirect("/home");
  } catch (err) {
    console.error("Registration error:", err);
    res.render("register", {
      title: "Register",
      error: "Registration failed. Please try again.",
    });
  }
});

// --- Login Page ---
router.get("/login", (req, res) => {
  res.render("login", { title: "Login" });
});

// --- Login Logic ---
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user exists in database
    const user = await User.findOne({ username });

    if (!user) {
      return res.render("login", {
        title: "Login",
        error: "User does not exist. Please register first.",
      });
    }

    // Verify password using bcrypt
    const match = await bcrypt.compare(password, user.passwordHash);

    if (!match) {
      return res.render("login", {
        title: "Login",
        error: "Incorrect password. Please try again.",
      });
    }

    // Set session and redirect to home
    req.session.userId = user._id;
    req.session.username = user.username;
    res.redirect("/home");
  } catch (err) {
    console.error("Login error:", err);
    res.render("login", {
      title: "Login",
      error: "Login error. Please try again.",
    });
  }
});

// --- Logout ---
router.get("/logout", (req, res) => {
  req.session.destroy(() => res.redirect("/"));
});

export default router;

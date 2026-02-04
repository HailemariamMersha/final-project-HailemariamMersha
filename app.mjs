import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import morgan from "morgan";
import { engine } from "express-handlebars";
import { formatDate } from "./utils/formatDate.mjs";

import config, { createMongoStore } from "./config.mjs";
import indexRouter from "./routers/index.mjs";
import apiRouter from "./routers/api.mjs";
import authRouter from "./routers/auth.mjs";

const app = express();

// Handlebars configuration with helpers
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    helpers: {
      formatDate,
    },
  }),
);
app.set("view engine", "hbs");
app.set("views", "./views");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// MongoDB Connection
if (config.nodeEnv !== "test") {
  mongoose
    .connect(config.mongoUri)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));
}

// Session Configuration
app.use(
  session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: createMongoStore(),
  }),
);

// Routes
app.use("/", indexRouter);
app.use("/api", apiRouter);
app.use("/auth", authRouter);

// 404 Handler
app.use((req, res) =>
  res.status(404).render("404", { title: "Page Not Found" }),
);

// Start Server
if (config.nodeEnv !== "test") {
  app.listen(config.port, () => {
    console.log(`${config.appName} running on http://localhost:${config.port}`);
    console.log(`Environment: ${config.nodeEnv}`);
  });
}

export default app;

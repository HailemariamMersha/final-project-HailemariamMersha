import dotenv from "dotenv";
import MongoStore from "connect-mongo";

dotenv.config();

const config = {
  // Server Configuration
  port: process.env.PORT || 3000,

  // MongoDB Configuration
  mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/typerush",

  // Session Configuration
  sessionSecret:
    process.env.SESSION_SECRET || "typerush-secret-change-in-production",

  // Environment
  nodeEnv: process.env.NODE_ENV || "development",

  // Application Settings
  appName: "TypeRush: Word Storm",
};

// Export MongoStore factory for use in app.mjs
export const createMongoStore = () => {
  return MongoStore.create({ mongoUrl: config.mongoUri });
};

export default config;

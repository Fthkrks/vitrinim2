import chalk from "chalk";
import mongoose from "mongoose";
import {MONGODB_URI, NODE_ENV} from "../config";
if (!MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = MONGODB_URI;
const options = {
  serverSelectionTimeoutMS: 10000, // 10 saniyelik zaman aşımı
};

let Database;

if (NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongooseClientPromise) {
    global._mongooseClientPromise = mongoose.connect(uri, options);
  }
  Database = global._mongooseClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  Database = mongoose.connect(uri, options);
}

Database
  .then(() => console.log(chalk.bgGreen("MongoDB Database connected!")))
  .catch((err) => console.error(chalk.bgRed("MongoDB connection error:"), err));

export default Database;

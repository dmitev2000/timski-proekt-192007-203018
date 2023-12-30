import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import client from "./db/index.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// routers
import PhoneRouter from "./routers/PhoneRouter.js";
import AuthenticationRouter from "./routers/AuthenticationRouter.js";
import CartRouter from "./routers/CartRouter.js";
import OrderRouter from "./routers/OrderRouter.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// * Enables access to the images from the frontend
app.use("/images", express.static(path.join(__dirname, "images")));

// TODO: Add routers
app.use("/api/phones", PhoneRouter);
app.use("/api/auth", AuthenticationRouter);
app.use("/api/cart", CartRouter);
app.use("/api/orders", OrderRouter);

// ! Error handler
app.use((err, req, res, next) => {
  let code;
  if (err.code) {
    if (+err.code >= 600) {
      code = 400;
    } else {
      code = +err.code;
    }
  }
  err.code
    ? res.status(code).json(err.message)
    : res.status(500).json("Internal server error.");
});

// * Connect to PostgreSQL database and start the server
client.connect((err) => {
  if (!err) {
    console.log("PostgreSQL connection established successfully.");
    app.listen(3000, () => {
      console.log(`The Server is running on port ${port}.`);
    });
  } else {
    console.log(err);
  }
});

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import client from "./db/index.js";

// routers
import PhoneRouter from "./routers/PhoneRouter.js";

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// TODO: Add routers
app.use("/api/phones", PhoneRouter);

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

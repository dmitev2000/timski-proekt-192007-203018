import jwt from "jsonwebtoken";
import { noToken, invalidToken } from "../shared/ErrorMessages.js";
import { CreateError } from "../shared/Utils.js";
import client from "../db/index.js";

export const VerifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (authHeader !== undefined) {
      const token = authHeader.split(" ")[1];
      if (!token) {
        return next(CreateError(401, noToken));
      }
      try {
        jwt.verify(token, process.env.JWT);
        return next();
      } catch (error) {
        return next(CreateError(403, invalidToken));
      }
    } else {
      return next(CreateError(401, noToken));
    }
  } catch (error) {
    next(CreateError(401, "Authentication failure."));
  }
};

export const VerifyUser = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT);
    const { user_id } = payload;
    if (user_id !== +req.params.user_id) {
      return next(CreateError(403, "You are not authorized."));
    } else {
      return next();
    }
  } catch (error) {
    next(CreateError(500, "Internal server error."));
  }
};

export const VerifyAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT);
    const { role_id } = payload;
    const query = "SELECT role_id FROM develop.roles r WHERE r.role_name = $1";
    const resp = await client.query(query, ["Admin"]);
    if (+role_id !== +resp.rows[0].role_id) {
      return next(
        CreateError(403, "You are not authorized (you are not an admin).")
      );
    } else {
      return next();
    }
  } catch (error) {
    next(CreateError(500, "Internal server error."));
  }
};

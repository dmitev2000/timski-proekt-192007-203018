import client from "../db/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { CreateError, VerifyPasswordFormat } from "../shared/Utils.js";

export const Register = async (req, res, next) => {
  try {
    const { username, password, seller, shop } = req.body;
    const validatePassword = VerifyPasswordFormat(password);
    if (!validatePassword.valid) {
      return next(validatePassword.error);
    }
    if (!username) {
      return next(CreateError(400, "Please provide a username."));
    }
    const salt = bcrypt.genSaltSync(10);
    const encryptedPassword = bcrypt.hashSync(password, salt);
    const role_query = "SELECT role_id FROM develop.roles WHERE role_name = $1";
    const response = await client.query(role_query, [
      seller ? "Seller" : "Customer",
    ]);
    const { role_id } = response.rows[0];
    const insert_query =
      "INSERT INTO develop.users(user_id, user_name, user_password, role_id, verified) VALUES (default, $1, $2, $3, $4)";
    await client.query(insert_query, [
      username,
      encryptedPassword,
      role_id,
      !seller,
    ]);
    const user_query = "SELECT user_id FROM develop.users WHERE user_name = $1";
    const user_response = await client.query(user_query, [username]);
    const { user_id } = user_response.rows[0];
    const cart_query =
      "INSERT INTO develop.carts(cart_id, user_id) VALUES (default, $1)";
    await client.query(cart_query, [user_id]);

    if (seller) {
      const works_for_query = `INSERT INTO develop.works_for (user_id, shop_id) VALUES (
        (SELECT user_id FROM develop.users WHERE user_name = $1),
        $2
      )`;

      await client.query(works_for_query, [username, shop]);
    }

    res.status(200).json("Your account has been created.");
  } catch (error) {
    if (+error.code === 23505) {
      return next(
        CreateError(
          400,
          `The username ${req.body.username} is already taken. Please choose a different username.`
        )
      );
    }
    error.code
      ? next(CreateError(400, error.message))
      : next(CreateError(500, "Internal server error."));
  }
};

export const Login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const query = `SELECT * FROM develop.users WHERE user_name = $1`;
    const user = (await client.query(query, [username])).rows[0];
    if (!user) {
      return next(CreateError(400, "Invalid credentials."));
    }
    const correctCredentials = await bcrypt.compare(
      password,
      user.user_password
    );
    if (!correctCredentials) {
      return next(CreateError(400, "Invalid credentials."));
    }
    let shop_id = null;
    if (user.role_id === 3) {
      const query2 = `SELECT shop_id FROM develop.works_for WHERE user_id = $1`;
      shop_id = (await client.query(query2, [user.user_id])).rows[0]?.shop_id;
    }
    const token = jwt.sign(
      {
        user_id: user.user_id,
        user_name: user.user_name,
        role_id: user.role_id,
        shop_id: shop_id,
      },
      process.env.JWT,
      { expiresIn: "365d" }
    );
    res.status(200).json({
      user: {
        username: user.user_name,
        id: user.user_id,
        role: user.role_id,
        shop_id: shop_id,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const GetAdminRoleID = async (req, res, next) => {
  try {
    const query = `SELECT role_id FROM develop.roles r WHERE r.role_name = $1`;
    const resp = await client.query(query, ["Admin"]);
    res.status(200).json(resp.rows[0]);
  } catch (error) {
    next(error);
  }
};

export const RegisterSellerWithNewShop = async (req, res, next) => {
  try {
    const { username, password, newShopName } = req.body;
    const file = req.file;
    const query = `INSERT INTO develop.tech_shops (shop_id, shop_name, shop_logo) VALUES (default, $1, $2)`;
    await client.query(query, [newShopName, file.originalname]);

    const salt = bcrypt.genSaltSync(10);
    const encryptedPassword = bcrypt.hashSync(password, salt);
    const role_query = "SELECT role_id FROM develop.roles WHERE role_name = $1";
    const response = await client.query(role_query, ["Seller"]);

    const { role_id } = response.rows[0];
    const insert_query =
      "INSERT INTO develop.users(user_id, user_name, user_password, role_id, verified) VALUES (default, $1, $2, $3, $4)";
    await client.query(insert_query, [
      username,
      encryptedPassword,
      role_id,
      false,
    ]);
    const user_query = "SELECT user_id FROM develop.users WHERE user_name = $1";
    const user_response = await client.query(user_query, [username]);
    const { user_id } = user_response.rows[0];
    const cart_query =
      "INSERT INTO develop.carts(cart_id, user_id) VALUES (default, $1)";
    await client.query(cart_query, [user_id]);

    const works_for_query = `INSERT INTO develop.works_for (user_id, shop_id) VALUES (
      (SELECT user_id FROM develop.users WHERE user_name = $1),
      (SELECT shop_id FROM develop.tech_shops WHERE shop_name = $2)
    )`;

    await client.query(works_for_query, [username, newShopName]);

    res
      .status(200)
      .json(
        `Seller account ${username} with new shop ${newShopName} was created.`
      );
  } catch (error) {
    console.log(error);
    next(CreateError(500, "Internal server error"));
  }
};

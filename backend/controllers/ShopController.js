import client from "../db/index.js";

export const GetShops = async (req, res, next) => {
  try {
    const query = `SELECT * FROM develop.tech_shops`;
    const resp = (await client.query(query)).rows;
    res.status(200).json(resp);
  } catch (error) {
    next(error);
  }
};

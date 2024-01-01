import client from "../db/index.js";

export const GetOurCatalogue = async (req, res, next) => {
  try {
    const { shop_id } = req.body;
    const query = `SELECT ph.phone_id, ph.phone_name, ph.phone_img, ph.a_year, s.price, pb.brand_name, pb.brand_logo FROM develop.phones ph 
                   JOIN develop.produce pr ON ph.phone_id = pr.phone_id
                   JOIN develop.phone_brands pb ON pb.brand_id = pr.brand_id
                   JOIN develop.sell s ON ph.phone_id = s.phone_id AND s.shop_id = $1`;
    const catalogue = (await client.query(query, [shop_id])).rows;
    const shop = (
      await client.query(
        "SELECT * FROM develop.tech_shops WHERE shop_id = $1",
        [shop_id]
      )
    ).rows[0];
    res.status(200).json({ catalogue, shop });
  } catch (error) {
    next(error);
  }
};

export const AddOrUpdateDevice = async (req, res, next) => {
  try {
    const { phone_id, shop_id, price } = req.body;
    let message;
    const selectQuery = `SELECT * FROM develop.sell WHERE shop_id = $1 AND phone_id = $2`;
    const addQuery = `INSERT INTO develop.sell (shop_id, phone_id, price) VALUES ($1, $2, $3)`;
    const updateQuery = `UPDATE develop.sell SET price = $3 WHERE shop_id = $1 AND phone_id = $2`;
    const colorsQuery = `SELECT color FROM develop.phone_colors WHERE phone_id = $1`;
    const stockQuery = `INSERT INTO develop.in_stock (shop_id, phone_id, quantity, color) VALUES ($1, $2, $3, $4)`;
    const exists = (await client.query(selectQuery, [shop_id, phone_id]))
      .rowCount;
    if (exists === 0) {
      await client.query(addQuery, [shop_id, phone_id, price]);
      const colors = (await client.query(colorsQuery, [phone_id])).rows;
      for (var i = 0; i < colors.length; i++) {
        await client.query(stockQuery, [shop_id, phone_id, 0, colors[i].color]);
      }
      message = "Phone added successfully.";
    } else {
      await client.query(updateQuery, [shop_id, phone_id, price]);
      message = "Phone updated successfully.";
    }
    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};

export const UpdateStock = async (req, res, next) => {
  try {
    const { phone_id, shop_id, color, quantity } = req.body;
    const existsQuery = `SELECT quantity FROM develop.in_stock WHERE phone_id = $1 AND shop_id = $2 AND color = $3`;
    const createQuery = `INSERT INTO develop.in_stock (shop_id, phone_id, color, quantity) VALUES ($1, $2, $3, $4)`;
    const updateQuery = `UPDATE develop.in_stock SET quantity = $4 WHERE shop_id = $1 AND phone_id = $2 AND color = $3`;
    const er = await client.query(existsQuery, [phone_id, shop_id, color]);
    if (er.rowCount === 0) {
      await client.query(createQuery, [shop_id, phone_id, color, quantity]);
    } else {
      const prevQuantity = er.rows[0].quantity;
      await client.query(updateQuery, [
        shop_id,
        phone_id,
        color,
        quantity + prevQuantity,
      ]);
    }
    res.status(200).json(req.body);
  } catch (error) {
    next(error);
  }
};

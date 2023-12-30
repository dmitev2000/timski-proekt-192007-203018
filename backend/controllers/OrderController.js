import client from "../db/index.js";
import { CreateError } from "../shared/Utils.js";

export const PlaceOrder = async (req, res, next) => {
  try {
    const { user_id } = req.body;

    const date = new Date().toISOString();

    const query1 = `
        INSERT INTO develop.orders (order_id, order_date, user_id) 
            VALUES (default, $1, $2)
    `;

    const query2 = `
      SELECT order_id FROM develop.orders WHERE user_id = $1 AND order_date = $2`;

    const query3 = `SELECT * 
                      FROM develop.carts ca
                      JOIN develop.products_in_carts pic ON ca.cart_id = pic.cart_id 
                      WHERE ca.user_id = $1`;

    await client.query(query1, [date, user_id]);

    const { order_id } = (await client.query(query2, [user_id, date])).rows[0];

    const { rows } = await client.query(query3, [user_id]);

    if (Array.isArray(rows) && rows.length > 0) {
      const query4 = `INSERT INTO develop.products_in_orders (order_id, phone_id, shop_id, color, quantity) VALUES ($1, $2, $3, $4, $5)`;
      for (const row of rows) {
        await client.query(query4, [
          +order_id,
          row.phone_id,
          row.shop_id,
          row.color,
          row.quantity,
        ]);
      }
    } else {
      return next(CreateError(400, "Can't place order, your cart is empty."));
    }

    const { cart_id } = (
      await client.query(
        `SELECT cart_id FROM develop.carts WHERE user_id = $1`,
        [user_id]
      )
    ).rows[0];

    await client.query(
      `DELETE FROM develop.products_in_carts WHERE cart_id = $1`,
      [cart_id]
    );

    res.status(200).json("Order placed successfully.");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const MyOrders = async (req, res, next) => {
  try {
    const { user_id } = req.params;

    const query1 = `SELECT o.order_id, o.order_date, o.user_id, q1.total 
                    FROM develop.orders o
                    LEFT JOIN (
                        SELECT pio.order_id, SUM(price) AS total 
                        FROM develop.products_in_orders pio
                        JOIN develop.sell s ON s.phone_id = pio.phone_id AND s.shop_id = pio.shop_id
                        GROUP BY pio.order_id
                    ) AS q1 ON q1.order_id = o.order_id
                    WHERE user_id = $1`;

    const orders = (await client.query(query1, [user_id])).rows;

    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

export const GetOrderDetails = async (req, res, next) => {
  try {
    const { order_id } = req.params;
    const query = `SELECT o.order_id, 
                    o.order_date, 
                    o.user_id, 
                    pio.phone_id, 
                    pio.shop_id, 
                    ts.shop_name, 
                    ts.shop_logo, 
                    s.price, 
                    ph.phone_name, 
                    ph.phone_img, 
                    ph.a_year,
                    br.brand_name,
                    br.brand_logo,
                    pio.quantity,
                    pio.color
                  FROM develop.orders o
                  JOIN develop.products_in_orders pio ON o.order_id = pio.order_id
                  JOIN develop.sell s ON s.phone_id = pio.phone_id AND s.shop_id = pio.shop_id
                  JOIN develop.phones ph ON ph.phone_id = s.phone_id
                  JOIN develop.produce pr ON pr.phone_id = ph.phone_id
                  JOIN develop.phone_brands br ON br.brand_id = pr.brand_id
                  JOIN develop.tech_shops ts ON pio.shop_id = ts.shop_id
                  WHERE o.order_id = $1`;
    const { rows } = await client.query(query, [order_id]);
    res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};

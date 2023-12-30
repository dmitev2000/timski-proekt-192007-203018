import client from "../db/index.js";
import { CreateError } from "../shared/Utils.js";

export const GetCartItems = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const query = `SELECT 
                      ph.phone_id, 
                      ph.phone_name, 
                      ph.phone_img, 
                      pb.brand_name, 
                      pb.brand_logo, 
                      pc.color,
                      pc.quantity, 
                      s.price,
                      ts.shop_id,
                      ts.shop_name,
                      ts.shop_logo
                    FROM develop.users u
                      JOIN develop.carts c ON u.user_id = c.user_id
                      JOIN develop.products_in_carts pc ON c.cart_id = pc.cart_id
                      JOIN develop.phones ph ON ph.phone_id = pc.phone_id
                      JOIN develop.tech_shops ts ON ts.shop_id = pc.shop_id
                      JOIN develop.sell s ON s.shop_id = ts.shop_id AND s.phone_id = ph.phone_id
                      JOIN develop.produce pr ON pr.phone_id = ph.phone_id
                      JOIN develop.phone_brands pb ON pb.brand_id = pr.brand_id
                    WHERE u.user_id = $1
                    ORDER BY c.cart_id ASC, ph.phone_id ASC, ts.shop_id ASC`;
    const resp = await client.query(query, [user_id]);
    res.status(200).json(resp.rows);
  } catch (error) {
    next(error);
  }
};

export const AddProductToCart = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const { phone_id, shop_id, color, quantityToAdd } = req.body;
    const cart_query = `SELECT cart_id FROM develop.carts WHERE user_id = $1`;
    const cart_resp = await client.query(cart_query, [user_id]);
    const { cart_id } = cart_resp.rows[0];
    const exists_query = `SELECT * 
                              FROM develop.products_in_carts 
                              WHERE cart_id = $1 AND phone_id = $2 AND shop_id = $3 AND color = $4`;
    const exists = await client.query(exists_query, [
      cart_id,
      phone_id,
      shop_id,
      color,
    ]);
    let resp_message;
    if (exists.rowCount > 0) {
      const { quantity } = exists.rows[0];
      const update_query = `UPDATE develop.products_in_carts 
                              SET quantity = $5 
                            WHERE cart_id = $1 AND phone_id = $2 AND shop_id = $3 AND color = $4`;
      await client.query(update_query, [
        cart_id,
        phone_id,
        shop_id,
        color,
        quantity + quantityToAdd,
      ]);
      resp_message = "Item quantity updated successfully.";
    } else {
      const query = `INSERT INTO develop.products_in_carts(cart_id, phone_id, shop_id, color, quantity) 
                        VALUES ($1, $2, $3, $4, $5)`;
      await client.query(query, [
        cart_id,
        phone_id,
        shop_id,
        color,
        quantityToAdd,
      ]);
      resp_message = "Item added to cart successfully.";
    }
    res.status(200).json(resp_message);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const RemoveItemFromCart = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const { phone_id, shop_id, color, all } = req.body;
    const quantity_query = `SELECT quantity FROM develop.products_in_carts pc 
                              WHERE pc.cart_id = (SELECT cart_id FROM develop.carts c WHERE c.user_id = $1)
                                  AND pc.phone_id = $2
                                  AND pc.shop_id = $3
                                  AND pc.color = $4`;
    const resp = await client.query(quantity_query, [
      +user_id,
      phone_id,
      shop_id,
      color,
    ]);
    const { quantity } = resp.rows[0];
    const d_query = `DELETE FROM develop.products_in_carts pc
                        WHERE pc.cart_id = (SELECT cart_id FROM develop.carts c WHERE c.user_id = $1)
                            AND pc.phone_id = $2
                            AND pc.shop_id = $3
                            AND pc.color = $4`;
    const u_query = `UPDATE develop.products_in_carts pc SET quantity = $5
                        WHERE pc.cart_id = (SELECT cart_id FROM develop.carts c WHERE c.user_id = $1)
                            AND pc.phone_id = $2
                            AND pc.shop_id = $3
                            AND pc.color = $4`;
    let resp_message;
    if (all || quantity === 1) {
      await client.query(d_query, [+user_id, phone_id, shop_id, color]);
      resp_message = "Item removed from cart successfully.";
    } else {
      await client.query(u_query, [
        +user_id,
        phone_id,
        shop_id,
        color,
        quantity - 1,
      ]);
      resp_message = "Item quantity updated successfully.";
    }
    res.status(200).json(resp_message);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const EmptyCart = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const query = `DELETE FROM develop.products_in_carts WHERE cart_id = (
                      SELECT c.cart_id FROM develop.carts c WHERE c.user_id = $1
                    )`;
    await client.query(query, [user_id]);
    res.status(200).json("Your cart is now empty.");
  } catch (error) {
    next(CreateError(400, "Unable to empty your cart. Try again..."));
  }
};
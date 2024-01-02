import { CreateError } from "../shared/Utils.js";
import client from "../db/index.js";
import { Parser } from "json2csv";

export const GetCustomers = async (req, res, next) => {
  try {
    const query = `SELECT u.user_id as id, u.user_name, u.verified FROM develop.users u 
                        WHERE u.role_id = (
                            SELECT role_id FROM develop.roles r WHERE r.role_name = $1 
                        )`;
    const resp = await client.query(query, ["Customer"]);
    res.status(200).json(resp.rows);
  } catch (error) {
    next(error);
  }
};

export const GetUsers = async (req, res, next) => {
  try {
    const query = `SELECT u.user_id as id, u.user_name, u.verified, r.role_name FROM develop.users u
                        JOIN develop.roles r ON u.role_id = r.role_id`;
    const resp = await client.query(query);
    res.status(200).json(resp.rows);
  } catch (error) {
    next(error);
  }
};

export const DeleteUsers = async (req, res, next) => {
  try {
    const { user_ids } = req.body;
    if (!user_ids || user_ids.length === 0) {
      return next(CreateError(400, "Please provide user id(s)."));
    }
    const user_idArray = user_ids.map((id) => `'${id}'`).join(",");
    const query = `DELETE FROM develop.users WHERE user_id::text = ANY (ARRAY[${user_idArray}])`;
    await client.query(query);
    res
      .status(200)
      .json(`Account${user_ids.length > 1 ? "s have" : " has"} been deleted.`);
  } catch (error) {
    next(error);
  }
};

export const VerifySellerAccount = async (req, res, next) => {
  try {
    const { seller_id } = req.body;
    const query = `UPDATE develop.users SET verified = true WHERE user_id = $1`;
    await client.query(query, [seller_id]);
    res.status(200).json("Seller account verified successfully.");
  } catch (error) {
    next(error);
  }
};

export const ExportToCSV = async (req, res, next) => {
  try {
    const users = await client.query(
      "SELECT user_id AS id, user_name, verified FROM develop.users"
    );
    const file_header = ["User ID", "Username", "Verified"];
    const json_data = new Parser({ file_header });
    const csv_data = json_data.parse(users.rows);
    res.status(200).type("text/csv").attachment("exported.csv").end(csv_data);
  } catch (error) {
    next(error);
  }
};

export const CountOrders = async (req, res, next) => {
  try {
    const query = `SELECT COUNT(*) AS total FROM develop.orders`;
    const a = (await client.query(query)).rows[0];
    res.status(200).json(a.total);
  } catch (error) {
    next(error);
  }
};

export const TotalSales = async (req, res, next) => {
  try {
    const query = `SELECT SUM(s.price * pio.quantity) AS total 
                      FROM develop.orders o
                      JOIN develop.products_in_orders pio ON o.order_id = pio.order_id
                      JOIN develop.sell s ON s.phone_id = pio.phone_id AND s.shop_id = pio.shop_id`;
    const a = (await client.query(query)).rows[0];
    res.status(200).json(a.total);
  } catch (error) {
    next(error);
  }
};

export const AddDeviceToDB = async (req, res, next) => {
  try {
    const imageFileName = req.file.originalname;
    const { converted_json, brand, colors } = req.body;
    const colors_arr = colors.split(",");
    const parsed_json = JSON.parse(converted_json);
    const phone_query = `INSERT INTO develop.phones (phone_id, phone_name, phone_img, a_year, network_spec, body_dimensions, 
                            body_weight, body_sim, display_type, display_size, display_resolution, platform_os,
                            platform_chipset, platform_cpu, platform_gpu, memory_card_slot, memory_internal, main_camera_type,
                            main_camera_spec, main_camera_features, main_camera_video, selfie_camera_type, selfie_camera_spec,
                            selfie_camera_features, selfie_camera_video, sound_loudspaeker, sound_jack, comms_wlan, comms_bluetooth,
                            comms_positioning, comms_nfc, comms_radio, comms_usb, sensors, battery_type, battery_charging) 
                            VALUES (default, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, 
                              $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35)`;
    const brand_query = `INSERT INTO develop.produce (brand_id, phone_id) VALUES ($1, $2)`;
    const color_query = `INSERT INTO develop.phone_colors (phone_id, color) VALUES ($1, $2)`;
    const getPhone_query =
      "SELECT phone_id FROM develop.phones WHERE phone_name = $1";
    const getBrand_query =
      "SELECT brand_id FROM develop.phone_brands WHERE brand_name = $1";
    await client.query(phone_query, [
      parsed_json.phone_name,
      imageFileName,
      parsed_json.a_year,
      parsed_json.network_spec,
      parsed_json.body_dimensions,
      parsed_json.body_weight,
      parsed_json.body_sim,
      parsed_json.display_type,
      parsed_json.display_size,
      parsed_json.display_resolution,
      parsed_json.platform_os,
      parsed_json.platform_chipset,
      parsed_json.platform_cpu,
      parsed_json.platform_gpu,
      parsed_json.memory_card_slot,
      parsed_json.memory_internal,
      parsed_json.main_camera_type,
      parsed_json.main_camera_spec,
      parsed_json.main_camera_features,
      parsed_json.main_camera_video,
      parsed_json.selfie_camera_type,
      parsed_json.selfie_camera_spec,
      parsed_json.selfie_camera_features,
      parsed_json.selfie_camera_video,
      parsed_json.sound_loudspaeker,
      parsed_json.sound_jack,
      parsed_json.comms_wlan,
      parsed_json.comms_bluetooth,
      parsed_json.comms_positioning,
      parsed_json.comms_nfc,
      parsed_json.comms_radio,
      parsed_json.comms_usb,
      parsed_json.sensors,
      parsed_json.battery_type,
      parsed_json.battery_charging,
    ]);
    const { phone_id } = (
      await client.query(getPhone_query, [parsed_json.phone_name])
    ).rows[0];
    const { brand_id } = (await client.query(getBrand_query, [brand])).rows[0];
    await client.query(brand_query, [brand_id, phone_id]);
    for (var i = 0; i < colors_arr.length; i++) {
      await client.query(color_query, [phone_id, colors_arr[i]]);
    }
    res.status(200).json("Phone added successfully.");
  } catch (error) {
    console.log(error);
    next(CreateError(500, "Failed to save the device."));
  }
};

export const GetLastWeekSales = async (req, res, next) => {
  try {
    const query = `
              SELECT
              DATE(ord.order_date) AS order_date,
              pb.brand_name,
              SUM(pio.quantity) AS total_quantity
                  FROM
                      develop.orders ord
                  JOIN
                      develop.products_in_orders pio ON ord.order_id = pio.order_id
                  JOIN
                      develop.produce pr ON pr.phone_id = pio.phone_id
                  JOIN
                      develop.phone_brands pb ON pb.brand_id = pr.brand_id
                  GROUP BY
                      DATE(ord.order_date),
                      pb.brand_name
                  ORDER BY
              order_date, pb.brand_name;
    `;

    const resp = (await client.query(query)).rows;
    res.status(200).json(resp);
  } catch (error) {
    next(error);
  }
};

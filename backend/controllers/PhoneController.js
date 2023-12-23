import client from "../db/index.js";

// ? GET ALL PHONES (or apply filter by brands and years)
export const GetAllPhones = async (req, res, next) => {
  try {
    const brands =
      req.query.brands !== undefined ? req.query.brands.split(";") : null;
    const years =
      req.query.years !== undefined ? req.query.years.split(";") : null;
    let query = `SELECT ph.phone_id, ph.phone_name, ph.phone_img, ph.a_year, pb.brand_name, pb.brand_logo FROM develop.phones ph 
                        JOIN develop.produce pr ON ph.phone_id = pr.phone_id
                        JOIN develop.phone_brands pb ON pb.brand_id = pr.brand_id `;
    let where_condition = "";
    let queryParams = [];

    if (brands) {
      queryParams.push(...brands);
      where_condition += ` pb.brand_name IN (${brands
        .map((_, index) => `$${index + 1}`)
        .join(",")})`;
    }

    if (years) {
      queryParams.push(...years);
      const start = brands !== null ? brands.length : 0;
      where_condition += `${
        where_condition.length > 0 ? " AND" : ""
      } ph.a_year::text IN (${years
        .map((_, index) => `$${index + start + 1}`)
        .join(",")})`;
    }

    if (where_condition) {
      query += `WHERE ${where_condition}`;
    }

    const response_data = await client.query(query, queryParams);

    res.status(200).json(response_data.rows);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// ? GET One Phone by ID
export const GetPhoneById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const query = `SELECT * FROM develop.phones ph
                            JOIN develop.produce pr ON ph.phone_id = pr.phone_id
                            JOIN develop.phone_brands pb ON pb.brand_id = pr.brand_id
                            WHERE ph.phone_id = ${id}`;
    const response_data = await client.query(query);
    res.status(200).json(response_data.rows);
  } catch (error) {
    next(error);
  }
};

export const GetBrandsAndCountPhones = async (req, res, next) => {
  try {
    const query = `SELECT br.brand_id, br.brand_name, COUNT(pr.phone_id)::integer AS number_of_devices
                        FROM develop.phone_brands br
                        JOIN develop.produce pr ON br.brand_id = pr.brand_id
                        GROUP BY br.brand_id, br.brand_name
                        ORDER BY br.brand_name ASC;`;
    const response_data = await client.query(query);
    res.status(200).json(response_data.rows);
  } catch (error) {
    next(error);
  }
};

export const GetYears = async (req, res, next) => {
  try {
    const query = `SELECT DISTINCT ph.a_year FROM develop.phones ph ORDER BY ph.a_year ASC`;
    const response_data = await client.query(query);
    res.status(200).json(response_data.rows);
  } catch (error) {
    next(error);
  }
};

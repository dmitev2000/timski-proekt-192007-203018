import pg from "pg";

const { Client } = pg;

// ! Change the values for database, user and password 

const client = new Client({
  host: "localhost",
  database: "YOUR_DATABASE_NAME",
  port: 5432,
  user: "YOUR_DB_USER",
  password: "YOUR_DB_PASSWORD",
});

export default client;

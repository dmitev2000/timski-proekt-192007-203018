import pg from "pg";

const { Client } = pg;

// ! Change the values for database, user and password 

const client = new Client({
  host: "localhost",
  database: "develop",
  port: 5432,
  user: "postgres",
  password: "postgres",
});

export default client;

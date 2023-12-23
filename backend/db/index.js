import pg from "pg";

const { Client } = pg;

// ! Change the values for database, user and password 

const client = new Client({
  host: "localhost",
  database: "postgres",
  port: 5432,
  user: "postgres",
  password: "postgrelocal",
});

export default client;

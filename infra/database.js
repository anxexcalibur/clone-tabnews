import { Client } from "pg";
import database from "infra/database.js";
async function query(queryObject) {
  // Test the connection before executing the actual query

  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: process.env.NODE_ENV === "development" ? false : true,
  });

  try {
    await client.connect();
    const result = await client.query(queryObject);
    return result;
  } finally {
    // O finally roda obrigatoriamente, com erro ou sem erro!
    await client.end();
  }
}

export default {
  query: query,
};

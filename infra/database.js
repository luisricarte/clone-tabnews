const { Client } = require("pg");

async function query(queryObject) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: process.env.NODE_ENV === "development" ? false : true,
  });

  console.log("Executing query:",{
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  } );

  try{  
  await client.connect();

  const result = await client.query(queryObject);
  return result;

  } catch (error) {
    console.error("Error executing query:", error.message);
    throw error;
  } finally {
  await client.end();
  }

}

module.exports = { query: query };


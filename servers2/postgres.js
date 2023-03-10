const qs = require("querystring");
const iniparser = require("iniparser");
const config = iniparser.parseSync("./config.ini");

const { Pool } = require("pg");

const pool = new Pool({
  user: config.user,
  host: config.host,
  database: config.database,
  password: config.password,
  port: config.port,
});

const postgres = async (sql) => {
  let client = await pool.connect();
  let result = await client.query(sql);
  client.release();
  return result.rows;
};

module.exports = postgres;

const iniparser = require("iniparser");
const config = iniparser.parseSync("./config.ini");
const pg = require("pg");
const types = pg.types;
types.setTypeParser(1114, function (stringValue) {
  return stringValue;
});

const { Pool } = require("pg");

const pool = new Pool({
  user: config.user,
  host: config.host,
  database: config.database,
  password: config.password,
  port: config.port,
});

const postgresNeo = async (sql, params) => {
  let client = await pool.connect();
  // console.log(sql, ' # sql ')
  // console.log(params, ' # params ')
  if (!params || params === null || params === "") {
    let result = await new Promise((resolve, reject) => {
      client.query(sql, (error, results) => {
        if (error) {
          // console.log(error, " ### debug error ");
          // console.log(sql, " # sql ");
          return reject(error); // reject(error);   // throw error
        }
        // console.log(results.rows, ' ### debug postgresNeo ')

        client.release();
        return resolve(results);
      });
    });
    return result?.rows || [];
  } else {
    let result = await new Promise((resolve, reject) => {
      // sql = 'SELECT * FROM users WHERE id = $1'
      client.query(sql, params, (error, results) => {
        if (error) {
          console.log(error, " ### debug error ");
          console.log(sql, " # sql ");
          return reject(error); // reject(error);   // throw error
        }
        // console.log(results.rows, ' ### debug params')
        client.release();
        return resolve(results);
      });
    });
    return result?.rows || [];
  }
};

module.exports = postgresNeo;

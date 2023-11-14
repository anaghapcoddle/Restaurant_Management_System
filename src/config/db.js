const util = require('util');
const mysql = require('mysql2');

const dbconfig = {
  host: 'localhost',
  user: 'root',
  password: 'ANAGHA123',
  database: 'anagha',
};

function makeDb() {
  const connection = mysql.createConnection(dbconfig);
  return {
    query(sql, args) {
      return util.promisify(connection.query)
        .call(connection, sql, args);
    },
    close() {
      return util.promisify(connection.end).call(connection);
    },
  };
}

module.exports = {
  makeDb,
};

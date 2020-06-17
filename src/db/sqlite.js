const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(":memory:");

db.allAsync = function dbAll(sql, data) {
  const that = this;
  return new Promise(((resolve, reject) => {
    that.all(sql, data, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  }));
};

db.runAsync = function dbRun(sql, data) {
  return new Promise((resolve, reject) => {
    this.run(sql, data, function executeRun(err) {
      if (err) {
        reject(err);
      } else resolve(this);
    });
  });
};

module.exports = db;

const path = require('path')
const { Database } = require('node-sqlite3-wasm')

const dbPath = path.join(__dirname, 'database.sqlite')
const db = new Database(dbPath)

// get multiple rows
function query(sql, params = []) {
  return db.prepare(sql).all(params)
}

// get one row
function queryOne(sql, params = []) {
  return db.prepare(sql).get(params)
}

// run insert/update/delete
function run(sql, params = []) {
  return db.prepare(sql).run(params)
}

module.exports = { db, query, queryOne, run }

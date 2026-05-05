// db/database.js
// We use sql.js — a pure JavaScript SQLite implementation.
// No native compilation required! Works everywhere Node.js works.

const path = require('path');
const fs   = require('fs');
const initSqlJs = require('sql.js');

const DB_PATH = path.join(__dirname, '../../data/app.db');
const dataDir = path.join(__dirname, '../../data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

let db = null;

function saveToDisk() {
  if (!db) return;
  const data = db.export();
  fs.writeFileSync(DB_PATH, Buffer.from(data));
}

async function initDB() {
  if (db) return db;

  const SQL = await initSqlJs();

  if (fs.existsSync(DB_PATH)) {
    const fileBuffer = fs.readFileSync(DB_PATH);
    db = new SQL.Database(fileBuffer);
  } else {
    db = new SQL.Database();
  }

  // Create tables
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      name       TEXT    NOT NULL,
      email      TEXT    NOT NULL UNIQUE,
      password   TEXT    NOT NULL,
      created_at TEXT    DEFAULT (datetime('now'))
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS templates (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      name          TEXT    NOT NULL,
      description   TEXT    NOT NULL,
      thumbnail_url TEXT    NOT NULL,
      category      TEXT    NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS favorites (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id     INTEGER NOT NULL,
      template_id INTEGER NOT NULL,
      created_at  TEXT    DEFAULT (datetime('now')),
      UNIQUE (user_id, template_id)
    )
  `);

  saveToDisk();
  return db;
}

// SELECT — returns array of row objects
function query(sql, params) {
  const stmt = db.prepare(sql);
  if (params) stmt.bind(params);
  const rows = [];
  while (stmt.step()) rows.push(stmt.getAsObject());
  stmt.free();
  return rows;
}

// SELECT one row or null
function queryOne(sql, params) {
  return query(sql, params)[0] || null;
}

// INSERT / UPDATE / DELETE — returns { lastInsertRowid, changes }
function execute(sql, params) {
  db.run(sql, params);
  saveToDisk();
  const meta = query('SELECT last_insert_rowid() as lastId, changes() as changes');
  return {
    lastInsertRowid: meta[0]?.lastId,
    changes: meta[0]?.changes,
  };
}

module.exports = { initDB, query, queryOne, execute };

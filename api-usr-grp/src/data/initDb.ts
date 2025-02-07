const { openDb } = require('./database.ts');

async function initDb() {
  const db = await openDb();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS Post (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      content TEXT
    );
    CREATE TABLE IF NOT EXISTS Comment (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      postId INTEGER,
      content TEXT,
      FOREIGN KEY (postId) REFERENCES Post(id)
    );
  `);
  console.log('Database initialized');
}

initDb();
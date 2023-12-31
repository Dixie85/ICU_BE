import mySqlite3 from 'sqlite3'
const sqlite3 = mySqlite3.verbose();

const db = new sqlite3.Database('icudatabase.db', (err) => {
    if (err) {
        console.error( err.message, 'db connect error');
    } else {
        console.log('Connected to icudatabase.db.');
        db.run(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, ip TEXT, lat REAL, lng REAL, country TEXT, date DATE)`);
    }
});

export default db


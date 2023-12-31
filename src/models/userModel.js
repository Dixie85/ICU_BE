import db from '../../db/dbSetup.js';


// Models for endpoints requiring IP from the FrontEnd
// Start ===> 
const addUser = async ({ ip, lat, lng, country, date }) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM users WHERE ip = ? AND date = ?', [ip, date], (err, existingUser) => {
            if (err) {
                reject({ message: 'Internal Server Error' })
            } else if (existingUser) {
                reject({ message: 'User with the same IP and date already exists' });
            } else {db.run('INSERT INTO users (ip, lat, lng, country, date) VALUES (?, ?, ?, ?, ?)', [ip, lat, lng, country, date], (dbErr) => {
                if (dbErr) {
                    reject({ message: 'Error adding to database' });
                } else {
                    resolve({ message: 'User added successfully' });
                }
            })};
        });
    });
};

const getUsers = async () => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM users', (dbErr, rows) => {
            if (dbErr) {
                reject({ message: 'Error getting users' });
            } else {
                const userData = rows.map((row) => ({ id: row.id, ip: row.ip, lat: row.lat, lng: row.lng, country: row.country, date: row.date }));
                resolve(userData);
            }
        });
    });
};

const getUsersSortByCountry = async ({ country }) => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM users WHERE country = ?', [country] ,(dbErr, rows) => {
            if (dbErr) {
                reject({ message: 'Error getting users' });
            } else {
                const userData = rows.map((row) => ({ id: row.id, ip: row.ip, lat: row.lat, lng: row.lng, country: row.country, date: row.date }));
                resolve(userData);
            }
        });
    });
};

const getUsersSortByDate = async ({ date }) => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM users WHERE date = ?', [date] ,(dbErr, rows) => {
            if (dbErr) {
                reject({ message: 'Error getting users' });
            } else {
                const userData = rows.map((row) => ({ id: row.id, ip: row.ip, lat: row.lat, lng: row.lng, country: row.country, date: row.date }));
                resolve(userData);
            }
        });
    });
};
// <=== End

export default {
  addUser,
  getUsers,
  getUsersSortByCountry,
  getUsersSortByDate
}
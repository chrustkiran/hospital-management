var mysql = require('mysql');

export const db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "1234",
        database:"hospital"
    });

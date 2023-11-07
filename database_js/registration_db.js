const mysql = require('mysql');


const registration_in = (mail_in, password_in) => {
    // Database connection configuration
    const con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "wpproject"
    });

    // Connect to the database
    con.connect((err) => {
        if (err) throw err;
        console.log("Connected!");

        // SQL query
        const user_in = `INSERT INTO user(mail, password) VALUES ('${mail_in}', '${password_in}')`

        // Execute the query to create the table
        con.query(user_in, (err, data) => {
            if (err) throw err;
            console.log('Database Updated');
            con.end();
        });
    });
}

module.exports = {registration_in};
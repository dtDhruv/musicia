const mysql = require('mysql');

const admin_check = (mail, pass, callback) => {
    const con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "wpproject"
    });

    con.connect((err) => {
        if (err) throw err;
        console.log("Connected!");

        // SQL query
        const search = `
            SELECT mail, password FROM user WHERE mail = '${mail}'`;

        // Execute the query to create the table
        con.query(search, (err, data) => {
            if (err) throw err;
            console.log('Database Searched');

            if (data.length > 0) {
                const { mail: base_mail, password: base_password } = data[0];
                console.log(mail+" "+pass)

                // Check if the provided password matches the stored password
                if (pass === base_password && mail == 'admin@musicia.com') {
                    // Close the connection after the query is executed
                    con.end();

                    // Call the callback function with true since the passwords match
                    callback(true);
                } else {
                    // If passwords do not match, close the connection and call the callback with false
                    con.end();
                    callback(false);
                }
            } else {
                // If no data found, close the connection and call the callback with false
                con.end();
                callback(false);
            }
        });
    });
}

module.exports = { admin_check };

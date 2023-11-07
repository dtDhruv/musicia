const mysql = require('mysql');

const ser = (search_name, callback) => {
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
        const search = `
            SELECT music_link FROM music WHERE music_name = '${search_name}'`;

        // Execute the query to create the table
        con.query(search, (err, data) => {
            if (err) throw err;
            console.log('Database Searched');

            if (data.length > 0) {
                var { music_link } = data[0];
                music_link = music_link.toString();
                // Close the connection after the query is executed
                con.end();

                // Call the callback function with the result
                callback(music_link);
            } else {
                // If no data found, close the connection and call the callback with null
                con.end();
                callback(null);
            }
        });
    });
}

module.exports = { ser };

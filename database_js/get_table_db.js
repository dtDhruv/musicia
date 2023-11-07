const mysql = require('mysql');

const get_table = async (table_name) => {
    const con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "wpproject"
    });

    try {
        await new Promise((resolve, reject) => {
            con.connect((err) => {
                if (err) {
                    reject(err);
                    return;
                }
                console.log("Connected!");
                resolve();
            });
        });

        // SQL query
        const search = `SELECT * FROM ${table_name}`;

        // Execute the query to create the table
        const data = await new Promise((resolve, reject) => {
            con.query(search, (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                console.log('Database Searched');
                resolve(data);
            });
        });

        // Close the connection
        con.end();

        return data;
    } catch (error) {
        throw error;
    }
};

module.exports = { get_table };

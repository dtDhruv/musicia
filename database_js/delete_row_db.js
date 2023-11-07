const mysql = require('mysql');

const delete_row = async (id_in) => {
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
        const search = `DELETE FROM music WHERE music_id = ${id_in}`;

        const data = await new Promise((resolve, reject) => {
            con.query(search, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }

                if (result.affectedRows === 0) {
                    // No rows were affected, indicating that the music_id doesn't exist
                    console.log('No rows deleted. Music ID does not exist.');
                    resolve(false);
                } else {
                    console.log('Row deleted');
                    resolve(true);
                }
            });
        });

        // Close the connection
        con.end();

        return data;
    } catch (error) {
        throw error;
    }
};

module.exports = { delete_row };

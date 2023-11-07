const mysql = require('mysql');

const update_row = async (id_in, name_in) => {
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

        var search = `UPDATE music
        SET music_name = '${name_in}'
        WHERE music_id = ${id_in};`

        const data = await new Promise((resolve, reject) => {
            con.query(search, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }

                if (result.affectedRows === 0) {
                    // No rows were affected, indicating that the music_id doesn't exist
                    console.log('No rows Updated. Music ID does not exist.');
                    resolve(false);
                } else {
                    console.log('Row Updated');
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

module.exports = { update_row };

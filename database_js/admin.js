const mysql = require('mysql');


const music_in = (music_id, music_name, artist, musiclink) => {
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
        var music_query = `INSERT INTO music VALUES ('${music_id}', '${music_name}','${artist}', '${musiclink}')`

        // Execute the query to create the table
        con.query(music_query, (err, data) => {
            if (err) throw err;
            console.log('Database Updated');
            con.end();
        });
    });
}

module.exports = {music_in};
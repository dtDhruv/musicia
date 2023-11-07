const express = require('express');
const path = require('path');
const multer = require('multer');
const { registration_in } = require('./database_js/registration_db.js');
const { ser } = require('./database_js/search_music_db.js')
const format = require('./js/format_text.js');
const { music_in } = require('./database_js/admin.js');
const { admin_check } = require('./database_js/check_admin_db.js');
const { user_check } = require('./database_js/check_user_login_db.js');
const { get_table } = require('./database_js/get_table_db.js');
const { delete_row } = require('./database_js/delete_row_db.js')
const { update_row } = require('./database_js/update_row_db.js')

const app = express();
const port = 5000;

app.use(express.static(__dirname));
app.use(express.urlencoded({ extended:false }))
app.set('view engine', 'ejs');
app.set('views', __dirname);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'homepage.html'));
});

app.post('/registration_done', (req, res) => {
    // console.log(req.body)
    //variable name should be the same as the name given to the input attribute in the html form
    var { mail, password } = req.body
    console.log(mail)
    console.log(password);
    registration_in(mail, password);
    res.status(200).sendFile(path.join(__dirname, 'registration_done.html'));
});

app.post('/play_music', (req, res) => {
    var { music_name } = req.body;
    music_name = format.removeSpacesAndLowerCase(music_name);
    console.log(music_name);
    //var musicSource = "music/alive.mp3";
    //var musicSource = "music/alive.mp3";
    var musicSource = "";
    ser(music_name, (result) => {
        console.log(result);
        musicSource = result;
        if(!musicSource){
            res.status(401).sendFile(path.join(__dirname, 'music_unavailable.html'));
        }
        else{
            res.status(200).render('musicplayer', { musicSource });
        }
    });
    console.log(musicSource);
    // res.sendFile(path.join(__dirname, 'musicplayer.html', { musicSource }));
});

app.post('/play_music_genre', (req, res) => {
    var music_name="alive"
    music_name = format.removeSpacesAndLowerCase(music_name);
    console.log(music_name);
    var musicSource = "music/alive.mp3";
    //var musicSource = "music/alive.mp3";
    //var musicSource = "";
    ser(music_name, (result) => {
        console.log(result);
        musicSource = result;
        if(!musicSource){
            res.status(401).sendFile(path.join(__dirname, 'music_unavailable.html'));
        }
        else{
            res.status(200).render('musicplayer', { musicSource });
        }
    });
    console.log(musicSource);
    // res.sendFile(path.join(__dirname, 'musicplayer.html', { musicSource }));
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'music/'); // Specify the destination folder
    },
    filename: function (req, file, cb) {
      var fileName = req.body.m_name + '.mp3';
      cb(null, fileName); // Use the original name for the file
    },
  });
  
  const upload = multer({ storage: storage });
  
  // Define a route to handle file uploads
app.post('/music_upload', upload.single('m_link'), (req, res) => {
    var id = req.body.m_id;
    var name = req.body.m_name;
    var artistName = req.body.artist_name;
    var link = "music/"+ name + ".mp3";

    //inserting into database
    music_in(id,name,artistName,link);

    console.log('ID Number:', id);
    console.log('Name:', name);
    console.log('Artist Name:', artistName);
    res.status(200).sendFile(path.join(__dirname, 'file_success.html'));
});

app.post('/login', (req, res) => {
    const { mail, password } = req.body;

    admin_check(mail, password, (isAdmin) => {
        if (isAdmin) {
            res.status(200).sendFile(path.join(__dirname, 'admin_page.html'));
        } else {
            //res.status(200).sendFile(path.join(__dirname, 'searchprototype.html'));
            user_check(mail, password, (isUser) => {
                if (isUser) {
                    res.status(200).sendFile(path.join(__dirname, 'searchprototype.html'));
                } else {
                    res.status(200).sendFile(path.join(__dirname, 'registration.html'));
                }
            });
        }
    });
});

app.post('/get_music_table', async (req, res) => {
    try {
        const result = await get_table('music');
        console.table(result);
        res.render('music_table_display', { tableData: result });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/get_user_table', async (req, res) => {
    try {
        const result = await get_table('user');
        console.table(result);
        res.render('user_table_display', { tableData: result });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/delete_row', async (req, res) => {
    var id = req.body.mu_id;
    console.log(id);
    try {
        const result = await delete_row(id);
        if(result == true){
            res.status(200).sendFile(path.join(__dirname, 'op_success.html'));
        }
        else{
            res.status(200).sendFile(path.join(__dirname, 'op_fail.html'));
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/music_update', async (req, res) => {
    var id = req.body.m_id;
    var m_name = req.body.m_name;
    console.log(id);
    try {
        const result = await update_row(id, m_name);
        if(result == true){
            res.status(200).sendFile(path.join(__dirname, 'op_success.html'));
        }
        else{
            res.status(200).sendFile(path.join(__dirname, 'op_fail.html'));
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

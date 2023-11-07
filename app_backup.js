const express = require('express');
const path = require('path');
const { registration_in } = require('./registration_db');
const { ser } = require('./search_music_db')
const format = require('./format_text');

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

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();
const {getHomePage} = require('./routes/index');
const {addPlayerPage, addPlayer, deletePlayer, editPlayer, editPlayerPage} = require('./routes/player');
const port = 5000;

const db = mysql.createConnection ({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'socka'
});

db.connect((err) => {
	if (err){
		//throw err;
		db.on('error', function(err) {
			console.log("[mysql error]",err);
		});
	}
	console.log('Connected to database');
})
global.db = db;


app
	.set('port', process.env.port || port) // set express to use this port
	.set('views', __dirname + '/views') // set express to look in this folder to render our view
	.set('view engine', 'ejs') // configure template engine
	.use(bodyParser.urlencoded({ extended: false }))
	.use(bodyParser.json()) // parse form data client
	.use(express.static(path.join(__dirname, 'public'))) // configure express to use public folder
	.use(fileUpload()) // configure fileupload
	.get('/', getHomePage)
	.get('/add', addPlayerPage)
	.get('/edit/:id', editPlayerPage)
	.get('/delete/:id', deletePlayer)
	.post('/add', addPlayer)
	.post('/edit/:id', editPlayer)
	.listen(port, () => {
		console.log(`Server running on port: ${port}`);
	});
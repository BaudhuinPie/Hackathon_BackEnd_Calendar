const express = require('express');
const sapp=express();

const port = 5000;

const cors = require('cors'); // Pour bypasser les cross-origins securities // il faut npm i cors

console.log('hello world!');

const routeur = express.Router(); // fonctionnalités en plus de simplement NODE.

//const opCors = { methods: 'POST'};

sapp.use('/api/', routeur);
routeur.use(express.json())
routeur.use(express.urlencoded({extended:true}) ) ;
//routeur.use(cors(opCors))

//==============================

const mysql = require('mysql');
//local mysql db connection
const sql = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '0insTallation9-123',
    database : 'mymoviesdb'
});
sql.connect(function(err) {
    if (err) throw err;
		console.log(`Connected to database`);
});

//===============================

routeur.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });



//===============================


//POST
routeur.post('/movies', (req,res) => {
    const newmovie = req.body;
    console.log("data received for Post on SERVEUR "+port);
    console.log(newmovie);
    console.log('req : '+ newmovie + req.get("year")); // il faut que dans le formulaire (fornt-end), il y ai précisé le type de donnée envoyée (l'objet fetched)
    res.send('Test working');
})

//GET
routeur.get('/movies', (req, res)=> {
    console.log("getting movie for Get server :" + req);

    sql.query('SELECT * FROM movies', (err, results)=> {
        if(err){
            console.log('error to get movies datas');
            res.status(500).send('There is an error to retrieve datas'+err)
        }else{
            res.json(results);
            console.log("Data returned to GET req.")
        }
    })
})
sapp.listen(port, err => {
    console.log("sapp is listneing on port"+ port)
    if(err) {
        console.log("something bad happened :"+ err)
    }else{
        console.log("sapp is ready to react !");
    }
})




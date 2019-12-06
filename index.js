const express = require('express');
const sapp=express();

const port = 5555;

//const cors = require('cors'); // Pour bypasser les cross-origins securities // il faut npm i cors

console.log('Server drived for launch on port '+ port);

const routeur = express.Router(); // fonctionnalités en plus de simplement NODE.

//const opCors = { methods: 'POST'};

sapp.use('/akacalendar/', routeur);
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
    database : 'calend_db'
});
sql.connect(function(err) {
    if (err) {console.log(`Port connexion on calendar_db : broken.`); throw err;};
	console.log(`Port connexion on calendar_db : active.`);
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
routeur.post('/mycalendar',  (req,res) => {
    const newmo = req.body;
        console.log("data received for Post/mycalendar on SERVEUR "+port);
        console.log(newmo);
            let newlol = JSON.stringify(newmo);
        console.log('req : ', newlol );// il faut que dans le formulaire (fornt-end), il y ai précisé le type de donnée envoyée (l'objet fetched)
        sql.query('UPDATE `mycalendar` SET statedisplay = ? ;', newlol, (err, results)=> {
            if(err){
                console.log('error to store in  STateDIsplay datas');
                res.status(500).send('There is an error to store datas', err);
            }else{
                console.log("Data returned to POST /mycalendar :: status 200.");
                res.status(200) ;
                
                res.end();
            }
        })
})

routeur.post('/mycalendar/:pitchname',  (req,res) => {
    const newmo = req.params.pitchname;
        console.log("data received for Post/mycalendar/:pitchname on SERVEUR "+port);
        console.log(newmo);
            let newlol = JSON.stringify(newmo);
        console.log('req : ', newlol );// il faut que dans le formulaire (fornt-end), il y ai précisé le type de donnée envoyée (l'objet fetched)
        sql.query('UPDATE `mycalendar` SET pitchname = ? ;', newlol, (err, results)=> {
            if(err){
                console.log('error to store in  STateDIsplay datas');
                res.status(500).send('There is an error to store datas', err);
            }else{
                console.log("Data returned to POST /mycalendar :: status 200.");
                res.status(200) ;
                
                res.end();
            }
        })
})



routeur.post('/mybubbles', (req,res) => {
    const newmo = req.body;
        console.log("data received for Post/mybubbles on SERVEUR "+port);
        console.log(newmo);
            let newlol = JSON.stringify(newmo);
        console.log('req : ', newlol );// il faut que dans le formulaire (fornt-end), il y ai précisé le type de donnée envoyée (l'objet fetched)
        sql.query('UPDATE `mybubble` SET statebubblecontent = ? ;', newlol, (err, results)=> {
            if(err){
                console.log('error to store in  STateBUbbleCOntent datas');
                res.status(500).send('There is an error to store datas', err);
            }else{
                console.log("Data returned to POST /mybubbles :: status 200.");
                res.status(200) ;
                
                res.end();
            }
        })

    
    res.send('Test working');
})

routeur.post('/asbl', (req,res) => {
    const newmo = req.body;
    console.log("data received for Post/asbl on SERVEUR "+port);
    console.log(newmo);
    console.log('req : ', newmo ); // il faut que dans le formulaire (fornt-end), il y ai précisé le type de donnée envoyée (l'objet fetched)
    res.send('Test working');
})

//GET
routeur.get('/mycalendar', (req, res)=> {
    console.log("Request STateDIsplay on GET method for '/mycalendar' : ");
   
    sql.query('SELECT * FROM mycalendar', (err, results)=> {
        if(err){
            console.log('error to get STateDIsplay datas');
            res.status(500).send('There is an error to retrieve datas', err);
        }else{
            res.json(results) ;
            console.log("Data returned to GET/mycalendar req.", results);
        }
    })
});

routeur.get('/mybubbles', (req, res)=> {
    console.log("Request STateBUbbleCOntent on GET method for '/mybubbles' : ");

    sql.query('SELECT * FROM mybubble', (err, results)=> {
        if(err){
            console.log('error to get STateBUbbleCOntent datas');
            res.status(500).send('There is an error to retrieve datas', err);
        }else{
            res.json(results);
            console.log("Data returned to GET/mybubbles req.", results);
        }
    })
});

routeur.get('/asbl', (req, res)=> {
    console.log("Request STateLIst on GET method for '/asbl' : ");

    sql.query('SELECT * FROM asbl', (err, results)=> {
        if(err){
            console.log('error to get STateLIst datas');
            res.status(500).send('There is an error to retrieve datas', err);
        }else{
            res.json(results);
            console.log("Data returned to GET/asbl req.", results);
        }
    })
});




// listen
sapp.listen(port, err => {
    console.log("server ready & start listening. Launch on "+ port)
    if(err) {
        console.log("Crashed ? Something bad happened :"+ err)
    }else{
        console.log("Server is now in orbit. It is GO for routing !");
    }
})




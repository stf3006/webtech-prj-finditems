var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var Sequelize = require("sequelize");
var sequelize = new Sequelize("items", "alekz21", "");

app.use(express.static(__dirname + "/app"));
app.use(bodyParser.json()); // pentru datele din formular


// Modele

var Category = sequelize.import("app/models/category.js");
var FoundObject = sequelize.import("app/models/foundobject.js");
var LostObject = sequelize.import("app/models/lostobject.js");

FoundObject.belongsTo(Category, {
    foreignKey: {
        allowNull: false
    },
    onDelete: 'CASCADE' // tine de legatura pe care o creeaza
});

LostObject.belongsTo(Category, {
    foreignKey: {
        allowNull: false
    },
    onDelete: 'CASCADE' // tine de legatura pe care o creeaza
});



// Serviciu REST

app.get("/sync", function(req, res) {

    Category.sync({
        force: true
    });

    Category.create({
        name: "Electronice"
    });
    Category.create({
        name: "Electrocasnice"
    });
    Category.create({
        name: "Personale"
    });

    LostObject.sync({
        force: true
    });

    FoundObject.sync({
        force: true
    }).then(function() {
        res.send("Sincronizare cu succes!"); // tradus

    });

});


app.get("/rest/categories", function(req, res) { // returneaza toate cat
    Category.findAll().then(function(items) {
        res.json(items); // transforma items in format json
    }).catch(function(error) {
        res.status(500).send("Error: " + error);
    });
});

app.get("/rest/foundobjects", function(req, res) { // returneaza toate ob gasite
    FoundObject.findAll().then(function(items) {
        res.json(items); // transforma items in format json
    }).catch(function(error) {
        res.status(500).send("Error: " + error);
    });
});

app.get("/rest/lostobjects", function(req, res) { // afisare toate ob pierdute
    LostObject.findAll().then(function(items) {
        res.json(items); // transforma items in format json
    }).catch(function(error) {
        res.status(500).send("Error: " + error);
    });
});

app.post("/rest/foundobjects", function(req, res) { // insert obiect gasit
    FoundObject.create(req.body).then(function(item) {
        res.json(item);
    }).catch(function(error) {
        console.log(error);
        res.status(500).send("Error: " + error);
    });
});

app.post("/rest/lostobjects", function(req, res) { // insert obiect pierdut
    LostObject.create(req.body).then(function(item) {
        res.json(item);
    }).catch(function(error) {
        console.log(error);
        res.status(500).send("Error: " + error);
    });
});

app.delete("/rest/lostobjects/:id", function(req, res) {
    LostObject.find({
        where: {
            id: req.params.id
        }
    }).then(function(obj) {
        obj.destroy();

    }).then(function() {

        res.send("sters cu succes!");

    }).catch(function(error) {
        console.log(error);
        res.status(500).send("Error: " + error);
    });

});

app.delete("/rest/foundobjects/:id", function(req, res) {
    FoundObject.find({
        where: {
            id: req.params.id
        }
    }).then(function(obj) {
        obj.destroy();

    }).then(function() {

        res.send("sters cu succes!");

    }).catch(function(error) {
        console.log(error);
        res.status(500).send("Error: " + error);
    });

});

app.put("/rest/foundobjects/:id", function(req, res) {
    FoundObject.find({
        where: {
            id:req.params.id
        }
    }).then(function(obj){
        obj.updateAttributes(req.body);
    }).then(function(){
        res.send("modificat cu succes!");
    }).catch(function(error) {
        console.log(error);
        res.status(500).send("Error: " + error);
    });
});

app.put("/rest/lostobjects/:id", function(req, res) {
    LostObject.find({
        where: {
            id:req.params.id
        }
    }).then(function(obj){
        obj.updateAttributes(req.body);
    }).then(function(){
        res.send("modificat cu succes!");
    }).catch(function(error) {
        console.log(error);
        res.status(500).send("Error: " + error);
    });
});



// Pagina principala

app.get("*", function(req, res) { // request / response
    res.sendfile("./app/index.html");
});

app.listen(process.env.PORT); // porneste serverul - asculta pe portul respectiv

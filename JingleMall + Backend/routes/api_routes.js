const express = require('express');
const orm = require('../config/orm.js');

const router = express.Router();

router.get("/api/items", async function(req, res){
    const response = await orm.getList();
    console.log(response);
    res.send(response);
});

router.get("/api/items/:id", async function(req, res){
    const response = await orm.getList(req.params.id);
    console.log(response);
    res.send(response);
});

router.post("/api/items", async function(req, res){
    const response = await orm.addItem(req.body.name, req.body.link);
    console.log(response);
    res.send(response);
});

router.put("/api/items/:id", async function(req, res){
    const response = await orm.updateItem(req.body.id, req.body.stage);
    console.log(response);
    res.send(response);
});

router.delete("/api/items/:id", async function(req, res){
    const response = await orm.deleteItem(req.params.id);
    console.log(response);
    res.send(response);
});

router.get("/apiKey", async function(req, res){
    const response = await orm.getAPIKEY();
    res.send(response);
});

module.exports = router;
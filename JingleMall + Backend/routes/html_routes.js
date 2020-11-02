const express = require("express");
const path = require("path");

const router = express.Router();

router.get("/", function(req,res){
    res.sendFile(path.join(__dirname, "../public/index.html"))
});

router.get("/index.html",function(req,res){
    res.sendFile(path.join(__dirname, "../public/index.html"))
});

router.get("/list.html",function(req,res){
    res.sendFile(path.join(__dirname, "../public/list.html"))
});

router.get("/search.html",function(req,res){
    res.sendFile(path.join(__dirname, "../public/search.html"))
});


module.exports = router;
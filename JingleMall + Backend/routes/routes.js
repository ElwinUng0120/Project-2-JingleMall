const express = require("express");
const path = require("path");

const router = express.Router();

router.get("/index.html",function(req,res,next){
    res.sendFile(path.join(__dirname,"..","views","index.html"))
});

router.get("/list.html",function(req,res,next){
    res.sendFile(path.join(__dirname,"..","views","list.html"))
});

router.get("/search.html",function(req,res,next){
    res.sendFile(path.join(__dirname,"..","views","search.html"))
});

router.get("/*",function(req,res,next){
    res.send("<p>sorry, dear customer this is not a vail page from jingle mall</p>")
})




module.exports = router;
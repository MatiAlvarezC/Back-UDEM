const express = require('express');
const fs = require("fs");
const isAuth = require('../Middlewares/Auth')
const router = express.Router()

router.get('/sportSVG/:img',(req, res) => {
    let img = process.env.FILEPATH + '/' + req.params.img;
    console.log(img)
    fs.access(img, fs.constants.F_OK, err => {
        console.log(`${img} ${err ? "does not exist" : "exists"}`);
    });
    fs.readFile(img, function (err, content) {
        if (err) {
            res.status(400).send('DOESN´T EXIST')
        } else {
            res.writeHead(200, {"Content-type": "image/jpg"});
            res.end(content);
        }
    });
})

router.get('/pdf/:pdf',(req, res) => {
    let pdf = process.env.FILEPDFPATH + '/' + req.params.pdf;
    res.download(pdf);
})

module.exports = router

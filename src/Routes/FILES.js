const express = require('express');
const fs = require("fs");
const router = express.Router()

router.get('/sportSVG/:img', (req, res) => {
    let img = process.env.FILEPATH + '\\' + req.params.img;
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

module.exports = router

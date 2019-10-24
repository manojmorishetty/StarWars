const express = require('express');
const router = express.Router();

const swaplogic = require('./corelogic');



router.get('/people', (req, res, next) => {
    swaplogic.getPeople().then(data => {
        res.send(data)
    }).catch(err => {
        console.log(err)
        res.send(err)
    })
})

router.get('/people/:name', (req, res, next) => {
    swaplogic.getCharacter(req.params.name).then(data => {
        res.send(data)
    }).catch(err => {
        console.log(err)
        res.send(err)
    })
})



module.exports = router;

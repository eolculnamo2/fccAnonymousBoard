const express = require('express');
const router = express.Router();
const ThreadServices = require('./ThreadServices');

router.post('/threads/:board', (req,res) => new ThreadServices().newThread())
module.exports = router;
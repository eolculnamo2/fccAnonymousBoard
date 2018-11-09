const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const ThreadServices = require('./ThreadServices');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.post('/threads/:board', (req,res) => new ThreadServices().newThread(res, req.params.board, req.body.text, req.body.password))
router.get('/threads/:board', (req,res) => new ThreadServices().getThreads(res, req.params.board))
module.exports = router;
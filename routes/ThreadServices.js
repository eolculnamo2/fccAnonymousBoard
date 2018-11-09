const Thread = require('../models/Thread');

class ThreadServices {
    newThread(res, board, text, pw) {
        if(!board || board.trim().length === 0){
            board = 'general';
        }

       new Thread({
            text: text,
            created_on: new Date(),
            bumped_on: new Date(),
            reported: false, 
            delete_password: pw,
            replies: [],
            board: board
       }).save();
    }

    getThreads(res, board) {
        Thread.find({}, (err,response) => {
            let send = response.filter( x => x.board === board);
            res.send(send);
        })
    }
}

module.exports = ThreadServices;
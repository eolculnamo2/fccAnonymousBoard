const Thread = require('../models/Thread');

class ThreadServices {
    newThread(res, board, text, pw) {
        if(!board || board.trim().length === 0){
            board = 'general';
        }
        console.log(board);
    //    new Thread({
    //         text: text,
    //         created_on: new Date(),
    //         bumped_on: new Date(),
    //         reported: false, 
    //         delete_password: pw,
    //         replies: [],
    //         board: board
    //    }).save();
    }
}

module.exports = ThreadServices;
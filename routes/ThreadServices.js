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
       res.send({success: true});
    }

    getThreads(res, board) {
        Thread.find({}, (err,response) => {
            let send = response.filter( x => x.board === board);
            res.send(send);
        })
    }

    reportThread(res, id) {
        Thread.findOneAndUpdate({_id: id}, {reported: true}, (err, response) => {
            if(err) console.log(err);
            res.send({success: true});
        })
    }

    deleteThread(res,id, password) {
        Thread.findOne({_id: id}, (err1,response1) => {
            if(password === response1.delete_password) {
                Thread.findOneAndRemove({_id: id}, (err,response) => {
                    if(err) {
                        console.log(err)
                    }
                    else {
                        res.send({success: true});
                    }
                })
            }
            else{
                res.send({success: false});
            }
        })
    }
}

module.exports = ThreadServices;
const Thread = require('../models/Thread');

class ReplyServices {
    postReply(res, body) {
        let id = Math.floor(Math.random()*1000000000000000000000000000000000000000)
        body.reply.id = id;
        Thread.findOneAndUpdate({_id: body.id}, {$push: {replies: body.reply}}, (err,response) => {
            if(err)console.log(err);
            res.send({success: true})
        })
    }

    reportReply(res, body){
        Thread.findOne({_id: body.threadId}, (err,response) => {
            if(err) console.log(err);
            for(let x of response.replies) {
                if(x.id === body.replyId) {
                    x.reported = true;
                }
            }
            Thread.findOneAndUpdate({_id: body.threadId}, {$set: {replies: response.replies}}, (err2, response2) => {
                if(err2)console.log(err);
                res.send({success: true});
            })
        })
    }

    deleteReply(res, body){
        Thread.findOne({_id: body.threadId}, (err,response) => {
            if(err) console.log(err);
            for(let x of response.replies) {
                if(x.id === body.replyId && body.password === x.delete_password) {
                    x.text = '[deleted]';
                }
            }
            Thread.findOneAndUpdate({_id: body.threadId}, {$set: {replies: response.replies}}, (err2, response2) => {
                if(err2)console.log(err);
                res.send({success: true});
            })
        })
    }

    showAll(res, id) {
        console.log("ID",id)
        Thread.findOne({_id: id}, (err,response) => {
            console.log(response)
            res.send(response);
        })
    }
    
}

module.exports = ReplyServices;
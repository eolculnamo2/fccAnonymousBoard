const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Thread = new Schema({
    text: String,
    created_on: String,
    bumped_on: String,
    reported: Boolean, 
    delete_password: String,
    replies: Array
})

module.exports = mongoose.model('threads', Thread);


/*
_id, 
text, 
created_on(date&time),
bumped_on(date&time, 
starts same as created_on), 
reported(boolean), 
delete_password, & replies(array)

REPLIES:
text, delete_password, & thread_id 
*/
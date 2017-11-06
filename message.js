var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var MessageSchema   = new Schema({
    msg: String,
    time: String,
    code: String
});

module.exports = mongoose.model('Message', MessageSchema);
const mongodb = require('mongodb');
const mongoose = require('mongoose');
require('dotenv').config()

// Database Config
mongoose.connect(process.env.MONGO_LOCAL_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// Database  Schema 
const Schema = mongoose.Schema;

const poll_schema = new Schema({
    poll_id: String,
    question: { type: String, required: true },
    total_votes : Number,
    options: [{
        description: String,
        votes: Number
    }]
})

const Poll = mongoose.model('Polls', poll_schema);

function addPoll(poll, done) {
    Poll.findOne({ question: poll.question }, function (err, data) {
        if (err) {
            done(error, data);
        }
        if (data) {
            done("Poll exists");
        } else {

            var data = new Poll(poll);
            data.save(function (err, example) {
                if (err) done(err);
                done(null, "Added poll");

            });
        }
    });

}

function getPollInfo(pollid, done) {
    Poll.find({ poll_id: pollid }, (error, data) => {
        if (data.length === 0) done("Poll Does not exists", null)
        done(null, data)
    })
}


function getAllPolls(done) {
    Poll.find({}, (error, data) => {
        if (error || data.length === 0) done("Poll Does not exists", null)
        done(null, data)
    })
}


function upVotePoll(pollid, optionindex, done) {
    Poll.findById(pollid, (err, poll) => {
        if (err) done(err, null);

        ans = poll.options[optionindex].votes + 1
        poll.options[optionindex].votes = ans
        
        totalvotes = poll.total_votes + 1
        poll.total_votes = totalvotes
        
        poll.save((err, updatedPoll) => {
            if (err) return console.log(err);
            done(null, updatedPoll)
        })
    })
};

module.exports = {
    addPoll,
    getPollInfo,
    upVotePoll,
    getAllPolls
};

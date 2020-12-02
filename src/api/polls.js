const express = require('express');
const { addPoll, getPollInfo, upVotePoll, getAllPolls } = require('./database')
const router = express.Router();
const shortid = require('shortid')

// https://medium.com/@nmayurashok/crud-app-using-node-js-express-mongodb-part-2-564839cbf8c4

router.get('/', (req, res) => {
    res.json({ message: "This will be router for polling stuff" });
});

// add poll
router.post('/add', (req, res) => {
    let { question, options } = req.body

    let poll = {
        poll_id: shortid.generate(),
        question: question,
        options: options
    }

    addPoll(poll, (error, data) => {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else {
            // console.log(data)
            res.json({ message: "Poll Added" })
        }
    })
})

// get poll data
router.get('/stats/:pollid', (req, res) => {
    let { pollid } = req.params

    getPollInfo(pollid, (error, data) => {
        if (error) {
            res.status(404).json({ error: error })
        } else {
            res.json(data[0])
        }
    })

})

router.get('/stats', (req, res) => {
    getAllPolls((error, data) => {
        if (error) {
            res.status(404).json({ error: error })
        } else {
            res.json(data)
        }
    })
})

// upvote a poll
router.put('/:pollid/vote', (req, res) => {
    let { optionindex } = req.body
    let { pollid } = req.params

    upVotePoll(pollid, optionindex, (error, data) => {
        if (error) {
            res.json({ error: error })
        } else {
            res.json({ message: "Poll voted" })
        }
    })
})



module.exports = router;
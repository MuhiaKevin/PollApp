import React, { useEffect, useState } from 'react';
// https://stackoverflow.com/questions/48846289/why-is-my-react-component-is-rendering-twice
// https://jasonwatmore.com/post/2020/02/01/react-fetch-http-post-request-examples
// https://www.codementor.io/@idreesibraheem/how-to-deploy-a-minimal-docker-app-to-heroku-136rp9223y
// https://medium.com/mozilla-club-bbsr/dockerizing-a-mern-stack-web-application-ebf78babf136


const Votepage = props => {
    const [vote, setVotes] = useState({ vote: {}, isFetching: true, hasVoted: false })
    const baseurl = "http://localhost:5000/api/v1/poll"

    function itemIsInLocalStorage(savedVote, id) {
        for (let index = 0; index < savedVote.length; index++) {
            if (savedVote[index].voteid === id) {
                return { status: true, hasVote: savedVote[index].hasVoted }
            }
        }
        return { status: false, hasVote: null }
    }

    function upVote(pollid, optionIndex) {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ optionindex: optionIndex, pollid: pollid })
        }

        fetch(`${baseurl}/vote`, requestOptions)
            .then(async response => {
                const data = await response.json();
                let savedVote = JSON.parse(localStorage.getItem('hasVoted'))

                for (let index = 0; index < savedVote.length; index++) {
                    if (savedVote[index].voteid === props.location.state.vote && savedVote[index].hasVoted === false) {
                        let votestatus = {
                            voteid: props.location.state.vote,
                            hasVoted: true
                        }
                        savedVote.splice(index, 1)
                        savedVote.push(votestatus)
                        localStorage.setItem('hasVoted', JSON.stringify(savedVote))
                        break
                    }
                }
                setVotes({ vote: data, isFetching: false, hasVoted: true })
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    useEffect(() => {
        async function getPollData() {
            const voteid = props.location.state.vote
            const url = `${baseurl}/stats/${voteid}`
            const api_call = await fetch(url);
            const response = await api_call.json()


            // save if not localstorage
            let savedVote = JSON.parse(localStorage.getItem('hasVoted'))
            let hasVoted = false;

            if (savedVote === null) {
                let hasVotedArray = []

                let votestatus = {
                    voteid: voteid,
                    hasVoted: false
                }
                hasVotedArray.push(votestatus)
                localStorage.setItem('hasVoted', JSON.stringify(hasVotedArray))

            } else {
                let isInLocalStorage = itemIsInLocalStorage(savedVote, voteid)

                if (isInLocalStorage.status) {
                    hasVoted = isInLocalStorage.hasVote
                } else if (isInLocalStorage.status === false) {

                    let votestatus = {
                        voteid: voteid,
                        hasVoted: false
                    }

                    savedVote.push(votestatus)
                    localStorage.setItem('hasVoted', JSON.stringify(savedVote))
                    hasVoted = false
                }
            }
            setVotes({ vote: response, isFetching: false, hasVoted: hasVoted })
        }
        
        getPollData()
    }, [])

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
                <div className="container">
                    <a className="navbar-brand" href="http://localhost:3000/">Poll App</a>
                </div>
            </nav>
            <div className="d-flex justify-content-center" style={{ marginTop: "10px" }}>
                {vote.isFetching ? (<div>Loading...</div>) : (
                    <div className="card text-black bg-light mb-3" style={{ maxWidth: "18rem;" }}>
                        <div className="card-header"><strong>{vote.vote.question}</strong></div>
                        <div className="card-body">
                            {vote.vote.options.map((voteitem, index) => {
                                return (
                                    <div key={index}>
                                        <p>{voteitem.description} <strong>{voteitem.votes}</strong> </p>
                                        <button onClick={() => upVote(vote.vote._id, index)} className="btn btn btn-primary" disabled={vote.hasVoted}>Vote </button>
                                    </div>
                                )
                            })}
                        </div>
                        <p style={{ marginTop: "10px", marginLeft: "100px" }}>Total Votes <strong>{vote.vote.total_votes}</strong></p>

                    </div>
                )
                }
            </div>
        </div>

    );
};

export default Votepage;
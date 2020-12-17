import React, { useEffect, useState } from 'react';
// https://stackoverflow.com/questions/48846289/why-is-my-react-component-is-rendering-twice

const Votepage = props => {
    const [vote, setVotes] = useState({ vote: {}, isFetching: true })
    const baseurl = "http://localhost:5000/api/v1/poll"
    
    function upVote(pollid, optionIndex) {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ optionindex: optionIndex })
        }

        fetch(`${baseurl}/${pollid}/vote`, requestOptions)
            .then(async response => {
                const data = await response.json();
                console.log(data);
                setVotes({ vote: data, isFetching: false })
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
            setVotes({ vote: response, isFetching: false })
        }
        getPollData()

    }, [])

    return (
        <div>
            {vote.isFetching ? (<div>Loading...</div>) : (
                <div>
                    <p>{vote.vote.question}</p>
                    {vote.vote.options.map((voteitem, index) => {
                        return (
                            <div key={index}>
                                <span>{voteitem.description} <strong>{voteitem.votes}</strong> </span>
                                <button onClick={() => upVote(vote.vote._id, index)} className="btn btn btn-primary">Vote </button>
                            </div>
                        )
                    })}

                </div>
            )
            }
        </div>
    );
};

export default Votepage;
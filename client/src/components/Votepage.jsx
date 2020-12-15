import React, { useEffect, useState } from 'react';
// https://stackoverflow.com/questions/48846289/why-is-my-react-component-is-rendering-twice

const Votepage = props => {
    const [vote, setVotes] = useState({ vote: {}, isFetching: true })

    useEffect(() => {
        async function getPollData() {
            const voteid = props.location.state.vote
            const url = `http://localhost:5000/api/v1/poll/stats/${voteid}`
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
                                <p>{voteitem.description} <strong>{voteitem.votes}</strong> </p>
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
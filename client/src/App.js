import React, { useEffect, useState } from 'react'
import './App.css'
import { Link } from "react-router-dom"

function App() {
  const [polls, setPolls] = useState([])

  const getPolls = async () => {
    const url = "http://localhost:5000/api/v1/poll/polls"
    const response = await (await (await fetch(url)).json())

    setPolls(response)
  }

  useEffect(() => {
    getPolls()
  }, [])

  return (
    <div >
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
        <div className="container">
          <a className="navbar-brand" href="http://localhost:3000/">Poll App</a>

        </div>
      </nav>
      <div className="container">
        <div className="wrap">
          <div className="main">
            <div className="col-lg-12 text-center">
              <div className="App">
                <h1>Latest Polls</h1>

                <ul className="list-group" >
                  {polls.map(vote_item => {

                    return (
                      <li key={vote_item._id} className="list-group-item list-group-item" >
                        <p>{vote_item.question}</p>
                        <p><strong> {vote_item.total_votes} Votes</strong></p>
                        <button type="button" className="btn btn btn-warning">
                          <Link to={{
                            pathname: `/vote/${vote_item.poll_id}`,
                            state: { vote: vote_item.poll_id }
                          }}>Vote</Link>
                        </button>
                      </li>
                    )
                  })}
                </ul>


              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default App;

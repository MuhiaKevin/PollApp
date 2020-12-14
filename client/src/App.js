import React from 'react'
import './App.css'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      polls: []
    }
    this.getPolls = this.getPolls.bind(this)
  }

  async getPolls() {
    const url = "http://localhost:5000/api/v1/poll/polls"
    const response = await (await (await fetch(url)).json())
    console.log(response)
    this.setState({
      polls: response
    })

  }
  componentDidMount() {
    this.getPolls()
  }

  render() {
    return (
      <div >
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
          <div className="container">
            <a className="navbar-brand" href="#">Poll App</a>

          </div>
        </nav>
        <div className="container">
          <div className="wrap">
            <div className="main">
              <div className="col-lg-12 text-center">
                <div className="App">
                  <h1>Latest Polls</h1>

                  <ul className="list-group" >
                    {this.state.polls.map((value, index) => {
                      return (
                        <li key={index} className="list-group-item list-group-item" >
                          <a href="#">
                            <p>{value.question}</p>
                          </a>
                          <p><strong> {value.total_votes} Votes</strong></p>
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
}

export default App;

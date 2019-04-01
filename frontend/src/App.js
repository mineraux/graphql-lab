import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.emailEl = React.createRef()
    this.passwordEl = React.createRef()
  }

  submitHandler = (event) => {
    event.preventDefault()
    const email = this.emailEl.current.value
    const password = this.passwordEl.current.value

    if (email.trim().length === 0 || password.trim().length === 0) {
      return
    }

    const requestBody = {
      query : `
        mutation {
          createUser(userInput: {email: "${email}", password: "${password}"}) {
            _id
            email
          }
        }
      `
    }

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.submitHandler}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" ref={this.emailEl} />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" ref={this.passwordEl} />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default App;

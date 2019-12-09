import React, { Component, useState } from "react"
import "./App.css"

class LambdaDemo extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: false, msg: null }
  }

  handleClick = api => e => {
    e.preventDefault()

    this.setState({ loading: true })
    fetch("/.netlify/functions/" + api)
      .then(response => response.json())
      .then(json => this.setState({ loading: false, msg: json.msg }))
  }

  render() {
    const { loading, msg } = this.state

    return (
      <p>
        <button onClick={this.handleClick("hello")}>{loading ? "Loading..." : "Call Lambda"}</button>
        <button onClick={this.handleClick("async-dadjoke")}>{loading ? "Loading..." : "Call Async Lambda"}</button>
        <br />
        <span>{msg}</span>
      </p>
    )
  }
}

const App = () => {
  const [result, setResult] = useState(null);
  const elements = ["Fabio", "Mattia", "Bono", "Michele", "Aurelio", "Maurizio"];

  const generateRandom = () => {
    let r1 = Math.floor(Math.random() * (4 - 2 + 1)) + 2;
    let r2 = Math.floor(Math.random() * (4 - 2 + 1)) + 2;

    do{
      r2 = Math.floor(Math.random() * (4 - 2 + 1)) + 2;
    }
    while(r1==r2)

    setResult(`${elements[r1]} - ${elements[r2]}`);
  };

  return (
    <div className="App">
      <div style={{ marginTop: 100, marginBottom: 50 }}>
        <b>Partecipanti:</b>{" "}
        {elements.map((n, i) => (
          <span>{`${n} ${i == 5 ? "" : "-"} `}</span>
        ))}
      </div>
      <button onClick={() => generateRandom()}>Estrazione 2 partecipanti casuali</button>
      <div style={{marginTop:50}}>{result}</div>
    </div>
  );
};

export default App

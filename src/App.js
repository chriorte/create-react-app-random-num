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
  const numbers = [1, 2, 3, 4, 5, 6];

  const generateRandom = () => {
    setResult(`${numbers[3]} - ${numbers[5]}`);
  };

  return (
    <div className="App">
      <div style={{ marginTop: 100, marginBottom: 50 }}>
        Numeri:{" "}
        {numbers.map((n, i) => (
          <span>{`${n} ${i == 5 ? "" : "-"} `}</span>
        ))}
      </div>
      <button onClick={() => generateRandom()}>Genera 2 numeri casuali</button>
      <div style={{marginTop:50}}>{result}</div>
    </div>
  );
};

export default App

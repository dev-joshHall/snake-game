import "./App.css";
import SnakeCanvas from "./components/snake-canvas";
import React, { Component } from "react";

class App extends Component {
  state = { mode: "arrows" };

  changeMode = () => {
    this.state.mode === "normal"
      ? this.setState({ mode: "arrows" })
      : this.setState({ mode: "normal" });
  };

  render() {
    return (
      <div className="App">
        <SnakeCanvas mode={this.state.mode} changeMode={this.changeMode} />
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
import TodoComp from "./Components/TodoComp";

class App extends Component {
  
  render() {
    return (
      <main className="content">
        <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
        <TodoComp />
      </main>
    );
  }
}
export default App;
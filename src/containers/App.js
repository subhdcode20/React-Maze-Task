import React, { Component, PropTypes } from 'react';
import Game from 'AppContainers/Game';

class App extends Component {
  render() {
    return (
      <div className="main-app-container">
        <Game />
      </div>
    );
  }
}

export default App

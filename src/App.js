import React, { Component } from "react";

import MoviesList from "./components/Movies";

class App extends Component {
  state = {
    moviesList: [],
  };

  // WHEN I USED THE JSON FILE INSTEAD OF THE API I FETCH THE DATA HERE
  // FOR SOME REASON, WHEN I USED THE API I DID IT DIRECTLY INTO THE MOVIESLIST COMPONENT
  // I THINK THIS IS NOT SUPER OPTIMIZED

  render() {
      return (
        <div className="App">
          <header className="App-header">
            <MoviesList />
          </header>
        </div>
      );
  }
}

export default App;

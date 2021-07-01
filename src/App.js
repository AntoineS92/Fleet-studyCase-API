import React, { Component } from "react";

import MoviesList from "./components/Movies";

class App extends Component {
  state = {
    moviesList: [],
  };

  //here we import the JSON file from the URL with the fetch method
  componentDidMount() {
    fetch(
      "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/29d6c084-0f1a-4093-b260-676d7b08baf0/movies.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210630%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210630T125509Z&X-Amz-Expires=86400&X-Amz-Signature=7ee416fb3031bec215d6468d0794d2065438bf0da9893f6c2901a518f931a302&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22movies.json%22"
    )
      .then((list) => list.json())
      .then((listJson) => {
        //we put it into the state to have something easier to use
        const newList = listJson.results;
        this.setState({
          moviesList: newList,
        });
        //console.log to check that everything is okay
        console.log("STATE", this.state.moviesList);
      })
      .catch((error) => console.log(error));
  }

  render() {
    console.log("STATE 2", this.state.moviesList);
    if (this.state.moviesList.length !== 0) {
      return (
        <div className="App">
          <header className="App-header">
          
            {/* here we lift the state up (i think) so we have access to it into the MoviesList component */}
            <MoviesList list={this.state.moviesList} />
          </header>
        </div>
      );
    } else {
      return <div>Loading</div>
    }
  }
}

export default App;

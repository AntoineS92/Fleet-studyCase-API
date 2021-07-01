import React, { Component } from "react";
import axios from "axios";

import SearchBar from "./SearchBar";

class MoviesList extends Component {
  state = {
    movies: null,
    searchValue: "",
    clickedMovie: null,
    searchedMovies: null,
  };

  componentDidMount() {
    // LOADING THE DATA FROM THE API. I COULD NOT FIND A WAY TO LOAD A RANDOM LIST SO I USED THE POPULAR ONES
    // BECAUSE IT IS LOADED AFTER THE FIRST RENDER, THERE IS A GUARD OPERATOR TO AVOID THE CRASH (LIGN 83 AND 100)
    axios
      .get(
        "https://api.themoviedb.org/3/movie/popular?api_key=ac2bcaeb758a38cf87b7019c7cba947d"
      )
      .then((response) => {
        this.setState({
          movies: response.data.results,
        });
        console.log("this is movies", this.state.movies);
      })
      .catch((error) => console.log(error));
  }

  handleSearchValue = (value) => {
    this.setState({
      searchValue: value,
    });
// WE GET HERE THE SEARCH BY ADDING THE URL AND THE SEARCH VALUE AS THE QUERY. 
// DOC: https://developers.themoviedb.org/3/search/search-movies
    axios
      .get(
        "https://api.themoviedb.org/3/search/movie?api_key=ac2bcaeb758a38cf87b7019c7cba947d&query=" +
          this.state.searchValue
      )
      .then((response) => {
        console.log(response);
        //WHEN WE HAVE THE RESPONSE FROM THE SERVER, WE UPDATE THE MOVIES STATE SO THAT THEY ARE DISPLAYED ON THE LIST
        this.setState({
          movies: response.data.results,
        });
        console.log("STATE", this.state.searchedMovies);
      })
      .catch((err) => console.log(err));
  };

  //FUNCTION TO ADD THE CLICKED MOVIE INTO THE STATE SO WE CAN DISPLAY IT
  handleSingleMovieClick = (event, singleMovie) => {
    console.log("clicked !", event.target, singleMovie);
    //THE STATE IS UPDATED. AGAIN, TO AVOID ANY CRASHED, WE USE THE GUARD OPERATOR
    this.setState({
      clickedMovie: singleMovie,
    });
    return <div>hello !</div>;
  };

  render() {
    // I TRIED HERE TO PUT THE GET API IN THE RENDER TO AVOID THE ONE CHARACTER DELAY.
    //THE DELAY WAS SOLVED BUT WHENEVER THE STATE CHANGES, THE RENDER IS ... RENDERED. WHICH WAS MAKING THE CODE ENTERTING IN AN ENLESS ITERATION
    //
    // if (this.state.searchValue) {
    //   axios
    //     .get(
    //       "https://api.themoviedb.org/3/search/movie?api_key=ac2bcaeb758a38cf87b7019c7cba947d&query=" +
    //         this.state.searchValue
    //     )
    //     .then((response) => {
    //       console.log(response.data.results);
    //       const searchedMoviesResults = response.data.results
    //     })
    //     .catch((err) => console.log(err));
    // }

    return (
      <div className="fullpage">
        <SearchBar
          handleChange={this.handleSearchValue}
          value={this.state.searchValue}
        />

        {/* GUARD OPERATOR TO AVOID THE CRASH */}
        {this.state.searchedMovies &&
          this.state.searchedMovies.map((singleMovie) => {
            return (
              <div
                className="singleMovie-card"
                onClick={(event) =>
                  this.handleSingleMovieClick(event, singleMovie)
                }
              >
                <h1 className="singleMovie-card-title">{singleMovie.title}</h1>
              </div>
            );
          })}

        <div className="mainPage">
          <div className="moviesList">
            {/* GUARD OPERATOR TO AVOID THE CRASH */}
            {this.state.movies &&
              this.state.movies.map((singleMovie) => {
                return (
                  <div
                    className="singleMovie-card"
                    onClick={(event) =>
                      this.handleSingleMovieClick(event, singleMovie)
                    }
                  >
                    <h1 className="singleMovie-card-title">
                      {singleMovie.title}
                    </h1>
                  </div>
                );
              })}
          </div>

          {this.state.clickedMovie && (
            <div className="clickedMovieDetails">
            {/* TO GET THE IMAGE OF THE POSTER, WE NEED THE FULL URL TO MAKE THE REQUEST TO THE SERVER */}
              <img
                src={
                  "https://image.tmdb.org/t/p/w500/" +
                  this.state.clickedMovie.poster_path
                }
                alt="poster"
                className="clickedMovie-img"
              />
              <div className="clickedMovieDetails-mainInfo">
                <h1 id="clickedMovie-title">{this.state.clickedMovie.title}</h1>
                {/* I removed the decimals of the popularity because they don't make a lot of sense for the user */}
                {/* little use of bulma here to try it */}
                <p id="movie-popularity">
                  Popularity :
                  <progress
                    class="progress is-success"
                    value={parseFloat(
                      this.state.clickedMovie.popularity
                    ).toFixed(0)}
                    max="100"
                  >
                    {this.state.clickedMovie.popularity}
                  </progress>
                </p>
                <p id="movie-releaseDate">
                  Release date : {this.state.clickedMovie.release_date}
                </p>
              </div>
              <div className="clickedMovieDetails-description">
                <p id="movie-overview">{this.state.clickedMovie.overview}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default MoviesList;

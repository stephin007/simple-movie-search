import React, { useState, useEffect } from "react";

import MovieCard from "./MovieCard";
import LoadingSpinner from "./LoadingSpinner";
import SearchIcon from "./search.svg";
import "./App.css";

const API_URL = "https://www.omdbapi.com/?i=tt3896198&apikey=dd4e8195";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [types, setTypes] = useState([]);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  const searchMovies = async (title) => {
    setIsLoading(true);
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
    setIsLoading(false);

    const Types = [...new Set(data.Search.map((Val) => Val.Type))];
    setTypes(Types);
    console.log(Types);
  };

  return (
    <div className='app'>
      <h1>MovieLand</h1>

      <div className='search'>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Search for movies'
        />
        <img
          src={SearchIcon}
          alt='search'
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {!isLoading ? (
        <>
          {movies?.length > 0 ? (
            <div className='container'>
              {movies.map((movie, key) => (
                <MovieCard movie={movie} key={movie.imdbID} />
              ))}
            </div>
          ) : (
            <div className='empty'>
              <h2>No movies found</h2>
            </div>
          )}
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

export default App;

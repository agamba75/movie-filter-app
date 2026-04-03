import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Router } from "./components/Router";
import { useNavigate, useLocation } from "react-router";

//import { loadMovieByGenres } from "./features/loadMovies/LoadMovieSlice";
import {
  getMoviesByGenre,
  getThrillersByPopularity_dsc,
} from "./features/filterMovies/filterMoviesSlice";

import { Header } from "./components/common/Header";
import { Footer } from "./components/common/Footer";

const App = () => {
  const [genre, setGenre] = useState(() => {
    const genre = localStorage.getItem("genre");

    return genre ? JSON.parse(genre) : [];
  });
  const [filteredGenresById, setFilteredGenreById] = useState([]);

  const [favorites, setFavorites] = useState(() => {
    const favorites = localStorage.getItem("favorites");

    return favorites ? JSON.parse(favorites) : [];
  });
  const [status, setStatus] = useState(true);

  // const params = useParams();
  // const name = params.name;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMoviesByGenre());
    dispatch(getThrillersByPopularity_dsc());
  }, []);

  const navigate = useNavigate();
  let location = useLocation();

  const movies = useSelector((state) => state.filterMovies.data);

  function IsFavorite() {
    setStatus(false);

    navigate("/favorite");
  }

  function handleFavorite(e) {
    const favorite = e.target.id.toString();
    const newState = [...favorites, favorite];

    setFavorites(newState);
    localStorage.setItem("favorites", JSON.stringify(newState));
  }

  const toggleGenre = (e) => {
    //e.preventDefault();
    let moviesByGenre = movies.filter((m) => {
      return m.genre_ids.some((n) => {
        return n == e.target.id;
      });
    });

    setGenre(moviesByGenre);

    localStorage.setItem("genre", JSON.stringify(moviesByGenre));

    navigate("/movies/" + e.target.value);
  };

  function handleDelete(id) {
    const newFavorites = favorites.filter((f) => {
      return f != id;
    });

    setFavorites(newFavorites);
  }

  function handleDeleteAll() {
    localStorage.removeItem("favorites");
    setFavorites([]);
    setStatus(true);
    navigate("/movies");
  }
  return (
    <div className=" ">
      <Header
        favorites={favorites}
        navigate={navigate}
        IsFavorite={IsFavorite}
        status={status}
      />
      <Router
        genre={genre}
        toggleGenre={toggleGenre}
        handleDelete={handleDelete}
        handleDeleteAll={handleDeleteAll}
        navigate={navigate}
        setStatus={setStatus}
        status={status}
        favorites={favorites}
        movies={movies}
        handleFavorite={handleFavorite}
        filteredGenresById={filteredGenresById}
        setFilteredGenreById={setFilteredGenreById}
      />
      <Footer />
    </div>
  );
};

export default App;

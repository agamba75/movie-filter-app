import React, { useState } from "react";

import { Routes, Route } from "react-router-dom";

import { Details } from "./Details";
import { Favorite } from "./Favorite";
import { DisplayPopularMovies } from "./DisplayPopularMovies";
import { DisplaySearchResults } from "./SearchResults";
import { Home } from "./Home";
import Main from "./Main";

export const Router = ({
  genre,
  toggleGenre,
  handleFavorite,
  favorites,
  movies,
  handleDelete,
  handleDeleteAll,
  navigate,
  setStatus,
  setFilteredGenreById,
  filteredGenresById,
}) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <Routes>
      <Route path={"/"}>
        <Route index element={<Home handleFavorite={handleFavorite} />} />
      </Route>
      <Route
        //Il faut adapter ces Routes pour Main s'affiche correctement
        path={"/movies/:name?"}
        element={
          <Main
            genre={genre}
            toggleGenre={toggleGenre}
            handleFavorite={handleFavorite}
            setFilteredGenreById={setFilteredGenreById}
          />
        }
      >
        <Route
          path={"popular"}
          element={<DisplayPopularMovies handleFavorite={handleFavorite} />}
        />
      </Route>
      <Route
        path={"/detail/:id"}
        element={
          <Details
            genre={genre}
            handleFavorite={handleFavorite}
            filteredGenresById={filteredGenresById}
            searchValue={searchValue}
          />
        }
      />
      <Route
        path={"/favorite"}
        element={
          <Favorite
            movies={movies}
            favorites={favorites}
            handleDelete={handleDelete}
            handleDeleteAll={handleDeleteAll}
            navigate={navigate}
            setStatus={setStatus}
          />
        }
      />
      <Route
        path={"search"}
        element={
          <DisplaySearchResults
            handleFavorite={handleFavorite}
            setSearchValue={setSearchValue}
          />
        }
      />
    </Routes>
  );
};

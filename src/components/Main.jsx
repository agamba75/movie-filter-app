import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DisplayMovies } from "./DisplayMovies";
import { DisplayCategories } from "./DisplayCategories";
import { getMovieGenres } from "../features/moviesGenres/moviesGenresSlice";

export default function Main({
  genre,
  toggleGenre,
  handleFavorite,
  setFilteredGenreById,
}) {
  const [categoryName, setCategoryName] = useState(() => {
    const name = localStorage.getItem("name");

    return name ? name : "";
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovieGenres());
  }, []);
  let location = useLocation();

  let params = useParams();
  let name = params.name || categoryName;

  localStorage.setItem("name", name);
  return (
    <div className="row mt-5 pt-2">
      <DisplayCategories toggleGenre={toggleGenre} />
      {location.pathname === "/movies/popular" && <Outlet />}
      <DisplayMovies
        genre={genre}
        name={name || categoryName}
        handleFavorite={handleFavorite}
        setFilteredGenreById={setFilteredGenreById}
      />
    </div>
  );
}

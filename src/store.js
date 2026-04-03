//import { createStore, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import moviesGenresReducer from "./features/moviesGenres/moviesGenresSlice";
import filterMovieReducer from "./features/filterMovies/filterMoviesSlice";
import searchReducer from "./features/actions/search/searchMovieReducer";

export const store = configureStore({
  reducer: {
    moviesGenres: moviesGenresReducer,
    filterMovies: filterMovieReducer,
    search: searchReducer,
  },
});

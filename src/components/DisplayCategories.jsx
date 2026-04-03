import React from "react";
//import { Link } from "react-router";
import { useSelector } from "react-redux";
//import { getMovieGenres } from "../features/moviesGenres/moviesGenresSlice";
import { Button } from "./Button";

import { filterDuplicatedIds } from "../utilities/filterDuplicatedIds";

export function DisplayCategories({ toggleGenre }) {
  const moviesGenres = useSelector((state) => state.moviesGenres.data);

  const filteredIds = filterDuplicatedIds(moviesGenres);

  if (moviesGenres.length === 0) {
    return <div className="col-3">No Movies Available</div>;
  }

  return (
    <div className="col-12">
      <div className="dropdown w-100">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Categories
        </button>
        <ul className="dropdown-menu">
          {filteredIds.length > 0 &&
            filteredIds.map((m) => {
              return (
                <li className="dropdown-item" key={m.id}>
                  <Button
                    name={m.name}
                    genreId={m.id}
                    toggleGenre={toggleGenre}
                  />
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}

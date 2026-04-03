import React from "react";
import { Link } from "react-router";
import { useSelector } from "react-redux";

import { filterDuplicatedIds } from "../utilities/filterDuplicatedIds";

export function DisplayPopularMovies({ handleFavorite }) {
  const getMovies = useSelector((state) => state.filterMovies.data);

  const image = "https://image.tmdb.org/t/p/w500/";

  const filteredIds = filterDuplicatedIds(getMovies);

  return (
    <div className="col-12 ps-0 pe-0">
      <h1 className="text-center text-primary">Popular Movies</h1>
      <div className="row row-cols-4 row-cols-lg-6 w-100 mx-100">
        {filteredIds.map((f) => {
          let url = image + f.poster_path;

          return (
            <div className="col col-lg " key={f.id}>
              <Link to={`/detail/${f.id}`}>
                <div className="card">
                  <img src={url} className="card-img-top img-fluid" alt="..." />
                  <div className="card-body ">
                    <h5 className="card-title d-none">{f.original_title}</h5>
                  </div>
                </div>
              </Link>
              <>
                <button
                  className="btn btn-primary"
                  name={f.original_title}
                  id={f.id}
                  onClick={handleFavorite}
                >
                  favorite
                </button>
              </>
            </div>
          );
        })}
        ;
      </div>
    </div>
  );
}

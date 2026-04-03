import React from "react";
//import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router";
import { filterDuplicatedIds } from "../utilities/filterDuplicatedIds";

export function DisplayMovies({ genre, handleFavorite, name }) {
  // const moviesGenres = useSelector((state) => state.loadMovies.data);
  let location = useLocation();
  let image = "https://image.tmdb.org/t/p/w500/";

  const filteredIds = filterDuplicatedIds(genre);

  if (filteredIds.length === 0) {
    return (
      <div className="alert alert-primary mt-2 text-center">
        Sorry, Movies Not Available
      </div>
    );
  }

  return (
    (location.pathname === "/movies/" + name ||
      location.pathname === "/movies") && (
      <div className="col-12  ps-0 pe-0 " id="hidden">
        <h1 className="text-primary text-center">{name}</h1>
        <div className="text-center bg-light-subtle">
          Results: {filteredIds.length} item
          {filteredIds.length === 0 || filteredIds.length === 1 ? "" : "s"}
        </div>
        <div className="row row-cols-4 row-cols-lg-6 w-100 mx-100">
          {filteredIds.length > 0 &&
            filteredIds.map((m) => {
              let url = image + m.poster_path;

              //l'idéé ici est d'utiliser genre_ids pour afficher la catégorie
              return (
                <div className="col col-lg " key={m.id}>
                  <Link to={`/detail/${m.id}`}>
                    <div className="card">
                      <img
                        src={url}
                        className="card-img-top img-fluid"
                        alt="..."
                      />
                      <div className="card-body d-none">
                        <h5 className="card-title fs-6 ">{m.original_title}</h5>
                      </div>
                    </div>
                  </Link>
                  <>
                    <button
                      className="btn btn-primary"
                      name={m.original_title}
                      id={m.id}
                      onClick={handleFavorite}
                    >
                      favorite
                    </button>
                  </>
                </div>
              );
            })}
        </div>
      </div>
    )
  );
}

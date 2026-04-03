import React, { useState } from "react";
import { useParams } from "react-router";
import { filterDuplicatedIds } from "../utilities/filterDuplicatedIds";
import { Link } from "react-router";

export function Favorite({
  favorites,
  movies,
  handleDelete,
  handleDeleteAll,
  navigate,
  setStatus,
}) {
  const params = useParams();

  function handleBackToHome() {
    setStatus(true);
    navigate("/movies");
  }

  const selectedMovies = movies.filter((m) =>
    favorites.includes(m.id.toString()),
  );

  const filteredIds = filterDuplicatedIds(selectedMovies);

  if (localStorage.getItem("favorites") === null) {
    return (
      <div className="row mt-5 pt-2">
        <div className="col-2">
          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={handleBackToHome}
          >
            Back to List
          </button>
        </div>
        <div className=" col-10  alert alert-primary" role="alert">
          You have no favorites movies - Please select some !
        </div>
      </div>
    );
  }

  return (
    <div className="row mt-5 pt-2 d-flex">
      <div className="col-6 order-3 text-center">
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={handleBackToHome}
        >
          Back to List
        </button>
      </div>
      <div className="col-12">
        <div className="row row-cols-4 row-cols-lg-6 w-100 mx-100">
          {filteredIds.map((f) => {
            return (
              <div className="col col-lg" key={f.id}>
                <Link to={`/detail/${f.id}`}>
                  <div className="card">
                    <img
                      src={"https://image.tmdb.org/t/p/w500/" + f.poster_path}
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="card-title d-none">{f.original_title}</h5>
                    </div>
                  </div>
                </Link>
                <Link
                  to="#"
                  className="btn btn-primary"
                  onClick={() => handleDelete(f.id)}
                >
                  Delete
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <div className="col-6 ">
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={handleDeleteAll}
        >
          Delete All
        </button>
      </div>
    </div>
  );
}

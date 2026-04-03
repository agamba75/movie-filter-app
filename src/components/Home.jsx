import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router";
import { filterDuplicatedIds } from "../utilities/filterDuplicatedIds";
import { Button } from "./Button";

export function Home({ handleFavorite }) {
  const navigate = useNavigate();
  const getMovies = useSelector((state) => state.filterMovies.data);

  const image = "https://image.tmdb.org/t/p/w500/";

  function goToMovies() {
    navigate("/movies/popular");
  }
  const filteredIds = filterDuplicatedIds(getMovies);

  return (
    <div className="row mt-5 pt-2">
      <button className="btn btn-primary" onClick={goToMovies}>
        Go To Filter By Genre
      </button>
      <h1 className="text-center text-primary">Popular Movies</h1>
      <div className="col-12">
        <div className="row row-cols-4 row-cols-lg-6 w-100 mx-auto ">
          {filteredIds.map((f) => {
            let url = image + f.poster_path;
            return (
              <div className="col  col-lg mb-2" key={f.id}>
                <Link to={`/detail/${f.id}`}>
                  <div className="card">
                    <img src={url} className="card-img-top" alt="..." />
                    <div className="card-body">
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
        </div>
      </div>
    </div>
  );
}

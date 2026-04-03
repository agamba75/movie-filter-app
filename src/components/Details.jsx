import React, { useState, useEffect } from "react";
import { useParams, useNavigate, redirect } from "react-router";
import { useSelector } from "react-redux";

export function Details({ genre, searchValue }) {
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (redirect) {
      navigate("/search?name=" + searchValue);
    }
  }, [redirect]);
  const movies = useSelector((state) => state.filterMovies.data);
  const params = useParams();

  let id = params.id;
  const movie = movies.find((m) => m.id === Number(id));

  if (movie === undefined && redirect === false) {
    setTimeout(() => {
      setRedirect(true);
    }, 3000);
    return <div className="text-center text-light">Details Not Available</div>;
  }
  //movie === undefined && redirect === false && setRedirect(true);

  return (
    <div className="row mt-5 pt-2 d-flex">
      <>
        <div className="col-6 order-1">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                {movie?.original_title || "unavailable"}
              </h5>
              <p className="card-text">{movie?.overview || "unavailable"}</p>
              <a href="#" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
        </div>
        <div className="col-6 order-0">
          <div className="card">
            <img
              src={
                "https://image.tmdb.org/t/p/w500/" + movie?.poster_path ||
                "unavailble"
              }
              className="card-img-top"
              alt="..."
            />

            <div className="card-body"></div>
          </div>
        </div>
        <div className="col-12 order-2">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">CAST</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card’s content.
              </p>
              <a href="#" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
        </div>
        <div className="col-12 order-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Trailerr</h5>
              <div className="ratio ratio-21x9">
                <iframe
                  src="https://www.youtube.com/embed/80BKf8FzL4U?si=vCrsYyLnt3-1rllO"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card’s content.
              </p>
              <a href="#" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

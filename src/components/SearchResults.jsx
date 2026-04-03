import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams, Link } from "react-router-dom";
import { searchMovieByName } from "../features/actions/search/searchMovieReducer";
import { filterDuplicatedIds } from "../utilities/filterDuplicatedIds";

export const DisplaySearchResults = ({ handleFavorite, setSearchValue }) => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  let name = searchParams.get("name") || "";
  let searchValueRef = useRef(null);

  if (name) {
    searchValueRef.current = name;
    setSearchValue(name);
  }

  useEffect(() => {
    name && dispatch(searchMovieByName(name));
  }, [name]);
  const getSearchedMovie = useSelector((state) => state.search.data);

  const searchedMovie = filterDuplicatedIds(getSearchedMovie);

  return (
    <div className="row mt-5 pt-2">
      {searchedMovie.length > 0 &&
        searchedMovie.map((m) => {
          return (
            <>
              <div className="col-2 col-lg-2" key={m.id}>
                <Link to={`/detail/${m.id}`}>
                  <div className="card">
                    <img
                      src={
                        m.poster_path &&
                        "https://image.tmdb.org/t/p/w500/" + m.poster_path
                      }
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="card-title d-none">{m.original_title}</h5>
                    </div>
                  </div>
                </Link>
                <button
                  className="btn btn-primary"
                  name={m.original_title}
                  id={m.id}
                  onClick={handleFavorite}
                >
                  favorite
                </button>
              </div>
            </>
          );
        })}
    </div>
  );
};

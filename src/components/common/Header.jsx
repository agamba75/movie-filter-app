import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";

export function Header({ IsFavorite, favorites, status }) {
  const [searchValue, setSearchvalue] = useState("");
  const [searchParams] = useSearchParams();
  let name = searchParams.get("name") || "";
  const navigate = useNavigate();

  function handleSubmit(e) {
    navigate(`/search?name=${name}`);
  }

  return (
    <div className="row mb-5 fixed-top">
      <div className="col-4 p-0 ">
        <Link to="/" className="btn btn-primary fs-6 w-100">
          HOME
        </Link>
      </div>
      <form
        className="col-4 mx-auto p-0 text-center ms-3 "
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Enter movie name"
          value={searchValue}
          onChange={(e) => setSearchvalue(e.target.value)}
          className=""
        />
        <button type="btn" name="name" value={searchValue} className="fs-6">
          Search
        </button>
      </form>

      <div className="col-3">
        {status && (
          <button
            className="btn btn-primary w-100"
            onClick={IsFavorite}
            disabled={status && favorites.length === 0}
          >
            Favorites
          </button>
        )}
      </div>
    </div>
  );
}

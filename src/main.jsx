import React from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Details } from "./components/Details";
import "./style.css";

import App from "./App";
import { store } from "./store";

//LEGACY REDUX CODING

/*store.subscribe(render);

store.dispatch(loadMovieGenres);
store.dispatch(getThrillers);
store.dispatch(getThrillersByPopularity);

const rootElement = document.getElementById("app");

function render() {
  const state = store.getState();

  const movieGenres = state.filterMovies.thrillers.map((g) => {
    return `<li> ${g.original_title} </li>`;
  });

  rootElement.innerHTML = `<ul>${movieGenres}</ul>`;

}

render();*/

const root = createRoot(document.getElementById("app"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);

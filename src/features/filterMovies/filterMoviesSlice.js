import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = { data: [], status: "idle", status1: "idle" };

export const getMoviesByGenre = createAsyncThunk(
  "movies/getMoviesByGenre",
  async () => {
    const allMovies = [];

    let data = [];
    const genres = [
      "12",
      "14",
      "16",
      "18",
      "27",
      "28",
      "35",
      "53",
      "36",
      "37",
      "80",
      "99",
      "878",
      "9648",
      "10402",
      "10749",
      "10751",
      "10770",
      "10752",
    ];

    //let count = 0;
    for (let genre of genres) {
      for (let page = 1; page <= 10; page++) {
        const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genre}&page=${page}`;

        try {
          const response = await fetch(url, {
            method: "GET",
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMWNmOTIxOGNkNWIyNTY0NDgyZWIxMDFhODkzZjA0NyIsIm5iZiI6MTY4MzYzODk3Ny42NzEsInN1YiI6IjY0NWE0YWMxNzdkMjNiMDBmY2NiODA1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VLcvLKG9eno1v1qGHhotGdXVjjCiw3183sdmKfjfXpc",
              accept: "application/json",
            },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const thrillersList = await response.json();
          allMovies.push(...thrillersList.results);
        } catch (error) {
          console.log(error.message);
        }
      }
      return allMovies;
    }
  },
);

export const getThrillersByPopularity_dsc = createAsyncThunk(
  "movies/getThrillersByPopularity_dsc",
  async () => {
    const url = `https://api.themoviedb.org/3/discover/movie?with_genres=53&sort_by=popularity.desc"`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMWNmOTIxOGNkNWIyNTY0NDgyZWIxMDFhODkzZjA0NyIsIm5iZiI6MTY4MzYzODk3Ny42NzEsInN1YiI6IjY0NWE0YWMxNzdkMjNiMDBmY2NiODA1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VLcvLKG9eno1v1qGHhotGdXVjjCiw3183sdmKfjfXpc",
          accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const filter_popular_desc = await response.json();

      return filter_popular_desc.results;
    } catch (error) {
      console.log(error);
    }
  },
);

const getMoviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getMoviesByGenre.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getMoviesByGenre.fulfilled, (state, action) => {
        state.data.push(...action.payload);
        state.status = "idle";
      })
      .addCase(getMoviesByGenre.rejected, (state, action) => {
        state.status("rejected");
      })
      .addCase(getThrillersByPopularity_dsc.pending, (state, action) => {
        state.status1 = "loading";
      })
      .addCase(getThrillersByPopularity_dsc.fulfilled, (state, action) => {
        state.data.push(...action.payload);
        state.status1 = "idle";
      })
      .addCase(getThrillersByPopularity_dsc.rejected, (state, action) => {
        state.status1 = "rejected";
      });
  },
});

// export default function filterMovieReducer(state = [], action) {
//   switch (action.type) {
//     case "movies/getThrillers":
//       return action.payload;

//     case "movies/getThrillersByPopularity":
//       return action.payload;

//     default:
//       return state;
//   }
// }

//duplicated middleware function

//const AllMovies = [];

// export const getThrillers = () => async (dispatch, getState) => {
//   let data = [];
//   const genres = [
//     "53",
//     "80",
//     "12",
//     "10749",
//     "28",
//     "16",
//     "35",
//     "99",
//     "18",
//     "10751",
//     "14",
//     "36",
//     "27",
//     "10402",
//     "9648",
//     "878",
//     "10770",
//     "10752",
//     "37",
//   ];
//   let count = 0;
//   for (let genre of genres) {
//     for (let page = 1; page <= 2; page++) {
//       const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genre}&page=${page}`;

//       const response = await fetch(url, {
//         method: "GET",
//         headers: {
//           Authorization:
//             "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMWNmOTIxOGNkNWIyNTY0NDgyZWIxMDFhODkzZjA0NyIsIm5iZiI6MTY4MzYzODk3Ny42NzEsInN1YiI6IjY0NWE0YWMxNzdkMjNiMDBmY2NiODA1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VLcvLKG9eno1v1qGHhotGdXVjjCiw3183sdmKfjfXpc",
//           accept: "application/json",
//         },
//       });

//       const thrillersList = await response.json();
//       AllMovies.push(...thrillersList.results);
//     }
//   }

//   dispatch({ type: "movies/getThrillers", payload: AllMovies });
// };

// export const getThrillers = () => async (dispatch, getState) => {
//   const url =
//     "https://api.themoviedb.org/3/discover/movie?with_genres=53|80|12|10749|28|16|35|99|18|10751|14|36|27|10402|9648|878|10770|10752|37";

//   const response = await fetch(url, {
//     method: "GET",
//     headers: {
//       Authorization:
//         "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMWNmOTIxOGNkNWIyNTY0NDgyZWIxMDFhODkzZjA0NyIsIm5iZiI6MTY4MzYzODk3Ny42NzEsInN1YiI6IjY0NWE0YWMxNzdkMjNiMDBmY2NiODA1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VLcvLKG9eno1v1qGHhotGdXVjjCiw3183sdmKfjfXpc",
//       accept: "application/json",
//     },
//   });

//   const thrillersList = await response.json();

//   dispatch({ type: "movies/getThrillers", payload: thrillersList.results });
// };

// export const getThrillersByPopularity = () => async (dispatch, getState) => {
//   const url =
//     "https://api.themoviedb.org/3/discover/movie?with_genres=28,12&sort_by=popularity.desc";

//   const response = await fetch(url, {
//     method: "GET",
//     headers: {
//       Authorization:
//         "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMWNmOTIxOGNkNWIyNTY0NDgyZWIxMDFhODkzZjA0NyIsIm5iZiI6MTY4MzYzODk3Ny42NzEsInN1YiI6IjY0NWE0YWMxNzdkMjNiMDBmY2NiODA1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VLcvLKG9eno1v1qGHhotGdXVjjCiw3183sdmKfjfXpc",
//       accept: "application/json",
//     },
//   });

//   const filter_popular_desc = await response.json();

//   dispatch({
//     type: "movies/getThrillersByPopularity",
//     payload: filter_popular_desc.results,
//   });
// };

export default getMoviesSlice.reducer;

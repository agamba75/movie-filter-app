import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = { data: [], status: "idle" };

// export default function loadMovieReducer(state = [], action) {
//   switch (action.type) {
//     case "movies/getMoviesGenre":
//       return action.payload;

//     default:
//       return state;
//   }
// }

export const getMovieGenres = createAsyncThunk(
  "movies/getMovieGenres",
  async () => {
    const url = "https://api.themoviedb.org/3/genre/movie/list";

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMWNmOTIxOGNkNWIyNTY0NDgyZWIxMDFhODkzZjA0NyIsIm5iZiI6MTY4MzYzODk3Ny42NzEsInN1YiI6IjY0NWE0YWMxNzdkMjNiMDBmY2NiODA1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VLcvLKG9eno1v1qGHhotGdXVjjCiw3183sdmKfjfXpc",
        accept: "application/json",
      },
    });

    const movieList = await response.json();

    return movieList.genres;
  },
);

const moviesGenresSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getMovieGenres.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getMovieGenres.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "idle";
      })
      .addCase(getMovieGenres.rejected, (state, action) => {
        state.status = "rejected";
      });
  },
});

export default moviesGenresSlice.reducer;

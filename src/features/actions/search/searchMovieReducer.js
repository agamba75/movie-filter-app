import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = { data: [], status: "idle" };

export const searchMovieByName = createAsyncThunk(
  "search/searchMovieByName",
  async (name) => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${name}`;

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
      const movie = await response.json();
      return movie.results;
    } catch (error) {
      console.log(error.message);
    }
  },
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(searchMovieByName.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(searchMovieByName.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "idle";
      })
      .addCase(searchMovieByName.rejected, (state, action) => {
        state.status = "rejected";
      });
  },
});

export default searchSlice.reducer;

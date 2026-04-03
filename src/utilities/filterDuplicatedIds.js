export function filterDuplicatedIds(movies) {
  const seen = new Set();
  return movies.filter((movie) => {
    if (movie && movie.id != null) {
      if (seen.has(movie.id)) {
        return false;
      }

      seen.add(movie.id);
      return true;
    }

    return false;
  });
}

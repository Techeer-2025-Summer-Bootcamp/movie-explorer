import { useState, useEffect } from "react";
import {
  getMovies,
  getPopularMovies,
  searchMovies,
  getMovieById,
} from "../api/movies";

export const useMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMovies();
      setMovies(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchPopularMovies = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPopularMovies();
      setMovies(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    if (!query.trim()) {
      await fetchPopularMovies();
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await searchMovies(query);
      setMovies(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    movies,
    loading,
    error,
    fetchMovies,
    fetchPopularMovies,
    searchMovies: handleSearch,
  };
};

export const useMovie = (id) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovie = async () => {
    if (!id) return;

    setLoading(true);
    setError(null);
    try {
      const data = await getMovieById(id);
      setMovie(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, [id]);

  return {
    movie,
    loading,
    error,
    refetch: fetchMovie,
  };
};

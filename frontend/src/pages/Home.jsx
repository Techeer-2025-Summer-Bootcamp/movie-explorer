import React, { useState, useEffect } from "react";
import { Plus, Film } from "lucide-react";
import MovieCard from "../components/MovieCard";
import MovieForm from "../components/MovieForm";
import LoadingSpinner from "../components/LoadingSpinner";
import { movieService } from "../api/movieService";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const response = await movieService.getMovies();
      // API 응답에서 movies 배열 추출
      const moviesData = response.movies || response;
      setMovies(moviesData);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateMovie = async (movieData) => {
    try {
      setFormLoading(true);
      const newMovie = await movieService.createMovie(movieData);
      setMovies((prev) => [newMovie, ...prev]);
      setShowForm(false);
    } catch (error) {
      console.error("Error creating movie:", error);
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading movies..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Film className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">
                Movie Bulletin Board
              </h1>
            </div>
            <div className="text-sm text-gray-600">
              {movies.length} movie{movies.length !== 1 ? "s" : ""} in
              collection
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Movies Grid */}
        {movies.length === 0 ? (
          <div className="text-center py-12">
            <Film className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No movies yet
            </h3>
            <p className="text-gray-500 mb-6">
              Start building your movie collection by adding your first movie
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 font-semibold flex items-center gap-2 mx-auto"
            >
              <Plus className="w-5 h-5" />
              Add Your First Movie
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}

        {/* Floating Add Button */}
        <button
          onClick={() => setShowForm(true)}
          className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl transform hover:scale-105 transition-all duration-200 z-40"
          aria-label="Add new movie"
        >
          <Plus className="w-6 h-6" />
        </button>

        {/* Movie Form Modal */}
        {showForm && (
          <MovieForm
            onSubmit={handleCreateMovie}
            onCancel={() => setShowForm(false)}
            isLoading={formLoading}
          />
        )}
      </main>
    </div>
  );
};

export default Home;

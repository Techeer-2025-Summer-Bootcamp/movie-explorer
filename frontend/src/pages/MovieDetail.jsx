import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Star,
  Calendar,
  Film,
  Loader2,
} from "lucide-react";
import MovieForm from "../components/MovieForm";
import LoadingSpinner from "../components/LoadingSpinner";
import { movieService } from "../api/movieService";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    fetchMovie();
  }, [id]);

  const fetchMovie = async () => {
    try {
      setLoading(true);
      const movieData = await movieService.getMovie(id);
      setMovie(movieData);
    } catch (error) {
      console.error("Error fetching movie:", error);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (movieData) => {
    try {
      setEditLoading(true);
      const updatedMovie = await movieService.updateMovie(id, movieData);
      setMovie(updatedMovie);
      setShowEditForm(false);
    } catch (error) {
      console.error("Error updating movie:", error);
    } finally {
      setEditLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);
      await movieService.deleteMovie(id);
      navigate("/");
    } catch (error) {
      console.error("Error deleting movie:", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading movie details..." />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Movie not found
          </h2>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Movies
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            {/* Title and Actions */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {movie.title}
                </h1>
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <Film className="w-5 h-5 text-orange-500" />
                  {movie.genres && movie.genres.length > 0 ? (
                    movie.genres.map((genre, index) => (
                      <span
                        key={index}
                        className="text-lg font-medium text-orange-600 bg-orange-50 px-3 py-1 rounded-full"
                      >
                        {genre}
                      </span>
                    ))
                  ) : (
                    <span className="text-lg font-medium text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                      No genre
                    </span>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowEditForm(true)}
                  className="p-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all duration-200"
                  title="Edit movie"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="p-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all duration-200"
                  title="Delete movie"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Movie Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-center gap-3 p-4 bg-yellow-50 rounded-lg">
                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                <div>
                  <p className="text-sm text-gray-600">Rating</p>
                  <p className="text-xl font-bold text-gray-900">
                    {movie.rating}/10
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-600">Release Date</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {new Date(movie.release_date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Overview */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Overview</h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                {movie.overview}
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Edit Form Modal */}
      {showEditForm && (
        <MovieForm
          movie={movie}
          onSubmit={handleEdit}
          onCancel={() => setShowEditForm(false)}
          isLoading={editLoading}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Delete Movie
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{movie.title}"? This action
              cannot be undone.
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleDelete}
                disabled={deleteLoading}
                className="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {deleteLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Trash2 className="w-5 h-5" />
                    Delete
                  </>
                )}
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={deleteLoading}
                className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;

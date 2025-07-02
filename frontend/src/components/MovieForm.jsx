import React, { useState, useEffect } from 'react';
import { X, Save, Loader2, Plus, Minus } from 'lucide-react';
import { movieSchema, genreOptions } from '../types/movie';

const MovieForm = ({ movie, onSubmit, onCancel, isLoading }) => {
  const [formData, setFormData] = useState(movieSchema);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (movie) {
      setFormData({
        ...movie,
        genres: movie.genres || []
      });
    } else {
      setFormData({
        ...movieSchema,
        genres: []
      });
    }
  }, [movie]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.overview.trim()) newErrors.overview = 'Overview is required';
    if (!formData.release_date) newErrors.release_date = 'Release date is required';
    if (!formData.rating || formData.rating < 0 || formData.rating > 10) {
      newErrors.rating = 'Rating must be between 0 and 10';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const addGenre = () => {
    setFormData(prev => ({
      ...prev,
      genres: [...prev.genres, '']
    }));
  };

  const removeGenre = (index) => {
    setFormData(prev => ({
      ...prev,
      genres: prev.genres.filter((_, i) => i !== index)
    }));
  };

  const updateGenre = (index, value) => {
    setFormData(prev => ({
      ...prev,
      genres: prev.genres.map((genre, i) => i === index ? value : genre)
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {movie ? 'Edit Movie' : 'Add New Movie'}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            disabled={isLoading}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter movie title"
                disabled={isLoading}
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>
            
            <div>
              <label htmlFor="rating" className="block text-sm font-semibold text-gray-700 mb-2">
                Rating (0-10) *
              </label>
              <input
                type="number"
                id="rating"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                min="0"
                max="10"
                step="0.1"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.rating ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="8.5"
                disabled={isLoading}
              />
              {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating}</p>}
            </div>
          </div>
          
          <div>
            <label htmlFor="release_date" className="block text-sm font-semibold text-gray-700 mb-2">
              Release Date *
            </label>
            <input
              type="date"
              id="release_date"
              name="release_date"
              value={formData.release_date}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                errors.release_date ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={isLoading}
            />
            {errors.release_date && <p className="text-red-500 text-sm mt-1">{errors.release_date}</p>}
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-semibold text-gray-700">
                Genres
              </label>
              <button
                type="button"
                onClick={addGenre}
                className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
                disabled={isLoading}
              >
                <Plus className="w-4 h-4" />
                Add Genre
              </button>
            </div>
            {formData.genres.map((genre, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <select
                  value={genre}
                  onChange={(e) => updateGenre(index, e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  disabled={isLoading}
                >
                  <option value="">Select a genre</option>
                  {genreOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => removeGenre(index)}
                  className="p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  disabled={isLoading}
                >
                  <Minus className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
          
          <div>
            <label htmlFor="overview" className="block text-sm font-semibold text-gray-700 mb-2">
              Overview *
            </label>
            <textarea
              id="overview"
              name="overview"
              value={formData.overview}
              onChange={handleChange}
              rows={4}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none ${
                errors.overview ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Brief overview of the movie"
              disabled={isLoading}
            />
            {errors.overview && <p className="text-red-500 text-sm mt-1">{errors.overview}</p>}
          </div>
          
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  {movie ? 'Update Movie' : 'Create Movie'}
                </>
              )}
            </button>
            
            <button
              type="button"
              onClick={onCancel}
              disabled={isLoading}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MovieForm;
import movieSlice, {
  MoviesState,
  markAsFavorite,
} from './movieSlice';
import { ReadableMovie } from '..//Types';

const getMovie = (id: number, title: string): ReadableMovie => {
  return {
    poster_path: '',
    overview: '',
    vote_count: 1,
    id: id,
    release_date: '',
    title: title,
  }
}

describe('movie reducer', () => {

  const movieState: MoviesState = {
    results: [],
    page: 0,
    total_pages: 0,
    total_results: 0,
    status: 'idle',
    favorites: [],
  };

  it('should handle initial state', () => {
    expect(movieSlice(undefined, { type: 'unknown' })).toEqual({
      results: [],
      page: 0,
      total_pages: 0,
      total_results: 0,
      status: 'idle',
      favorites: [],
    });
  });

  it('should add in favorites', () => {
    const movie = getMovie(1, 'hi')
    const actual = movieSlice(movieState, markAsFavorite(movie));
    expect(actual.favorites[0]).toEqual(movie);
  });

  it('should remove from favorites', () => {
    const movie = getMovie(1, 'hi')
    const addedOneState = movieSlice(movieState, markAsFavorite(movie));
    const actual = movieSlice(addedOneState, markAsFavorite(movie));
    expect(actual.favorites.length).toEqual(0);
  });
  
});

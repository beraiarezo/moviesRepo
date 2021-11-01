import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from 'src/app/store';
import { fetchTopRatedMovies } from '../Requests';
import { ITopRatedMovies, ReadableMovie } from 'src/Types';

export interface MoviesState extends ITopRatedMovies {
  status: 'idle' | 'loading'
  favorites: ReadableMovie[]
}

const initialState: MoviesState = {
  results: [],
  page: 0,
  total_pages: 0,
  total_results: 0,
  status: 'idle',
  favorites: [],
};

export const fetchMovies = createAsyncThunk(
  'movies/fetchTopRated',
  async (page: number) => {
    const response = await fetchTopRatedMovies(page);
    return response.data;
  }
);

export const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    markAsFavorite: (state, action: PayloadAction<ReadableMovie>) => {
      let alreadyInFavs = state.favorites.find(fav => fav.id === action.payload.id)
      if(alreadyInFavs) {
        state.favorites = state.favorites.filter(fav => fav.id !== action.payload.id)  
      } else {
        state.favorites = [...state.favorites, action.payload]
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => ({
        ...state,
        status: 'idle',
        total_pages: action.payload.total_pages,
        total_results: action.payload.total_results,
        page: action.payload.page,
        results: [...state.results, ...action.payload.results],
      }))
  },
});

export const { markAsFavorite } = movieSlice.actions;

export const selectTopRatedState = (state: RootState) => state.TopRated;
export const selectFavorites = (state: RootState) => state.TopRated.favorites
export const loadMoreMovies = (page: number): AppThunk => (dispatch) => {
  dispatch(fetchMovies(page))
};

export default movieSlice.reducer;

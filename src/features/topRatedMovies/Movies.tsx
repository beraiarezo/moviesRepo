import React from 'react';
import styled from 'styled-components'
import { useAppSelector, useAppDispatch } from 'src/app/hooks';
import {
  selectTopRatedState,
  loadMoreMovies,
} from 'src/store/movieSlice';
import { MovieBox, Loader, PageTitle } from 'src/components'
import * as colors from 'src/consts/colors'

const LoadMore = styled.div`
  width: 100%;
  background: ${colors.gray};
  text-align: center;
  padding: 10px 0;
  border-radius: 5px;
  cursor: pointer;
  color: ${colors.primaryDark};
  font-weight: bold;
  transition: all .2s ease;
  &:hover {
    padding: 13px 0;
  }
`

export function Movies() {
  const topRated = useAppSelector(selectTopRatedState);
  const dispatch = useAppDispatch();
  return (
    <>
      <PageTitle textColor={colors.success}>
          TOP RATED
      </PageTitle>
      {topRated.results.map(movie => (
          <MovieBox 
            key={movie.id}
            id={movie.id}
            title={movie.title}
            overview={movie.overview}
            vote_count={movie.vote_count}
            release_date={movie.release_date}
            poster_path={movie.poster_path} 
          />
      ))}
      {topRated.status === 'loading' && (
        <Loader />
      )}
      <LoadMore 
        onClick={() => dispatch(loadMoreMovies(topRated.page + 1))}
        >Load More</LoadMore>
  </>
  );
}

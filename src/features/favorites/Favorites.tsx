import React from 'react';
import { useAppSelector } from 'src/app/hooks';
import { selectFavorites } from 'src/store/movieSlice';
import { MovieBox, Overlay, PageTitle } from 'src/components'
import * as colors from 'src/consts/colors'

export function Favorites() {
    const favorites = useAppSelector(selectFavorites);
    return (
        <>
        <PageTitle textColor={colors.primary}>
            MY MOVIES
        </PageTitle>
        {favorites.map(movie => (
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
        <Overlay></Overlay>
    </>
    );
}

import React, { FC } from 'react'
import { useAppSelector, useAppDispatch } from 'src/app/hooks';
import styled, { css } from 'styled-components'
import { Flex } from 'src/components'
import * as colors from 'src/consts/colors'
import { ReadableMovie } from 'src/Types'
import { iconLike, iconCalendar, iconStar } from 'src/assets'
import {
    markAsFavorite,
    selectFavorites,
} from 'src/store/movieSlice'
import { getUi } from 'src/store/uiSlice'

const Wrapper = styled(Flex)<{isSmall: boolean, isTouch?: boolean}>`
    width: ${props => props.isSmall | props.isTouch ? 100 : 47}%;
    padding: ${props => props.isSmall | props.isTouch ? 10 : 15}px;
    border: 1px solid ${colors.primary}; 
    height:  ${props => props.isSmall | props.isTouch ? 'auto' : '250px'};
    margin-bottom: 20px;
    border-radius: 4px;
    background-color: ${colors.secondaryWhite};
    position: relative;
    align-items: center;
    z-index: 2;
`

const PosterContainer = styled(Flex)<{isTouch: boolean}>`
  margin-right: ${props => props.isTouch ? 0 : 3}%;
  margin-bottom: ${props => props.isTouch ? 15 : 0}px;
`

const Poster = styled.img<{isTouch: boolean}>`
  max-height: ${props => props.isTouch ? 400 : 220}px;
`

const Title = styled.h4`
    margin: 0 0 7px 0;
`

const baseStyles = css<{color: string}>`
    width: 100%;
    margin: 0 0 5px 0;
    background-size: 24px;
    background-repeat: no-repeat;
    padding: 4px 34px;
    color: ${props => props.color};
    font-weight: 500;
`
const Overview = styled.p`
    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    overflow: hidden;
`
const VoteCount = styled.p`
    ${baseStyles};
    background-image: url(${iconLike});
`
const ReleaseDate = styled.p`
    ${baseStyles};
    background-image: url(${iconCalendar});
`
const Favorite = styled.div`
    position: absolute;
    right: 15px;
    bottom: 15px;
    padding: 5px 10px 5px 30px;
    background-color: ${colors.primary};
    border-radius: 5px;
    color: ${colors.white};
    font-weight: 500;
    background-image: url(${iconStar});
    background-size: 20px;
    background-repeat: no-repeat;
    background-position: 5px center;
    cursor: pointer;
    transition: all .2s linear;
    &:hover {
        opacity: 0.7;
    }
`

const MovieBox: FC<ReadableMovie> = ({ title, overview, vote_count, poster_path, id, release_date }) => {
    const dispatch = useAppDispatch();
    const favorites = useAppSelector(selectFavorites);
    const ui = useAppSelector(getUi);

    return (
        <Wrapper 
            isSmall={ui.isSmall}
            isTouch={ui.isTouch}
            column={ui.isTouch}>
            <PosterContainer
                isTouch={ui.isTouch}>
                {poster_path && (
                    <Poster 
                        src={`https://image.tmdb.org/t/p/original${poster_path}`} 
                        alt={title}
                        isTouch={ui.isTouch} />
                )}
            </PosterContainer>
            <Flex wrap="wrap">
                <Title>{title}</Title>
                <Overview>{overview}</Overview>
                <VoteCount color={colors.danger}>{vote_count}</VoteCount>
                <ReleaseDate color={colors.gray}>{release_date}</ReleaseDate>
            </Flex>
            <Favorite 
                onClick={() => dispatch(markAsFavorite({
                    poster_path,
                    overview,
                    vote_count,
                    id,
                    release_date,
                    title,
                }))}>
                    {favorites.find(fav => fav.id === id) ? 'Remove From Favorite' : "Favorite"}
            </Favorite>
        </Wrapper>
    )
}

export default MovieBox
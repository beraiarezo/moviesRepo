
export type ReadableMovie = {
    poster_path: string | null,
    overview: string,
    vote_count: number,
    id: number,
    release_date: string,
    title: string,
}
export type Movie = ReadableMovie & {
    adult: boolean,
    genre_ids: number[],
    original_title: string,
    original_language: string,
    backdrop_path: string | null,
    popularity: number,
    video: boolean,
    vote_average: number
}

export interface ITopRatedMovies {
    page: number,
    results: Movie[],
    total_results: number,
    total_pages: number
}

export interface IUi {
    isSmall: boolean
    isTouch: boolean
}
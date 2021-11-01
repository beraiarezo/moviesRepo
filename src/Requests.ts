

import { API } from './Api'
import { ITopRatedMovies } from './Types'

const fetchTopRatedMovies = (page: number) => API.request<ITopRatedMovies>('GET', `?page=${page}`);

export default {
    fetchTopRatedMovies
}


import { API } from './Api'
import { ITopRatedMovies } from './Types'

export const fetchTopRatedMovies = (page: number) => API.request<ITopRatedMovies>('GET', `?page=${page}`);

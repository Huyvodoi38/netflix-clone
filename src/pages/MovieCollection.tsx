import { useEffect, useState } from "react";
import { useDarkMode } from "../context/DarkModeContext";
import api from "../api/api";
import GenreList from "../components/GenreList";
import MovieListScroll from "../components/MovieListScroll";

interface Movie {
    id: number;
    original_title: string;
    title: string;
    overview: string;
    backdrop_path: string;
    poster_path: string;
    vote_count: number;
    release_date?: string;
    vote_average?: number;
    popularity?: number;
}

interface Genre {
    id: number;
    name: string;
}

const MovieCollection = () => {
    const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
    const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
    const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
    const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
    const [genres, setGenres] = useState<Genre[]>([]);
    const { dark } = useDarkMode();

    useEffect(() => {
        const fetchTrendingMovies = async () => {
            const response = await api.get('/trending/movie/day', {
                params: {
                    language: 'vi-VN',
                }
            });
            setTrendingMovies(response.data.results.slice(0, 15));
        }
        fetchTrendingMovies();
    }, []);

    useEffect(() => {

        const fetchPopularMovies = async () => {
            const response = await api.get('/movie/popular', {
                params: {
                    language: 'vi-VN',
                }
            });
            setPopularMovies(response.data.results.slice(0, 15));
        }
        fetchPopularMovies();
    }, []);

    useEffect(() => {

        const fetchTopRatedMovies = async () => {
            const response = await api.get('/movie/top_rated', {
                params: {
                    language: 'vi-VN',
                }
            });
            setTopRatedMovies(response.data.results.slice(0, 15));
        }
        fetchTopRatedMovies();
    }, []);

    useEffect(() => {

        const fetchUpcomingMovies = async () => {
            const response = await api.get('/movie/upcoming', {
                params: {
                    language: 'vi-VN',
                }
            });
            setUpcomingMovies(response.data.results.slice(0, 15));
        }
        fetchUpcomingMovies();
    }, []);

    useEffect(() => {
        const fetchGenres = async () => {
            const response = await api.get('/genre/movie/list', {
                params: {
                    language: 'vi-VN',
                }
            });
            setGenres(response.data.genres);
        }
        fetchGenres();
    }, []);
    
    return (
        <div>
            {/*Tag phim */}
            <div className="max-w-6xl mx-auto mt-10 mb-10">
                <GenreList genres={genres} />
            </div>
            {/*Xu hướng*/}
            <div className="ml-10 mt-10 mb-10 px-8">
                <h2 className={`text-3xl font-bold mb-10 ${dark ? 'text-white' : 'text-black'}`}>Xu hướng</h2>
                <MovieListScroll movieList={trendingMovies} />
            </div>
            {/*Phim nổi bật*/}
            <div className="ml-10 mt-10 mb-10 px-8">
                <h2 className={`text-3xl font-bold mb-10 ${dark ? 'text-white' : 'text-black'}`}>Phổ biến</h2>
                <MovieListScroll movieList={popularMovies} />
            </div>
            {/*Xếp hạng*/}
            <div className="ml-10 mt-10 mb-10 px-8">
                <h2 className={`text-3xl font-bold mb-10 ${dark ? 'text-white' : 'text-black'}`}>Xếp hạng</h2>
                <MovieListScroll movieList={topRatedMovies} />
            </div>
            {/*Sắp ra*/}
            <div className="ml-10 mt-10 mb-10 px-8">
                <h2 className={`text-3xl font-bold mb-10 ${dark ? 'text-white' : 'text-black'}`}>Sắp ra mắt</h2>
                <MovieListScroll movieList={upcomingMovies} />
            </div>
        </div>
    )
}

export default MovieCollection;
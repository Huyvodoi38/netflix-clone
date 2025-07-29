import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";


interface Movie {
    id: number;
    title: string;
    overview: string;
    backdrop_path: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    vote_count: number;
    popularity: number;
    genres: { id: number; name: string }[];
    runtime: number;
}

const MovieDetail = () => {
    const [movie, setMovie] = useState<Movie | null>(null);
    const { id } = useParams();
    useEffect(() => {
        const fetchMovie = async () => {
            const response = await api.get(`/movie/${id}`, {
                params: {
                    language: 'vi-VN',
                },
            });
            setMovie(response.data);
        }
        fetchMovie();
    }, [id]);
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const formatRuntime = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
      };

    return (
        <div className="w-full min-h-120 relative overflow-hidden rounded-l">
            {/* Background image */}
            <div className="absolute inset-0" style={{ backgroundImage: `url(${movie?.backdrop_path})` }}>
                <img 
                    src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`} 
                    alt={movie?.title} 
                    className="absolute inset-0 w-full h-full object-cover opacity-50" 
                />
            </div>
        </div>
    )
}

export default MovieDetail;
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../context/DarkModeContext";

interface Genre {
    id: number;
    name: string;
}

const GenreList = ({id, genres}: {id?: number, genres: Genre[]}) => {
    const navigate = useNavigate();
    const { dark } = useDarkMode();
    
    const handleGenreClick = (genreId: number) => {
        navigate(`/movie-collection/${genreId}`);
    }

    return (
        <div>
            <div className="flex flex-wrap gap-4 px-6">
                {genres.map((genre) => (
                    <div key={genre.id} className="relative">
                    {id === genre.id ? 
                        <div className={`absolute inset-0 ${dark ? 'bg-gray-600' : 'bg-gray-300'} rounded-lg opacity-40 z-0 pointer-events-none`}></div> : 
                        <div className={`absolute inset-0 ${dark ? 'bg-gray-700' : 'bg-gray-500'} rounded-lg opacity-30 z-0 pointer-events-none`}></div>
                    }
                    <button onClick={() => handleGenreClick(genre.id)} className="relative z-10 rounded-lg p-1 cursor-pointer hover:opacity-50 transition-all duration-300 flex items-center gap-2">
                        <h2 className={`text-lg font-medium ${dark ? 'text-white' : 'text-black'}`}>{genre.name}</h2>
                    </button>
                </div>
                ))}
            </div>
        </div>
    )
}

export default GenreList;
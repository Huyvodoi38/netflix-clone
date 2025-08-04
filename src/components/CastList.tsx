import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface Cast {
    id: number;
    name: string;
    character: string;
    profile_path: string;
}

interface CastListProps {
    castList: Cast[];
}

const CastList = ({ castList }: CastListProps) => {
    const navigate = useNavigate();
    const castRef = useRef<HTMLDivElement>(null);

    const handleCastClick = (cast: Cast) => {
        navigate(`/cast/${cast.id}`);
    };

    const scrollLeft = () => {
        if (castRef.current) {
            const container = castRef.current;
            const scrollAmount = 1000;
            if (container.scrollLeft <= 0) {
                container.scrollTo({
                    left: container.scrollWidth - container.clientWidth,
                    behavior: 'smooth'
                });
            } else {
                container.scrollBy({
                    left: -scrollAmount,
                    behavior: 'smooth'
                });
            }
        }
    };

    const scrollRight = () => {
        if (castRef.current) {
            const container = castRef.current;
            const scrollAmount = 1000;
            if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
                container.scrollTo({
                    left: 0,
                    behavior: 'smooth'
                });
            } else {
                container.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            }
        }
    };

    useEffect(() => {
        const scrollContainer = castRef.current;
        if (scrollContainer) {
            scrollContainer.scrollTo({
                left: 0,
                behavior: 'smooth'
            });
        }
    }, [castList]);

    return (
        <div className="relative">
            <div className="flex items-center overflow-hidden">
                <button
                    onClick={scrollLeft}
                    className="flex-shrink-0 bg-black/70 hover:bg-black/90 text-white w-12 h-12 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110 z-20 mr-8"
                    aria-label="Scroll left"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <div
                    className="flex gap-20 overflow-x-auto scrollbar-hide scroll-smooth px-6 flex-1"
                    ref={castRef}
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >

                    {castList.map((cast) => (
                        <div
                            key={cast.id}
                            className="flex-shrink-0 w-48 group/item cursor-pointer"
                            onClick={() => handleCastClick(cast)}
                        >
                            <img
                                src={cast.profile_path   ? `https://image.tmdb.org/t/p/w500${cast.profile_path}` : 'https://i.pinimg.com/736x/8f/1c/a2/8f1ca2029e2efceebd22fa05cca423d7.jpg'}
                                alt={cast.name}
                                className="relative overflow-hidden rounded-lg bg-gray-800 w-full h-72 object-cover transition-transform duration-300 group-hover/item:scale-105"
                                loading="lazy"
                            />
                            <h3 className="mt-3 px-1 font-medium text-sm line-clamp-2 text-center">
                                {cast.name}
                            </h3>
                            <p className="mt-1 px-1 text-xs line-clamp-1 text-center">
                                ({cast.character})
                            </p>
                        </div>
                    ))}
                </div>

                <button
                    onClick={scrollRight}
                    className="flex-shrink-0 bg-black/70 hover:bg-black/90 text-white w-12 h-12 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110 z-20 mr-8"
                    aria-label="Scroll right"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default CastList;
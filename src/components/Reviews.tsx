import { useEffect, useState } from 'react';
import { useDarkMode } from '../context/DarkModeContext';
import api from '../api/api';
import CloseButton from './CloseButton';

interface ReviewsProps {
    movieId: number | undefined;
    onClose: () => void;
}

interface Review {
    author: string;
    author_details: {
        name: string;
        username: string;
        avatar_path: string;
        rating: number;
    };
    content: string;
    created_at: string;
    id: string;
    updated_at: string;
}

const Reviews = ({ movieId, onClose }: ReviewsProps) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const { dark } = useDarkMode();

    useEffect(() => {
        const fetchReviews = async () => {
            const response = await api.get(`/movie/${movieId}/reviews`);
            setReviews(response.data.results);
        }
        fetchReviews();
    }, [movieId]);

    const formatDate = (date: string) => {
        const dateObj = new Date(date);
        return dateObj.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    }

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <CloseButton onClose={onClose} className="absolute top-8 right-8" />
            <div className={`${dark ? 'bg-black border-gray-600' : 'bg-white border-gray-300'} rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border-2`} onClick={(e) => e.stopPropagation()}>
                <h3 className={`${dark ? 'text-white' : 'text-gray-900'} text-2xl font-bold p-6 border-b ${dark ? 'border-gray-700' : 'border-gray-200'}`}>Đánh giá phim</h3>
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)] scrollbar-hide">
                    {reviews.length > 0 ? reviews.map((review, index) => (
                        <div key={review.id} className={`${index !== reviews.length - 1 ? `border-b ${dark ? 'border-gray-700' : 'border-gray-200'} pb-6` : ''} mb-6`}>
                            <div className="flex items-center mb-2">
                                <img
                                    src={review.author_details.avatar_path ? `https://image.tmdb.org/t/p/original${review.author_details.avatar_path}` : 'https://i.pinimg.com/736x/8f/1c/a2/8f1ca2029e2efceebd22fa05cca423d7.jpg'}
                                    alt={review.author_details.name}
                                    className="w-10 h-10 rounded-full"
                                />
                                <div className="ml-3">
                                    <h4 className={`${dark ? 'text-white' : 'text-gray-900'} text-lg font-semibold`}>{review.author_details.name}</h4>
                                    <p className={`${dark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>{review.author_details.username}</p>
                                    <p className={`${dark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>{formatDate(review.created_at)}</p>
                                </div>
                            </div>
                            <p className={`${dark ? 'text-gray-300' : 'text-gray-700'}`}>{review.content}</p>
                        </div>
                    )) : <div className={`${dark ? 'text-gray-400' : 'text-gray-600'} text-center`}>Không có bình luận</div>}
                </div>
            </div>
        </div>
    )
}

export default Reviews;
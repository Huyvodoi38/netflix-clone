interface CloseButtonProps {
    onClose: () => void;
    className?: string;
}

const CloseButton = ({ onClose, className }: CloseButtonProps) => {
    return (
        <button
            onClick={onClose}
            className={`absolute top-4 right-4 text-white hover:text-gray-500 cursor-pointer z-10 ${className}`}
        >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
    )
}

export default CloseButton;
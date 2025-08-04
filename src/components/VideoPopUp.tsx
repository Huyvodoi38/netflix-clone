import CloseButton from "./CloseButton";

interface VideoPopUpProps {
    videoKey: string;
    onClose: () => void;
}

const VideoPopUp = ({ videoKey, onClose }: VideoPopUpProps) => {
    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            {/* Close Button - Outside video frame */}
            <CloseButton onClose={onClose} className="absolute top-8 right-8" />

            <div className="relative max-w-5xl w-full max-h-[90vh] aspect-video bg-black rounded-lg overflow-hidden">
                <iframe
                    src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=0`}
                    className="w-full h-full"
                    title="Trailer"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
};

export default VideoPopUp;
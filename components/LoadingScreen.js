import { PulseLoader } from 'react-spinner';

export default function LoadingScreen({ isLoading }) {
    return (
        <div className="fixed z-10 inset-0 bg-white/75 w-full h-full">
            <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                <PulseLoader color="rgb(79 70 229);" loading={isLoading} size={30} speedMultiplier="0.6" />
            </div>
        </div>
    );
}


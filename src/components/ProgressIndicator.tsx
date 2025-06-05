import React from 'react';

const ProgressIndicator: React.FC<{ progress: number }> = ({ progress }) => {
    return (
        <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
            <div
                className="bg-blue-600 h-4 rounded-full transition-all duration-300 flex items-center justify-center text-xs text-white font-bold"
                style={{ width: `${progress}%` }}
            >
                {progress}%
            </div>
        </div>
    );
};

export default ProgressIndicator;
import React from 'react';

const ErrorHandler: React.FC<{ error: string | null }> = ({ error }) => {
    if (!error) return null;
    return (
        <div className="mt-4 p-4 bg-red-100 border border-red-300 text-red-800 rounded-lg shadow">
            <strong>Error:</strong> {error}
        </div>
    );
};

export default ErrorHandler;
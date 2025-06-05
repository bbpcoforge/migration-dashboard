import React, { useEffect, useState } from 'react';

const StatusUpdates: React.FC<{ status: string }> = ({ status }) => {
    const [statusMessages, setStatusMessages] = useState<string[]>([]);

    useEffect(() => {
        if (status) setStatusMessages((prev) => [...prev, status]);
    }, [status]);

    return (
        <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Status Updates</h2>
            <ul className="space-y-1 text-gray-600 text-sm">
                {statusMessages.map((message, index) => (
                    <li key={index}>{message}</li>
                ))}
            </ul>
        </div>
    );
};

export default StatusUpdates;
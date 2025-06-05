import React, { useState } from 'react';

const MigrationOptions = () => {
    const [contentTypes, setContentTypes] = useState<string[]>([]);
    const [mediaSettings, setMediaSettings] = useState<string>('');

    const handleContentTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = Array.from(event.target.selectedOptions, option => option.value);
        setContentTypes(value);
    };

    const handleMediaSettingsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMediaSettings(event.target.value);
    };

    return (
        <div className="mb-6 p-6 bg-gray-50 border border-gray-200 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Migration Options</h2>
            <div className="mb-4">
                <label htmlFor="content-types" className="block text-gray-700 font-medium mb-1">Select Content Types to Migrate:</label>
                <select
                    id="content-types"
                    multiple
                    onChange={handleContentTypeChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <option value="posts">Posts</option>
                    <option value="pages">Pages</option>
                    <option value="media">Media</option>
                </select>
            </div>
            <div>
                <label htmlFor="media-settings" className="block text-gray-700 font-medium mb-1">Media Settings:</label>
                <input
                    type="text"
                    id="media-settings"
                    value={mediaSettings}
                    onChange={handleMediaSettingsChange}
                    placeholder="Enter media settings"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>
        </div>
    );
};

export default MigrationOptions;
import { MigrationOptions } from '../types';

export const importContentToSitecore = async (extractedContent: any, options: MigrationOptions) => {
    try {
        // Logic to import content into Sitecore
        const response = await fetch('/api/migrate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ extractedContent, options }),
        });

        if (!response.ok) {
            throw new Error('Failed to import content');
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error during content import:', error);
        throw error;
    }
};

export const handleImportErrors = (error: any) => {
    // Logic to handle and log errors during the import process
    console.error('Import Error:', error);
    return { success: false, message: error.message || 'An unknown error occurred' };
};
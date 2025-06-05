import { NextApiRequest, NextApiResponse } from 'next';
import { extractContent } from '../../utils/contentExtraction';
import { importContent } from '../../utils/contentImport';
import { MigrationOptions } from '../../types';

export default async function migrate(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const migrationOptions: MigrationOptions = req.body;

    try {
        // Step 1: Extract content from WordPress
        const extractedData = await extractContent(migrationOptions);

        // Step 2: Import content into Sitecore
        const importResult = await importContent(extractedData);

        return res.status(200).json({ message: 'Migration successful', data: importResult });
    } catch (error) {
        console.error('Migration error:', error);
        return res.status(500).json({ message: 'Migration failed', error: error.message });
    }
}
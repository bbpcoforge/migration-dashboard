import { NextApiRequest, NextApiResponse } from 'next';

let migrationStatus = {
  inProgress: false,
  progress: 0,
  message: '',
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(migrationStatus);
  } else if (req.method === 'POST') {
    const { action } = req.body;

    if (action === 'start') {
      migrationStatus = {
        inProgress: true,
        progress: 0,
        message: 'Migration started...',
      };
      res.status(200).json({ message: 'Migration started' });
    } else if (action === 'update') {
      const { progress, message } = req.body;
      migrationStatus.progress = progress;
      migrationStatus.message = message;

      if (progress >= 100) {
        migrationStatus.inProgress = false;
        migrationStatus.message = 'Migration completed successfully.';
      }

      res.status(200).json({ message: 'Status updated' });
    } else {
      res.status(400).json({ message: 'Invalid action' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
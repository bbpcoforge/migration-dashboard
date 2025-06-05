# Migration Dashboard

This project is a web-based migration dashboard designed to facilitate the seamless migration of WordPress websites to Sitecore. It provides a user-friendly interface with one-click migration capabilities, status updates, and detailed reporting.

## Features

- **Migration Options Configuration**: Users can configure various migration options, including content types and media settings.
- **Migrate Now Button**: A prominent button that initiates the migration process with a single click.
- **Progress Indicators**: Visual indicators that display the progress of the migration in real-time.
- **Status Updates**: Real-time updates on the migration status, including success and error messages.
- **Error Handling**: Comprehensive error handling to manage and display any issues encountered during migration.
- **Summary Report**: A detailed report upon completion of the migration, summarizing what was migrated and any issues that arose.

## Project Structure

```
migration-dashboard
├── src
│   ├── components
│   │   ├── MigrationOptions.tsx
│   │   ├── MigrateNowButton.tsx
│   │   ├── ProgressIndicator.tsx
│   │   ├── StatusUpdates.tsx
│   │   ├── ErrorHandler.tsx
│   │   └── SummaryReport.tsx
│   ├── pages
│   │   ├── _app.tsx
│   │   ├── index.tsx
│   │   └── api
│   │       ├── migrate.ts
│   │       └── status.ts
│   ├── styles
│   │   └── globals.css
│   ├── utils
│   │   ├── contentExtraction.ts
│   │   ├── contentImport.ts
│   │   └── migrationHelpers.ts
│   └── types
│       └── index.ts
├── public
│   └── favicon.ico
├── next.config.js
├── package.json
├── tsconfig.json
└── README.md
```

## Getting Started

To get started with the migration dashboard, follow these steps:

1. **Clone the Repository**:
   ```
   git clone <repository-url>
   cd migration-dashboard
   ```

2. **Install Dependencies**:
   ```
   npm install
   ```

3. **Run the Development Server**:
   ```
   npm run dev
   ```

4. **Access the Dashboard**:
   Open your browser and navigate to `http://localhost:3000` to access the migration dashboard.

## Usage

- Configure your migration options using the provided interface.
- Click the "Migrate Now" button to start the migration process.
- Monitor the progress and status updates in real-time.
- Review the summary report upon completion to see the results of the migration.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
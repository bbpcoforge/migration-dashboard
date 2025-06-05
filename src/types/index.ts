export interface MigrationOptions {
  contentTypes: string[];
  mediaSettings: {
    includeMedia: boolean;
    mediaPath: string;
  };
}

export interface MigrationStatus {
  isMigrating: boolean;
  progress: number;
  message: string;
  errors: string[];
}

export interface SummaryReport {
  totalMigrated: number;
  totalErrors: number;
  details: Array<{
    contentType: string;
    migrated: number;
    errors: string[];
  }>;
}
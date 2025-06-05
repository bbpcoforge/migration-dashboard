export const validateMigrationOptions = (options) => {
    const { contentTypes, mediaSettings } = options;
    if (!contentTypes || contentTypes.length === 0) {
        throw new Error("Content types must be selected for migration.");
    }
    if (!mediaSettings) {
        throw new Error("Media settings must be configured.");
    }
    return true;
};

export const mapContentToSitecore = (content) => {
    // Example mapping logic
    return {
        title: content.title,
        body: content.body,
        media: content.media.map(mediaItem => ({
            url: mediaItem.url,
            alt: mediaItem.altText,
        })),
    };
};

export const generateSummaryReport = (migratedItems, errors) => {
    return {
        totalMigrated: migratedItems.length,
        errors: errors.length,
        details: migratedItems.map(item => ({
            title: item.title,
            status: item.status,
        })),
        errorMessages: errors,
    };
};
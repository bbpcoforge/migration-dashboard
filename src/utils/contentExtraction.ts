export const extractContent = async (wordpressUrl: string, contentTypes: string[]) => {
    // Logic to extract content from WordPress
    const response = await fetch(`${wordpressUrl}/wp-json/wp/v2/${contentTypes.join(',')}`);
    if (!response.ok) {
        throw new Error('Failed to fetch content from WordPress');
    }
    const content = await response.json();
    return content;
};

export const extractMedia = async (wordpressUrl: string) => {
    // Logic to extract media from WordPress
    const response = await fetch(`${wordpressUrl}/wp-json/wp/v2/media`);
    if (!response.ok) {
        throw new Error('Failed to fetch media from WordPress');
    }
    const media = await response.json();
    return media;
};
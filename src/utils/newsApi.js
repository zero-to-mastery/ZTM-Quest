// Fetch news from FIRST.org API
const NEWS_API_URL = 'https://api.first.org/data/v1/news';
const NEWS_LIMIT = 10; // Limit to 10 news articles as per issue requirement

/**
 * Fetches news articles from FIRST.org API
 * @returns {Promise<Array>} Array of news articles (limited to 10)
 */
export const fetchNews = async () => {
    try {
        const response = await fetch(`${NEWS_API_URL}?limit=${NEWS_LIMIT}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Check if data exists and has the expected structure
        if (data.status === 'OK' && data.data && Array.isArray(data.data)) {
            return data.data;
        }

        throw new Error('Invalid data format from API');
    } catch (error) {
        console.error('[NEWS API] Failed to fetch news:', error);
        // Return empty array on error so the game doesn't crash
        return [];
    }
};

/**
 * Format published date to readable string
 * @param {string} dateString - Date string from API
 * @returns {string} Formatted date
 */
export const formatNewsDate = (dateString) => {
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    } catch {
        return dateString;
    }
};

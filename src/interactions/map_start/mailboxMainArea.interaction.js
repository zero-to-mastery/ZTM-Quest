import { time } from '../../kplayCtx';
import { displayDialogue, showCustomPrompt } from '../../utils';
import { fetchNews, formatNewsDate } from '../../utils/newsApi';

// Cache for news to avoid fetching multiple times
let newsCache = null;
let abort;

/**
 * Show detailed view of a specific news article with back button
 */
const showNewsDetail = async (player, k, newsItem, returnPage = 0) => {
    const cleanSummary = newsItem.summary.replace(/<[^>]*>/g, ' ').trim();

    const detailMessage = `
        <div style="font-size: 14px; line-height: 1.6;">
        <strong>${newsItem.title}</strong> |
        <em>Published: ${formatNewsDate(newsItem.published)}</em> | ${newsItem.link ? `🔗 <a href="${newsItem.link}" target="_blank">Read more</a>` : ''} <br/><br/>
        ${cleanSummary}
        
        </div>
    `;

    const options = [
        {
            value: 'back',
            text: '← Back to list',
        },
    ];

    showCustomPrompt(
        detailMessage,
        options,
        (selectedValue) => {
            setTimeout(async () => {
                if (selectedValue === 'back') {
                    await showNewsList(player, k, returnPage);
                }
            }, 50);
        },
        player,
        k,
        abort
    );
};

/**
 * Show a list of news articles with pagination (2 at a time)
 */
const showNewsList = async (player, k, page = 0) => {
    if (!newsCache) {
        newsCache = await fetchNews();
    }

    if (newsCache.length === 0) {
        await displayDialogue({
            k,
            player,
            text: [
                'Unable to fetch news at the moment. Please try again later.',
            ],
        });
        return;
    }

    const itemsPerPage = 2;
    const totalPages = Math.ceil(newsCache.length / itemsPerPage);
    const startIndex = page * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, newsCache.length);
    const currentNews = newsCache.slice(startIndex, endIndex);

    const message = `<strong>News (Page ${page + 1}/${totalPages})</strong>`;

    // Create options for news items on this page
    const options = currentNews.map((news, index) => {
        const actualIndex = startIndex + index;
        const truncatedTitle =
            news.title.length > 50
                ? news.title.substring(0, 50) + '...'
                : news.title;

        return {
            value: actualIndex,
            text: `${actualIndex + 1}. ${truncatedTitle}`,
        };
    });

    // Add navigation buttons
    if (page > 0) {
        options.push({
            value: 'prev',
            text: '←',
        });
    }

    if (page < totalPages - 1) {
        options.push({
            value: 'next',
            text: '→',
        });
    }

    options.push({
        value: 'close',
        text: '✕ Close',
    });

    showCustomPrompt(
        message,
        options,
        (selectedValue) => {
            // Use setTimeout to avoid closing before showing next prompt
            setTimeout(async () => {
                if (selectedValue === 'prev') {
                    await showNewsList(player, k, page - 1);
                } else if (selectedValue === 'next') {
                    await showNewsList(player, k, page + 1);
                } else if (selectedValue === 'close') {
                    // Just close, do nothing
                    return;
                } else {
                    // It's a news index
                    const selectedNews = newsCache[selectedValue];
                    await showNewsDetail(player, k, selectedNews, page);
                }
            }, 50);
        },
        player,
        k,
        abort
    );
};

export const interactionWithMainboxMainArea = (player, k, map) => {
    player.onCollide('mailbox_mainArea', async () => {
        time.paused = true;
        player.state.isInDialog = true;
        abort = new AbortController();
        await showNewsList(player, k);
    });
};

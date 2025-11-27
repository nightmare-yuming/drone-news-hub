// ==========================================
// Drone News Hub - JavaScript
// ==========================================

// Real News Data with Verified Sources
// Last updated: 2025-11-27 00:42:16 UTC
const newsData = [
    {
        id: 1,
        title: "How drones are altering contemporary warfare",
        excerpt: "A new book by scholar and military officer Erik Lin-Greenberg examines the evolving dynamics of military and state action centered around drones.",
        category: "military",
        source: "MIT Technology Review",
        date: "2025-11-13",
        url: "https://news.mit.edu/2025/how-drones-are-altering-contemporary-warfare-erik-lin-greenberg-book-1113"
    },
    {
        id: 2,
        title: "Accounting for uncertainty to help engineers design complex systems",
        excerpt: "The approach could enable autonomous vehicles, commercial aircraft, or transportation networks that are more reliable in the face of real-world unpredictability.",
        category: "technology",
        source: "MIT Technology Review",
        date: "2025-10-02",
        url: "https://news.mit.edu/2025/accounting-uncertainty-help-engineers-design-complex-systems-1002"
    },
    {
        id: 3,
        title: "Lidar helps gas industry find methane leaks and avoid costly losses",
        excerpt: "Lincoln Laboratory transitioned its optical-amplifier technology to Bridger Photonics for commercialization, enhancing US energy security and efficiency.",
        category: "technology",
        source: "MIT Technology Review",
        date: "2025-09-12",
        url: "https://news.mit.edu/2025/lidar-helps-gas-industry-find-methane-leaks-avoid-costly-losses-0912"
    },
    {
        id: 4,
        title: "MIx helps innovators tackle challenges in national security",
        excerpt: "Mission Innovation x creates education and research opportunities while facilitating connections between defense agencies and MIT innovators.",
        category: "military",
        source: "MIT Technology Review",
        date: "2025-06-24",
        url: "https://news.mit.edu/2025/mix-helps-innovators-tackle-challenges-national-security-0624"
    },
    {
        id: 5,
        title: "AI-enabled control system helps autonomous drones stay on target in uncertain environments",
        excerpt: "The system automatically learns to adapt to unknown disturbances such as gusting winds.",
        category: "technology",
        source: "MIT Technology Review",
        date: "2025-06-09",
        url: "https://news.mit.edu/2025/ai-enabled-control-system-helps-autonomous-drones-uncertain-environments-0609"
    },
    {
        id: 6,
        title: "Zero Zero Robotics’ founder on riding the startup rollercoaster for a decade",
        excerpt: "Zero Zero Robotics’ founder on riding the startup rollercoaster for a decade...",
        category: "technology",
        source: "IEEE Spectrum",
        date: "2025-11-27",
        url: "https://spectrum.ieee.org/hoverair-x1"
    },
    {
        id: 7,
        title: "Hitchhiker latches on using trajectory tracking and suction cups",
        excerpt: "Hitchhiker latches on using trajectory tracking and suction cups...",
        category: "technology",
        source: "IEEE Spectrum",
        date: "2025-11-27",
        url: "https://spectrum.ieee.org/drone-landing-2659913493"
    },
    {
        id: 8,
        title: "An electric hydrofoiling bicycle, consumer lidar, and an air conditioner that uses water instead of coolant caught my attention at CES 2020",
        excerpt: "Latest developments in drone technology from IEEE Spectrum.",
        category: "technology",
        source: "IEEE Spectrum",
        date: "2025-11-27",
        url: "https://spectrum.ieee.org/ces-2020-the-bestand-wildestgadgets-of-the-show"
    },
    {
        id: 9,
        title: "How UAVs benefit consumers through faster estimates, quicker response times and faster delivery of benefits",
        excerpt: "Latest developments in drone technology from IEEE Spectrum.",
        category: "technology",
        source: "IEEE Spectrum",
        date: "2025-11-27",
        url: "https://spectrum.ieee.org/changing-the-landscape-of-the-insurance-market"
    }
];

// State Management
let currentFilters = {
    search: '',
    categories: new Set(['all']),
    sources: new Set(['all'])
};

// DOM Elements
const searchInput = document.getElementById('searchInput');
const newsGrid = document.getElementById('newsGrid');
const categoryCheckboxes = document.querySelectorAll('#categoryFilters input[type="checkbox"]');
const sourceCheckboxes = document.querySelectorAll('#sourceFilters input[type="checkbox"]');

// ==========================================
// Initialization
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    renderNews(newsData);
    setupEventListeners();
});

// ==========================================
// Event Listeners
// ==========================================
function setupEventListeners() {
    // Search input
    searchInput.addEventListener('input', (e) => {
        currentFilters.search = e.target.value.toLowerCase();
        filterAndRenderNews();
    });

    // Category filters
    categoryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            handleFilterChange(e, 'categories', categoryCheckboxes);
        });
    });

    // Source filters
    sourceCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            handleFilterChange(e, 'sources', sourceCheckboxes);
        });
    });
}

// ==========================================
// Filter Handling
// ==========================================
function handleFilterChange(event, filterType, allCheckboxes) {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (value === 'all') {
        if (isChecked) {
            currentFilters[filterType] = new Set(['all']);
            allCheckboxes.forEach(cb => {
                if (cb.value !== 'all') cb.checked = false;
            });
        }
    } else {
        if (isChecked) {
            currentFilters[filterType].delete('all');
            currentFilters[filterType].add(value);
            document.querySelector(`#${filterType === 'categories' ? 'cat' : 'src'}-all`).checked = false;
        } else {
            currentFilters[filterType].delete(value);
            if (currentFilters[filterType].size === 0) {
                currentFilters[filterType].add('all');
                document.querySelector(`#${filterType === 'categories' ? 'cat' : 'src'}-all`).checked = true;
            }
        }
    }

    filterAndRenderNews();
}

// ==========================================
// Filtering Logic
// ==========================================
function filterAndRenderNews() {
    const filteredNews = newsData.filter(article => {
        // Search filter
        const searchMatch = !currentFilters.search || 
            article.title.toLowerCase().includes(currentFilters.search) ||
            article.excerpt.toLowerCase().includes(currentFilters.search) ||
            article.source.toLowerCase().includes(currentFilters.search);

        // Category filter
        const categoryMatch = currentFilters.categories.has('all') || 
            currentFilters.categories.has(article.category);

        // Source filter
        const sourceMatch = currentFilters.sources.has('all') || 
            currentFilters.sources.has(article.source);

        return searchMatch && categoryMatch && sourceMatch;
    });

    renderNews(filteredNews);
}

// ==========================================
// Rendering
// ==========================================
function renderNews(articles) {
    if (articles.length === 0) {
        newsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 2rem;">
                <h3 style="color: var(--color-text-secondary); font-size: 1.5rem;">
                    😔 沒有找到符合條件的新聞
                </h3>
                <p style="color: var(--color-text-muted); margin-top: 1rem;">
                    請嘗試調整搜尋條件或篩選器
                </p>
            </div>
        `;
        return;
    }

    newsGrid.innerHTML = articles.map(article => createNewsCard(article)).join('');
}

function createNewsCard(article) {
    const formattedDate = formatDate(article.date);
    const searchKeyword = article.title.substring(0, 30) + (article.title.length > 30 ? '...' : '');
    
    return `
        <article class="news-card">
            <div class="card-header">
                <span class="category-badge ${article.category}">${getCategoryLabel(article.category)}</span>
                <span class="card-date">${formattedDate}</span>
            </div>
            <h3 class="card-title">${article.title}</h3>
            <p class="card-excerpt">${article.excerpt}</p>
            <div class="card-footer">
                <span class="card-source">📰 ${article.source}</span>
                <a href="${article.url}" target="_blank" rel="noopener noreferrer" class="card-link" onclick="event.stopPropagation()">
                    前往來源網站 →
                </a>
            </div>
            <div class="card-search-hint">
                💡 提示: 在來源網站搜尋「${searchKeyword}」
            </div>
        </article>
    `;
}

// ==========================================
// Utility Functions
// ==========================================
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return '今天';
    if (diffDays === 1) return '昨天';
    if (diffDays < 7) return `${diffDays} 天前`;
    
    return date.toLocaleDateString('zh-TW', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

function getCategoryLabel(category) {
    const labels = {
        technology: '技術',
        military: '軍事',
        commercial: '商業',
        research: '研究',
        regulation: '法規'
    };
    return labels[category] || category;
}

// ==========================================
// Smooth Scroll
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

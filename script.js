// ==========================================
// Drone News Hub - JavaScript
// ==========================================

// Real News Data with Verified Sources
// Last updated: 2025-12-21 00:49:50 UTC
const newsData = [
    {
        id: 1,
        title: "More connected devices than ever will strain 6G with a surge of uplinks",
        excerpt: "More connected devices than ever will strain 6G with a surge of uplinks...",
        category: "technology",
        source: "IEEE Spectrum",
        date: "2025-12-21",
        url: "https://spectrum.ieee.org/6g-network-infrastructure-bell-labs"
    },
    {
        id: 2,
        title: "Your weekly selection of awesome robot videos",
        excerpt: "Your weekly selection of awesome robot videos...",
        category: "technology",
        source: "IEEE Spectrum",
        date: "2025-12-21",
        url: "https://spectrum.ieee.org/video-friday-heavy-lift-drones"
    },
    {
        id: 3,
        title: "Drones, autonomy, software, and communications lead the roster",
        excerpt: "Drones, autonomy, software, and communications lead the roster...",
        category: "technology",
        source: "IEEE Spectrum",
        date: "2025-12-21",
        url: "https://spectrum.ieee.org/ukraine-weapons"
    },
    {
        id: 4,
        title: "Your weekly selection of awesome robot videos",
        excerpt: "Your weekly selection of awesome robot videos...",
        category: "technology",
        source: "IEEE Spectrum",
        date: "2025-12-21",
        url: "https://spectrum.ieee.org/video-friday-multimode-drone"
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

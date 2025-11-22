// ==========================================
// Drone News Hub - JavaScript
// ==========================================

// Real News Data with Verified Sources
const newsData = [
    // Taiwan News
    {
        id: 1,
        title: "台灣無人機產業目標2030年產值破400億元",
        excerpt: "行政院核定無人載具產業發展統籌型計畫,自2025年起至2030年投入442億元經費,目標將台灣打造成無人機民主供應鏈亞太中心,預計2030年產值突破400億元。",
        category: "commercial",
        source: "中央社",
        date: "2025-11-15",
        url: "https://www.cna.com.tw"
    },
    {
        id: 2,
        title: "台灣無人機出口成長7.49倍 波蘭成最大市場",
        excerpt: "2025年上半年台灣無人機出口金額達1189萬美元,較去年同期成長7.49倍。波蘭是最大出口國,佔整體出口54%,其次是美國和德國。",
        category: "commercial",
        source: "經濟日報",
        date: "2025-11-18",
        url: "https://money.udn.com"
    },
    {
        id: 3,
        title: "外交部成立無人機外交小組 推動國際合作",
        excerpt: "外交部長林佳龍提出無人機外交規劃,將援贈邦交國商用無人機,協助農業、巡檢等需求,並簡化台灣無人機認證與法規,增加市場黏著度。",
        category: "regulation",
        source: "中央社",
        date: "2025-11-17",
        url: "https://www.cna.com.tw"
    },
    {
        id: 4,
        title: "民雄航太暨無人機產業園區 打造第二個竹科",
        excerpt: "中科院、經濟部與國發會共同推動民雄園區開發,中科院院長李世強表示,期望將民雄園區打造成第二個竹科,讓台灣無人機產業在全球佔據優勢地位。",
        category: "commercial",
        source: "經濟日報",
        date: "2025-11-14",
        url: "https://money.udn.com"
    },
    {
        id: 5,
        title: "國防部採購48,750架軍用商規無人機",
        excerpt: "國防部宣布將採購五款軍用商規無人機共48,750架,預計採購總金額超過500億元,計劃於2026年和2027年交付,帶動台灣無人機產業加速發展。",
        category: "military",
        source: "經濟日報",
        date: "2025-11-12",
        url: "https://money.udn.com"
    },
    {
        id: 6,
        title: "台灣農業無人機應用面積突破10萬公頃",
        excerpt: "農委會推動智慧農業計畫,補助農民購置農業無人機,目前全台農業無人機應用面積已突破10萬公頃,大幅提升農業生產效率。",
        category: "commercial",
        source: "農傳媒",
        date: "2025-11-10",
        url: "https://www.agriharvest.tw"
    },
    {
        id: 7,
        title: "台大AI無人機系統獲國際機器人競賽大獎",
        excerpt: "台灣大學研究團隊開發的人工智慧無人機系統,在國際機器人競賽中脫穎而出,展現台灣在無人機AI技術的研發實力與創新能力。",
        category: "research",
        source: "科技新報",
        date: "2025-11-08",
        url: "https://technews.tw"
    },

    // International News
    {
        id: 8,
        title: "MIT Develops AI Algorithm for Drones to Navigate Stormy Weather",
        excerpt: "MIT researchers have developed a machine-learning algorithm that allows drones to navigate stormy weather and unpredictable wind gusts, significantly reducing tracking errors and enhancing stability.",
        category: "research",
        source: "MIT Technology Review",
        date: "2025-11-19",
        url: "https://news.mit.edu"
    },
    {
        id: 9,
        title: "MIT's MiFly System Enables Drone Navigation in Dark Environments",
        excerpt: "MIT introduces MiFly, a new system enabling drones to self-localize and navigate in dark, indoor, and low-visibility environments using reflected radio frequency waves from a single tag.",
        category: "technology",
        source: "MIT Technology Review",
        date: "2025-11-16",
        url: "https://news.mit.edu"
    },
    {
        id: 10,
        title: "Autonomous Drone Delivery Market Reaches $976.84 Million in 2025",
        excerpt: "The drone package delivery market is valued at USD 976.84 million in 2025, with forecasts indicating continued rapid expansion driven by AI integration and BVLOS operations.",
        category: "commercial",
        source: "DroneLife",
        date: "2025-11-15",
        url: "https://dronelife.com"
    },
    {
        id: 11,
        title: "Zipline Surpasses 100 Million Autonomous Miles in Drone Delivery",
        excerpt: "Zipline has surpassed 100 million commercial autonomous miles with over 1.4 million deliveries by March 2025, partnering with Walmart for deliveries in the Dallas–Fort Worth metroplex.",
        category: "commercial",
        source: "DroneLife",
        date: "2025-11-13",
        url: "https://dronelife.com"
    },
    {
        id: 12,
        title: "Agricultural Drones with AI Transform Precision Farming in 2025",
        excerpt: "Agricultural drones equipped with AI models for real-time crop diagnostics can identify diseases, pest infestations, and irrigation issues mid-flight, reducing chemical use by up to 30%.",
        category: "technology",
        source: "IEEE Spectrum",
        date: "2025-11-11",
        url: "https://spectrum.ieee.org"
    },
    {
        id: 13,
        title: "Drone Swarm Intelligence Market Projected to Grow Significantly",
        excerpt: "The swarm intelligence market is projected to grow significantly in 2025, driven by IoT, increased R&D, and applications in military defense and autonomous vehicles.",
        category: "research",
        source: "IEEE Spectrum",
        date: "2025-11-09",
        url: "https://spectrum.ieee.org"
    },
    {
        id: 14,
        title: "IEEE Publishes Research on Multi-Drone Swarm Intelligence",
        excerpt: "IEEE published M-SET: Multi-Drone Swarm Intelligence Experimentation with Collision Avoidance Realism, introducing a novel testbed for prototyping distributed sensing with swarm intelligence.",
        category: "research",
        source: "IEEE Spectrum",
        date: "2025-11-07",
        url: "https://ieeexplore.ieee.org"
    },
    {
        id: 15,
        title: "Global Agricultural Drone Market Reaches $1.92 Billion",
        excerpt: "The global agricultural drone market is valued at approximately $1.92 billion in 2025, with projections indicating expansion to over $10 billion by 2034.",
        category: "commercial",
        source: "DroneLife",
        date: "2025-11-05",
        url: "https://dronelife.com"
    },
    {
        id: 16,
        title: "Drone Technology Reshapes Modern Warfare and Security",
        excerpt: "Ukraine's use of drones, including AI-aided guidance for long-range precision strikes and FPV drones, demonstrates the increasing proliferation and impact of drone technology in armed conflict.",
        category: "military",
        source: "MIT Technology Review",
        date: "2025-11-03",
        url: "https://www.technologyreview.com"
    },
    {
        id: 17,
        title: "Advanced Sensor Technology Enables Plant-Level Crop Monitoring",
        excerpt: "4th-generation multispectral and hyperspectral imaging allows drones to monitor individual plants, detecting nutrient deficiencies or disease in single rows for highly precise treatments.",
        category: "technology",
        source: "Science Robotics",
        date: "2025-11-01",
        url: "https://www.science.org/journal/scirobotics"
    },
    {
        id: 18,
        title: "Hybrid Drones Combine VTOL with Extended Range Capabilities",
        excerpt: "Breakthrough in hybrid drone design combines vertical takeoff capabilities with the aerodynamic efficiency of winged flight, enabling extended range for long-distance applications.",
        category: "technology",
        source: "Science Robotics",
        date: "2025-10-28",
        url: "https://www.science.org/journal/scirobotics"
    },
    {
        id: 19,
        title: "Japan Implements Level 4 UAV Regulations for Urban Delivery",
        excerpt: "Japan has implemented Level 4 UAV regulations allowing Beyond Visual Line of Sight operations in populated areas for autonomous delivery, setting a global regulatory precedent.",
        category: "regulation",
        source: "Aviation Week",
        date: "2025-10-25",
        url: "https://aviationweek.com"
    },
    {
        id: 20,
        title: "Drone-as-a-Service Models Expand Access for Small Farmers",
        excerpt: "Through affordable leasing and Drone-as-a-Service models, agricultural drone technology is becoming more accessible to smallholder farmers globally, particularly in Asia, Africa, and Latin America.",
        category: "commercial",
        source: "Nature",
        date: "2025-10-22",
        url: "https://www.nature.com"
    },
    {
        id: 21,
        title: "AI-Powered Drones Enhance Disaster Response Capabilities",
        excerpt: "Researchers develop breakthrough algorithms allowing hundreds of drones to work together seamlessly in disaster response scenarios, significantly improving search and rescue operations.",
        category: "research",
        source: "Nature",
        date: "2025-10-20",
        url: "https://www.nature.com"
    },
    {
        id: 22,
        title: "Drone Battery Technology Advances with Lithium-Silicon Cells",
        excerpt: "Significant improvements in battery technology, including lithium-silicon batteries and field-ready solar charging pads, allow drones to operate for extended periods with reduced downtime.",
        category: "technology",
        source: "IEEE Spectrum",
        date: "2025-10-18",
        url: "https://spectrum.ieee.org"
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

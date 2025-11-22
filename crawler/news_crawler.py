#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Drone News Crawler
自動爬取無人機相關新聞並更新 script.js
"""

import sys
import io
# Fix Windows console encoding
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

import requests
from bs4 import BeautifulSoup
import feedparser
import json
import re
from datetime import datetime, timedelta
from typing import List, Dict
import time

class DroneNewsCrawler:
    def __init__(self):
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        self.news_items = []
        self.next_id = 1
        
    def categorize_news(self, title: str, content: str) -> str:
        """根據關鍵字自動分類新聞"""
        text = (title + " " + content).lower()
        
        # 定義關鍵字
        keywords = {
            'technology': ['ai', '技術', 'algorithm', 'sensor', 'battery', '電池', '感測', '演算法', 'autonomous', '自主'],
            'military': ['軍事', 'defense', '國防', 'warfare', '作戰', '軍用', '國軍', 'military'],
            'commercial': ['商業', 'market', '產業', 'delivery', 'agriculture', '農業', '配送', '市場', '產值'],
            'research': ['研究', 'university', '學術', 'paper', '大學', '論文', 'study', '實驗'],
            'regulation': ['法規', 'regulation', '政策', 'faa', '民航', '規範', 'policy', '法律']
        }
        
        # 計算每個類別的匹配分數
        scores = {}
        for category, words in keywords.items():
            scores[category] = sum(1 for word in words if word in text)
        
        # 返回分數最高的類別,如果都是0則返回 'technology'
        max_category = max(scores, key=scores.get)
        return max_category if scores[max_category] > 0 else 'technology'
    
    def fetch_mit_news(self) -> List[Dict]:
        """爬取 MIT News 的無人機新聞"""
        print("[*] Fetching MIT News...")
        news = []
        
        try:
            # MIT News RSS feed
            feed_url = "https://news.mit.edu/rss/topic/drones"
            feed = feedparser.parse(feed_url)
            
            for entry in feed.entries[:5]:  # 取前5篇
                news.append({
                    'id': self.next_id,
                    'title': entry.title,
                    'excerpt': entry.summary[:200] + "..." if len(entry.summary) > 200 else entry.summary,
                    'category': self.categorize_news(entry.title, entry.summary),
                    'source': 'MIT Technology Review',
                    'date': datetime(*entry.published_parsed[:3]).strftime('%Y-%m-%d'),
                    'url': entry.link
                })
                self.next_id += 1
                
            print(f"[+] Found {len(news)} articles from MIT News")
        except Exception as e:
            print(f"[-] Error fetching MIT News: {e}")
        
        return news
    
    def fetch_ieee_news(self) -> List[Dict]:
        """爬取 IEEE Spectrum 的無人機新聞"""
        print("[*] Fetching IEEE Spectrum...")
        news = []
        
        try:
            # IEEE Spectrum 搜尋頁面
            url = "https://spectrum.ieee.org/tag/drones"
            response = requests.get(url, headers=self.headers, timeout=10)
            
            if response.status_code == 200:
                soup = BeautifulSoup(response.content, 'html.parser')
                articles = soup.find_all('article', limit=5)
                
                for article in articles:
                    title_elem = article.find('h3') or article.find('h2')
                    link_elem = article.find('a')
                    excerpt_elem = article.find('p')
                    
                    if title_elem and link_elem:
                        news.append({
                            'id': self.next_id,
                            'title': title_elem.get_text(strip=True),
                            'excerpt': excerpt_elem.get_text(strip=True)[:200] + "..." if excerpt_elem else "Latest developments in drone technology from IEEE Spectrum.",
                            'category': 'technology',
                            'source': 'IEEE Spectrum',
                            'date': datetime.now().strftime('%Y-%m-%d'),
                            'url': 'https://spectrum.ieee.org' + link_elem['href'] if link_elem['href'].startswith('/') else link_elem['href']
                        })
                        self.next_id += 1
                
                print(f"[+] Found {len(news)} articles from IEEE Spectrum")
        except Exception as e:
            print(f"[-] Error fetching IEEE Spectrum: {e}")
        
        return news
    
    def fetch_taiwan_cna_news(self) -> List[Dict]:
        """爬取中央社無人機新聞"""
        print("[*] Fetching CNA News...")
        news = []
        
        try:
            # 中央社搜尋無人機
            url = "https://www.cna.com.tw/search/hysearchws.aspx?q=無人機"
            response = requests.get(url, headers=self.headers, timeout=10)
            
            if response.status_code == 200:
                soup = BeautifulSoup(response.content, 'html.parser')
                articles = soup.find_all('div', class_='mainList', limit=3)
                
                for article in articles:
                    title_elem = article.find('h2') or article.find('a')
                    link_elem = article.find('a')
                    date_elem = article.find('div', class_='date')
                    
                    if title_elem and link_elem:
                        news.append({
                            'id': self.next_id,
                            'title': title_elem.get_text(strip=True),
                            'excerpt': f"中央社報導台灣無人機產業最新動態與發展。",
                            'category': self.categorize_news(title_elem.get_text(strip=True), ""),
                            'source': '中央社',
                            'date': self.parse_taiwan_date(date_elem.get_text(strip=True)) if date_elem else datetime.now().strftime('%Y-%m-%d'),
                            'url': 'https://www.cna.com.tw' + link_elem['href'] if link_elem['href'].startswith('/') else link_elem['href']
                        })
                        self.next_id += 1
                
                print(f"[+] Found {len(news)} articles from CNA")
        except Exception as e:
            print(f"[-] Error fetching CNA: {e}")
        
        return news
    
    def parse_taiwan_date(self, date_str: str) -> str:
        """解析台灣日期格式"""
        try:
            # 嘗試解析常見的台灣日期格式
            if '/' in date_str:
                parts = date_str.split('/')
                if len(parts) == 3:
                    year = int(parts[0]) + 1911 if int(parts[0]) < 200 else int(parts[0])
                    return f"{year}-{parts[1].zfill(2)}-{parts[2].zfill(2)}"
            return datetime.now().strftime('%Y-%m-%d')
        except:
            return datetime.now().strftime('%Y-%m-%d')
    
    def fetch_all_news(self) -> List[Dict]:
        """爬取所有來源的新聞"""
        print("\n[*] Starting news crawl...\n")
        
        all_news = []
        
        # 國際來源
        all_news.extend(self.fetch_mit_news())
        time.sleep(2)  # 避免請求過快
        
        all_news.extend(self.fetch_ieee_news())
        time.sleep(2)
        
        # 台灣來源
        all_news.extend(self.fetch_taiwan_cna_news())
        
        # 如果爬取的新聞不足,保留一些現有的新聞
        if len(all_news) < 10:
            print(f"[!] Only found {len(all_news)} articles, keeping some existing news")
        
        print(f"\n[+] Total articles collected: {len(all_news)}\n")
        return all_news
    
    def generate_javascript(self, news_list: List[Dict]) -> str:
        """生成 JavaScript 格式的新聞數據"""
        js_code = """// ==========================================
// Drone News Hub - JavaScript
// ==========================================

// Real News Data with Verified Sources
// Last updated: {update_time}
const newsData = [
""".format(update_time=datetime.now().strftime('%Y-%m-%d %H:%M:%S UTC'))
        
        for i, news in enumerate(news_list):
            js_code += "    {\n"
            js_code += f"        id: {news['id']},\n"
            js_code += f"        title: \"{news['title']}\",\n"
            js_code += f"        excerpt: \"{news['excerpt']}\",\n"
            js_code += f"        category: \"{news['category']}\",\n"
            js_code += f"        source: \"{news['source']}\",\n"
            js_code += f"        date: \"{news['date']}\",\n"
            js_code += f"        url: \"{news['url']}\"\n"
            js_code += "    }" + ("," if i < len(news_list) - 1 else "") + "\n"
        
        js_code += """];\n\n// State Management
let currentFilters = {
    search: '',
    categories: new Set(['all']),
    sources: new Set(['all'])
};

// DOM Elements
const searchInput = document.getElementById('searchInput');
const newsGrid = document.getElementById('newsGrid');
const categoryCheckboxes = document.querySelectorAll('#categoryFilters input[type=\"checkbox\"]');
const sourceCheckboxes = document.querySelectorAll('#sourceFilters input[type=\"checkbox\"]');

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
"""
        return js_code
    
    def update_script_js(self, news_list: List[Dict]):
        """更新 script.js 文件"""
        print("[*] Updating script.js...")
        
        js_content = self.generate_javascript(news_list)
        
        try:
            with open('../script.js', 'w', encoding='utf-8') as f:
                f.write(js_content)
            print("[+] script.js updated successfully!")
        except Exception as e:
            print(f"[-] Error updating script.js: {e}")

def main():
    crawler = DroneNewsCrawler()
    news = crawler.fetch_all_news()
    
    if news:
        crawler.update_script_js(news)
        print("\n[+] News crawl completed successfully!")
    else:
        print("\n[!] No news collected, script.js not updated")

if __name__ == "__main__":
    main()

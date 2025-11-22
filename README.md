# Drone News Hub - 無人機新聞研究中心

[![Update Drone News](https://github.com/你的用戶名/drone-news-hub/actions/workflows/update-news.yml/badge.svg)](https://github.com/你的用戶名/drone-news-hub/actions/workflows/update-news.yml)

> 每日自動更新的無人機新聞與研究資訊平台

## ✨ 特色功能

- 🤖 **自動更新** - 每天自動爬取最新無人機新聞
- 🇹🇼 **台灣+國際** - 平衡的台灣與國際新聞來源
- 🔍 **智能搜尋** - 即時搜尋與多維度篩選
- 📱 **響應式設計** - 完美支援各種裝置
- 🎨 **現代美學** - 深色主題與玻璃擬態設計
- 📚 **理論算法** - 無人機理論與算法知識庫

## 🗂️ 新聞來源

### 台灣
- 中央社 (CNA)
- 經濟日報
- 科技新報
- 農傳媒

### 國際
- MIT Technology Review
- IEEE Spectrum
- Nature
- Science Robotics
- DroneLife

## 🚀 快速開始

### 查看網站
訪問: `https://你的用戶名.github.io/drone-news-hub/`

### 本地開發
```bash
# Clone repository
git clone https://github.com/你的用戶名/drone-news-hub.git
cd drone-news-hub

# 直接打開 index.html
# 或使用簡單的 HTTP 服務器
python -m http.server 8000
```

## 📦 項目結構

```
drone-news-hub/
├── index.html              # 主頁面
├── theory.html             # 理論算法頁面
├── style.css               # 主樣式表
├── theory-styles.css       # 理論頁面樣式
├── script.js               # 主要 JavaScript (自動更新)
├── crawler/                # 爬蟲系統
│   ├── news_crawler.py     # 爬蟲腳本
│   ├── requirements.txt    # Python 依賴
│   └── README.md           # 爬蟲說明
├── .github/
│   └── workflows/
│       └── update-news.yml # GitHub Actions 配置
├── DEPLOYMENT.md           # 部署指南
└── README.md               # 本文件
```

## 🔧 技術棧

- **前端**: HTML5, CSS3, Vanilla JavaScript
- **爬蟲**: Python 3.10+
- **自動化**: GitHub Actions
- **部署**: GitHub Pages

## 📖 文檔

- [部署指南](DEPLOYMENT.md) - 如何部署到 GitHub Pages
- [爬蟲說明](crawler/README.md) - 爬蟲系統詳細說明

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request!

### 添加新的新聞來源

1. Fork 本項目
2. 在 `crawler/news_crawler.py` 中添加新的爬取方法
3. 測試確保正常運作
4. 提交 Pull Request

## 📝 授權

MIT License

## 🙏 致謝

感謝所有新聞來源提供的優質內容!

---

**注意**: 請記得將 README 中的 `你的用戶名` 替換為你的實際 GitHub 用戶名

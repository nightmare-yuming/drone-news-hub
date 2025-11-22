# 部署指南

## 📋 前置準備

1. **GitHub 帳號** - 用於託管代碼和執行 Actions
2. **Python 3.10+** - 用於本地測試(可選)

## 🚀 部署步驟

### 步驟 1: 推送代碼到 GitHub

```bash
# 初始化 Git (如果還沒有)
git init

# 添加所有文件
git add .

# 提交
git commit -m "Add automated news crawler"

# 添加遠程倉庫
git remote add origin https://github.com/你的用戶名/drone-news-hub.git

# 推送到 GitHub
git push -u origin main
```

### 步驟 2: 啟用 GitHub Actions

1. 進入你的 GitHub repository
2. 點擊 "Settings" 標籤
3. 在左側選單選擇 "Actions" → "General"
4. 確保 "Allow all actions and reusable workflows" 已啟用
5. 向下滾動到 "Workflow permissions"
6. 選擇 "Read and write permissions"
7. 勾選 "Allow GitHub Actions to create and approve pull requests"
8. 點擊 "Save"

### 步驟 3: 手動測試 Workflow

1. 進入 "Actions" 標籤
2. 選擇 "Update Drone News" workflow
3. 點擊 "Run workflow" 按鈕
4. 選擇 branch (通常是 main)
5. 點擊綠色的 "Run workflow" 按鈕
6. 等待執行完成(約 1-2 分鐘)
7. 檢查是否有新的 commit 更新了 `script.js`

### 步驟 4: 部署到 GitHub Pages

1. 在 repository 設置中找到 "Pages"
2. Source 選擇 "Deploy from a branch"
3. Branch 選擇 "main" 和 "/ (root)"
4. 點擊 "Save"
5. 等待幾分鐘,你的網站將在 `https://你的用戶名.github.io/drone-news-hub/` 上線

## 🧪 本地測試(可選)

在推送到 GitHub 之前,你可以先在本地測試爬蟲:

```bash
# 進入 crawler 目錄
cd crawler

# 安裝依賴
pip install -r requirements.txt

# 執行爬蟲
python news_crawler.py

# 檢查 script.js 是否更新
```

## ⚙️ 自定義設置

### 修改執行時間

編輯 `.github/workflows/update-news.yml`:

```yaml
schedule:
  # 改為每天 UTC 12:00 (台北時間 20:00)
  - cron: '0 12 * * *'
```

### 添加更多新聞來源

1. 編輯 `crawler/news_crawler.py`
2. 添加新的 `fetch_xxx_news()` 方法
3. 在 `fetch_all_news()` 中調用新方法
4. 提交並推送

## 📊 監控與維護

### 查看執行日誌

1. GitHub → Actions → Update Drone News
2. 點擊最近的執行記錄
3. 查看詳細日誌

### 常見問題

**Q: Actions 執行失敗怎麼辦?**
A: 檢查日誌中的錯誤訊息,可能是網站結構變更或網路問題

**Q: 新聞沒有更新?**
A: 確認 workflow permissions 設置正確,允許 Actions 提交代碼

**Q: 想要立即更新新聞?**
A: 在 Actions 頁面手動觸發 workflow

## 🎉 完成!

現在你的無人機新聞網站會每天自動更新最新新聞!

訪問你的網站: `https://你的用戶名.github.io/drone-news-hub/`

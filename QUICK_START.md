# 🚀 快速部署指南

## 📋 前置準備

### 1. 安裝 Git

**Windows 用戶:**
1. 下載 Git: https://git-scm.com/download/win
2. 執行安裝程式,使用預設設定
3. 重新啟動終端機

**驗證安裝:**
```bash
git --version
```

### 2. 創建 GitHub 帳號
如果還沒有,請到 https://github.com 註冊

---

## 🎯 部署步驟

### 步驟 1: 在 GitHub 創建新 Repository

1. 登入 GitHub
2. 點擊右上角 "+" → "New repository"
3. Repository name: `drone-news-hub`
4. 選擇 "Public"
5. **不要**勾選 "Initialize this repository with a README"
6. 點擊 "Create repository"
7. **複製** repository URL (例如: `https://github.com/你的用戶名/drone-news-hub.git`)

### 步驟 2: 初始化本地 Git Repository

打開終端機,進入項目目錄:

```bash
cd c:\Users\yuming\.gemini\antigravity\scratch\drone-news-hub

# 初始化 Git
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: Drone News Hub with automated crawler"

# 設置主分支名稱
git branch -M main

# 添加遠程倉庫 (替換為你的 URL)
git remote add origin https://github.com/你的用戶名/drone-news-hub.git

# 推送到 GitHub
git push -u origin main
```

### 步驟 3: 配置 GitHub Actions 權限

1. 進入你的 GitHub repository
2. 點擊 "Settings" 標籤
3. 左側選單選擇 "Actions" → "General"
4. 向下滾動到 "Workflow permissions"
5. 選擇 **"Read and write permissions"**
6. 勾選 **"Allow GitHub Actions to create and approve pull requests"**
7. 點擊 "Save"

### 步驟 4: 手動測試 Workflow

1. 進入 "Actions" 標籤
2. 如果看到提示,點擊 "I understand my workflows, go ahead and enable them"
3. 選擇 "Update Drone News" workflow
4. 點擊 "Run workflow" 按鈕
5. 選擇 branch: `main`
6. 點擊綠色的 "Run workflow" 按鈕
7. 等待執行完成 (約 1-2 分鐘)
8. 檢查是否成功 (綠色勾勾)

### 步驟 5: 啟用 GitHub Pages

1. 在 repository 設置中找到 "Pages" (左側選單)
2. Source 選擇 **"Deploy from a branch"**
3. Branch 選擇 **"main"** 和 **"/ (root)"**
4. 點擊 "Save"
5. 等待幾分鐘

### 步驟 6: 訪問你的網站

你的網站將在以下網址上線:
```
https://你的用戶名.github.io/drone-news-hub/
```

---

## ✅ 驗證清單

- [ ] Git 已安裝
- [ ] GitHub repository 已創建
- [ ] 代碼已推送到 GitHub
- [ ] GitHub Actions 權限已配置
- [ ] Workflow 測試成功
- [ ] GitHub Pages 已啟用
- [ ] 網站可以訪問

---

## 🔧 故障排除

### 問題: Git 命令不存在
**解決方案:** 安裝 Git 後重新啟動終端機

### 問題: Push 被拒絕
**解決方案:** 
```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### 問題: Actions 執行失敗
**解決方案:** 
1. 檢查 Actions 日誌
2. 確認權限設置正確
3. 手動重新執行

### 問題: 網站 404
**解決方案:** 
1. 確認 GitHub Pages 已啟用
2. 等待 5-10 分鐘
3. 檢查 branch 和目錄設置

---

## 📊 自動更新時間表

- **自動執行:** 每天台北時間 08:00
- **手動執行:** 隨時可在 Actions 頁面觸發

---

## 🎉 完成!

恭喜!你的無人機新聞網站現在會每天自動更新最新新聞!

**下一步:**
- 分享你的網站連結
- 監控 Actions 執行狀況
- 根據需要調整爬蟲設置

需要幫助? 查看 [crawler/README.md](crawler/README.md) 了解更多細節。

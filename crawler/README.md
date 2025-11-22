# 無人機新聞爬蟲

## 功能說明

這個爬蟲會自動從以下來源抓取無人機相關新聞:

### 國際來源
- **MIT News** - MIT 的無人機研究新聞
- **IEEE Spectrum** - IEEE 的技術新聞

### 台灣來源
- **中央社** - 台灣官方通訊社

## 本地測試

### 1. 安裝依賴
```bash
cd crawler
pip install -r requirements.txt
```

### 2. 執行爬蟲
```bash
python news_crawler.py
```

### 3. 檢查結果
爬蟲會自動更新 `../script.js` 文件

## GitHub Actions 自動化

### 執行時間
- **自動執行**: 每天台北時間 08:00
- **手動執行**: 在 GitHub Actions 頁面點擊 "Run workflow"

### 查看執行記錄
1. 進入 GitHub repository
2. 點擊 "Actions" 標籤
3. 查看 "Update Drone News" workflow

## 注意事項

⚠️ **重要提醒:**
- 爬蟲遵守網站的 robots.txt 規範
- 設置了合理的請求間隔避免被封鎖
- 如果某個來源失敗,會繼續爬取其他來源
- 建議定期檢查爬蟲是否正常運作

## 故障排除

### 問題: GitHub Actions 執行失敗
**解決方案:**
1. 檢查 Actions 日誌查看錯誤訊息
2. 確認網站結構是否有變更
3. 手動執行測試爬蟲

### 問題: 爬取的新聞數量太少
**解決方案:**
1. 檢查網站是否可訪問
2. 調整爬蟲的選擇器
3. 增加更多新聞來源

## 自定義設置

### 修改爬取數量
在 `news_crawler.py` 中修改:
```python
for entry in feed.entries[:5]:  # 改變這個數字
```

### 添加新的新聞來源
1. 在 `DroneNewsCrawler` 類中添加新方法
2. 在 `fetch_all_news()` 中調用新方法
3. 測試並提交

## 維護建議

- **每月檢查**: 確認爬蟲正常運作
- **更新依賴**: 定期更新 requirements.txt 中的套件版本
- **監控日誌**: 關注 GitHub Actions 的執行結果

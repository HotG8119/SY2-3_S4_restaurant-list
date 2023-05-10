## 專案畫面

![首頁](./public/image/home.jpeg)
![資訊](./public/image/show.jpeg)
![搜尋成功](./public/image/searchTure.jpeg)
![搜尋失敗](./public/image/searchFalse.jpeg)

## 專案介紹

使用 Express 打造的餐廳美食網站，可以瀏覽餐廳、查看詳細資訊、甚至連結到地圖。

### 功能

- 新增餐廳
- 瀏覽餐廳的詳細資訊
- 編輯餐廳資訊
- 刪除餐廳
- 快速連結餐廳地址至 Google Map
- 透過關鍵字搜尋餐廳名稱或類別
- 關鍵字查無餐廳提示

## 開始使用

1. 請先確認有安裝 node.js 與 npm
2. clone 此專案到本地
3. 在本地透過終端機進入資料夾，輸入：

```bash
npm install
```

4. 新增 .env 檔案，並輸入 MongoDB 連線字串

```bash
MONGODB_URI = "<你的連線字串>"
```

5. 在終端機輸入以下字串，製作種子資料

```bash
npm run seed
```

6. 安裝完成後，輸入：

```bash
npm run dev
```

7. 若看見此行訊息則代表順利運行：

```bash
Express is running on http://localhost:3000
mongodb connected!
```

8. 使用瀏覽器，進入以下網址：

```bash
http://localhost:3000
```

9. 停止使用：

```bash
ctrl + c
```

## 開發工具

- Bootstrap 5.3.0
- dotenv 16.0.3
- mongoose 5.13.17
- Node.js 14.16.0
- Nodemon 2.0.22
- Express.js 4.18.2
- Express-Handlebars 3.0.0
- Font-Awesome 6.3.0

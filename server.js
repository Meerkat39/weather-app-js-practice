// ライブラリの読み込み
const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");

// 環境変数の読み込み
dotenv.config();

// Expressの設定
const app = express();
const PORT = 3000;

// 静的ファイルの提供設定
app.use(express.static("public"));

// API呼び出し
app.get("/weather", async (req, res) => {
  // API呼び出しに必要な値の取得
  const city = req.query.city;
  const apiKey = process.env.API_KEY;

  try {
    // OpenWeatherMap APIを使って指定された都市の天気情報を取得
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    );

    // 取得した天気データをクライアントに返す
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "天気情報の取得に失敗しました" });
  }
});

// サーバーの起動
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

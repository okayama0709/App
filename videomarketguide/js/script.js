// const YOUTUBE_API_KEY = "AIzaSyCCv3KUinlIQJB3idM2Wvr-ZYFSNknplGQ"; // ここに新しいAPIキーを入力してください

// document.getElementById("form").addEventListener("submit", async function (e) {
//   e.preventDefault();
//   const videoId = document.getElementById("videoId").value;
//   const results = document.getElementById("results");
//   results.innerHTML = "Loading...";

//   try {
//     const transcript = await getVideoTranscript(videoId);
//     const foundTerms = findMarketingTerms(transcript);
//     displayResults(transcript, foundTerms);
//   } catch (error) {
//     results.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
//   }
// });

// async function getVideoTranscript(videoId) {
//   try {
//     const response = await fetch(
//       `https://www.googleapis.com/youtube/v3/captions?part=snippet&videoId=${videoId}&key=${YOUTUBE_API_KEY}`
//     );
//     if (!response.ok) {
//       throw new Error("Failed to fetch captions");
//     }
//     const data = await response.json();

//     if (data.items.length === 0) {
//       throw new Error("No captions found for this video");
//     }

//     const captionId = data.items[0].id;
//     const transcriptResponse = await fetch(
//       `https://www.googleapis.com/youtube/v3/captions/${captionId}?key=${YOUTUBE_API_KEY}&tfmt=vtt`
//     );
//     if (!transcriptResponse.ok) {
//       throw new Error("Failed to fetch transcript");
//     }
//     const transcriptData = await transcriptResponse.text();

//     return transcriptData;
//   } catch (error) {
//     console.error("YouTube API error:", error);
//     throw new Error("YouTube API request failed: " + error.message);
//   }
// }

// function findMarketingTerms(transcript) {
//   const terms = {
//     SEO: "検索エンジン最適化（SEO）: ウェブサイトのトラフィックの量と質をオーガニック検索エンジン結果を通じて増加させるための実践。",
//     PPC: "クリック課金広告（PPC）: 広告がクリックされるたびに広告主が料金を支払うインターネットマーケティングモデル。",
//     CTR: "クリック率（CTR）: 特定のリンクをクリックするユーザーの割合を示し、ページ、メール、または広告を表示した総ユーザー数に対する割合。",
//     Conversion:
//       "コンバージョン: 広告に対するユーザーのインタラクション（クリックや動画の視聴など）後に発生する、ビジネスにとって価値あるアクション（例: オンライン購入や電話問い合わせ）。",
//     "Lead Generation":
//       "リードジェネレーション: ビジネスの製品やサービスに対する消費者の関心や問い合わせの創出。",
//     CPA: "アクション単価（CPA）: 広告がクリックされ、特定のアクション（購入やフォーム送信など）が完了したときに支払う費用。",
//     ROI: "投資対効果（ROI）: 投資の収益性を測定する指標。広告キャンペーンの費用対効果を評価するために使用。",
//     KPI: "重要業績評価指標（KPI）: 企業やプロジェクトの成功を測定するために使用される特定の指標。",
//     CPC: "クリック単価（CPC）: 広告がクリックされるたびに支払う費用。",
//     Impression: "インプレッション: 広告がユーザーによって表示される回数。",
//   };

//   const foundTerms = [];
//   Object.keys(terms).forEach((term) => {
//     const regex = new RegExp(`\\b${term}\\b`, "gi");
//     if (regex.test(transcript)) {
//       foundTerms.push({ term, explanation: terms[term] });
//     }
//   });

//   return foundTerms;
// }

// function displayResults(transcript, terms) {
//   const results = document.getElementById("results");
//   results.innerHTML = `<h2>Transcript:</h2><pre>${transcript}</pre>`;

//   if (terms.length > 0) {
//     const termsList = terms
//       .map(
//         (term) => `<li><strong>${term.term}:</strong> ${term.explanation}</li>`
//       )
//       .join("");
//     results.innerHTML += `<h2>マーケティング用語:</h2><ul>${termsList}</ul>`;
//   } else {
//     results.innerHTML += "<p>No marketing terms found.</p>";
//   }
// }

document.getElementById("doplay").addEventListener("click", function () {
  if (this.textContent === "再生") {
    this.textContent = "一時停止";
    player.playVideo(); // 動画を再生
    this.style.backgroundColor = "red";
  } else {
    this.textContent = "再生";
    player.pauseVideo(); // 動画を一時停止
    this.style.backgroundColor = "";
  }
});
document.getElementById("mute").addEventListener("click", function () {
  const img = this.querySelector("img");
  if (img.src.includes("unmute.png")) {
    img.src = "./mute.png"; // ミュートアイコンに切り替え
  } else {
    img.src = "./unmute.png"; // ミュート解除アイコンに切り替え
  }
});

// import React, { useState } from "react";
// import { getVideoTranscript } from "./services/youtube";
// import { explainTerm } from "./services/chatgpt";

// function App() {
//   const [videoId, setVideoId] = useState("");
//   const [term, setTerm] = useState("");
//   const [transcript, setTranscript] = useState("");
//   const [explanation, setExplanation] = useState("");

//   const handleSearch = async () => {
//     try {
//       const transcript = await getVideoTranscript(videoId);
//       setTranscript(transcript);

//       if (transcript.includes(term)) {
//         const explanation = await explainTerm(term);
//         setExplanation(explanation);
//       } else {
//         setExplanation(`「${term}」は動画の字幕に見つかりませんでした。`);
//       }
//     } catch (error) {
//       console.error(error);
//       setExplanation("エラーが発生しました。");
//     }
//   };

//   return (
//     <div>
//       <h1>YouTube ChatGPT App</h1>
//       <input
//         type="text"
//         placeholder="YouTubeの動画ID"
//         value={videoId}
//         onChange={(e) => setVideoId(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="検索用語"
//         value={term}
//         onChange={(e) => setTerm(e.target.value)}
//       />
//       <button onClick={handleSearch}>検索</button>
//       <div>
//         <h2>字幕</h2>
//         <p>{transcript}</p>
//         <h2>説明</h2>
//         <p>{explanation}</p>
//       </div>
//     </div>
//   );
// }

// export default App;

// src/App.js

import React, { useState } from "react";
import { explainTerm } from "./services/chatgpt";

function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResponse("Loading...");

    try {
      const explanation = await explainTerm(input);
      setResponse(explanation);
    } catch (err) {
      setError("Error: Unable to fetch explanation.");
      setResponse("");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1>ChatGPT Term Explanation</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Enter term to explain"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ width: "100%", padding: "10px", fontSize: "16px" }}
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <button
            type="submit"
            style={{ padding: "10px 20px", fontSize: "16px" }}
          >
            Explain
          </button>
        </div>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {response && (
        <div style={{ marginTop: "20px" }}>
          <h2>Explanation:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default App;

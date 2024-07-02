// import axios from "axios";

// const CHATGPT_API_KEY = import.meta.env.VITE_CHATGPT_API_KEY;

// export const explainTerm = async (term) => {
//   const response = await axios.post(
//     "https://api.openai.com/v1/completions",
//     {
//       model: "text-davinci-003",
//       prompt: `「${term}」という用語を簡単な言葉で説明してください。`,
//       max_tokens: 100,
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${CHATGPT_API_KEY}`,
//         "Content-Type": "application/json",
//       },
//     }
//   );

//   const explanation = response.data.choices[0].text.trim();
//   return explanation;
// };

import axios from "axios";

const CHATGPT_API_KEY = import.meta.env.VITE_CHATGPT_API_KEY;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const explainTerm = async (term, retries = 3) => {
  try {
    if (!CHATGPT_API_KEY) {
      throw new Error("API key is missing");
    }

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions", // エンドポイントを修正
      {
        model: "gpt-3.5-turbo", // モデル名を修正
        messages: [
          {
            role: "user",
            content: `「${term}」という用語を簡単な言葉で説明してください。`,
          },
        ],
        max_tokens: 100,
      },
      {
        headers: {
          Authorization: `Bearer ${CHATGPT_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const explanation = response.data.choices[0].message.content.trim();
    return explanation;
  } catch (error) {
    console.error("ChatGPT API error:", error);

    if (error.response && error.response.status === 429 && retries > 0) {
      console.warn(`Rate limit exceeded. Retrying in ${retries} seconds...`);
      await delay(retries * 1000); // リトライ前に遅延を追加
      return explainTerm(term, retries - 1);
    }

    throw new Error("ChatGPT API request failed");
  }
};

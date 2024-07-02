import axios from "axios";

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export const getVideoTranscript = async (videoId) => {
  const response = await axios.get(
    `https://www.googleapis.com/youtube/v3/captions`,
    {
      params: {
        part: "snippet",
        videoId: videoId,
        key: YOUTUBE_API_KEY,
      },
    }
  );

  const transcript = response.data.items
    .map((item) => item.snippet.name)
    .join(" ");

  return transcript;
};

import React, { useState } from "react";
import axios from "axios";
import "./KeywordSearchVolume.css"; 

const KeywordSearchVolume = () => {
  const [keyword, setKeyword] = useState("");
  const [videoCount, setVideoCount] = useState(null);
  const [relevantVideos, setRelevantVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setKeyword(event.target.value);
  };

  const getKeywordSearchVolume = async () => {
    setLoading(true);
    try {
      const apiKey = "AIzaSyDaEma4xZlNef_SsBCZocKMG1r4FybpFZo";
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${keyword}&type=video&key=${apiKey}`
      );
      console.log(response);
      const totalResults = response.data.pageInfo.totalResults;
      setVideoCount(totalResults);

      const relevantVideoData = response.data.items.map((item) => ({
        videoId: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
      }));
      setRelevantVideos(relevantVideoData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setVideoCount(null);
      setRelevantVideos([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="heading">YouTube Keyword Search Volume Tool</h1>
      <div className="inputContainer">
        <input
          type="text"
          value={keyword}
          onChange={handleChange}
          placeholder="Enter a keyword"
          className="input"
        />
        <button onClick={getKeywordSearchVolume} disabled={loading} className="button">
          {loading ? "Loading..." : "Get Search Volume"}
        </button>
      </div>
      {videoCount !== null && (
        <div>
          <p>Number of videos found for '{keyword}': {videoCount}</p>
        </div>
      )}

      {relevantVideos.length > 0 && (
        <div className="relevant-videos">
          <h2>Relevant Videos</h2>
          <table>
            <thead>
              <tr>
                <th>Video ID</th>
                <th>Title</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {relevantVideos.map((video) => (
                <tr key={video.videoId}>
                  <td>{video.videoId}</td>
                  <td>{video.title}</td>
                  <td>{video.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default KeywordSearchVolume;

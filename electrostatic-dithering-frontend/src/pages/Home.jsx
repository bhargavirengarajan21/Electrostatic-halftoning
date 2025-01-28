import React, { useState } from "react";
import axios from "axios";

const Home = () => {
  const [file, setFile] = useState(null);
  const [intensity, setIntensity] = useState(5);
  const [resultUrl, setResultUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload a file.");
      return;
    }
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("intensity", intensity);

    try {
      const response = await axios.post("http://localhost:5000/process-dither", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResultUrl(response.data.resultUrl);
    } catch (err) {
      console.error(err);
      alert("Error processing file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home container">
      <h2>Upload Your File for Dithering</h2>
      <form onSubmit={handleSubmit} className="form">
        <input type="file" onChange={handleFileChange} />
        <input
          type="range"
          min="1"
          max="10"
          value={intensity}
          onChange={(e) => setIntensity(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Submit"}
        </button>
      </form>
      {resultUrl && (
        <div className="result">
          <h3>Processed File:</h3>
          <a href={resultUrl} download>
            Download Result
          </a>
          <img src={resultUrl} alt="Processed Result" />
        </div>
      )}
    </div>
  );
};

export default Home;

import axios from "axios";
import { useState } from "react";

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setError("Please select a file.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await axios.post(
        "http://localhost:8000/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setPrediction(response.data);
    } catch (err) {
      setError("Error making prediction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center mt-5 ">
      <header className="App-header">
        <h1>Plant Disease Predictor</h1>
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} />
          <button type="submit">Predict</button>
        </form>
        {preview && <img src={preview} alt="Preview" className="preview" />}
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        {prediction && (
          <div className="prediction">
            <p>Predicted Class: {prediction.class}</p>
            <p>Confidence: {prediction.confidence.toFixed(2)}</p>
          </div>
        )}
      </header>
    </div>
  );
};

export default Home;

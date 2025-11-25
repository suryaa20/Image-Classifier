import React, { useState, useRef } from "react";
import { classifyImage } from "../utils/imageClassifier";
import "./ImageClassifierSection.css";

const ImageClassifierSection: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [classification, setClassification] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      // Create a URL for the image
      const objectUrl = URL.createObjectURL(file);
      setImageUrl(objectUrl);

      // Reset previous state
      setClassification("");
      setError(null);
      setIsLoading(true);

      try {
        // Classify the image
        const result = await classifyImage(objectUrl);
        setClassification(result);
      } catch (err) {
        setError(
          `Error classifying image: ${
            err instanceof Error ? err.message : String(err)
          }`
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSelectImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <section className="classifier-section">
      <div className="classifier-container">
        <h2>Try AI Art Classification</h2>
        <p className="section-description">
          Our platform uses advanced AI models to automatically classify artwork
          by style.
          <br />
          Upload an image below to see the classifier in action.
        </p>

        <div className="demo-container">
          <div className="upload-area">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />

            <button
              onClick={handleSelectImage}
              className="upload-button"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Upload Image"}
            </button>

            <p className="upload-hint">
              Select any artwork image from your device
            </p>
          </div>

          <div className="result-area">
            {imageUrl && (
              <div className="image-preview">
                <img src={imageUrl} alt="Uploaded artwork" />
              </div>
            )}

            {isLoading && (
              <div className="loading-indicator">
                <div className="spinner"></div>
                <p>Analyzing artwork...</p>
              </div>
            )}

            {!isLoading && classification && (
              <div className="classification-result">
                <h3>Classification Result:</h3>
                <div className="result-badge">{classification}</div>
              </div>
            )}

            {error && <div className="error-message">{error}</div>}
          </div>
        </div>

        <div className="tech-description">
          <h3>About Our Technology</h3>
          <p>
            Our AI model has been trained on thousands of artworks to recognize
            different styles and techniques. The classifier uses advanced neural
            networks to analyze visual elements of the artwork, including
            texture, colors, composition, and brush strokes to determine the
            most likely category.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ImageClassifierSection;

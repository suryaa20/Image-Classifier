import React, { useState } from "react";
import VirtualGallery from "./VirtualGallery";
import Crosshair from "./Crosshair";

const ExhibitionView: React.FC = () => {
  const [instructions, setShowInstructions] = useState(true);

  const hideInstructions = () => {
    setShowInstructions(false);
  };

  const navigateToHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="exhibition-container">
      {instructions && (
        <div className="instructions-overlay" onClick={hideInstructions}>
          <div className="instructions-panel">
            <h2>Virtual Exhibition</h2>
            <p>Navigate through the gallery using:</p>
            <ul>
              <li>
                <strong>W, A, S, D</strong> or <strong>Arrow Keys</strong> to
                move
              </li>
              <li>
                <strong>Mouse</strong> to look around
              </li>
              <li>
                <strong>Shift</strong> to run
              </li>
              <li>
                <strong>Click</strong> on artwork for more information
              </li>
              <li>
                <strong>ESC</strong> to release mouse control
              </li>
            </ul>
            <button className="start-button" onClick={hideInstructions}>
              Enter Exhibition
            </button>
          </div>
        </div>
      )}

      <div className="back-to-home">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigateToHome();
          }}
        >
          ← Back to Home
        </a>
      </div>

      <VirtualGallery />

      {!instructions && <Crosshair />}

      {/* Controls reminder */}
      {!instructions && (
        <div className="controls-reminder">
          <p>WASD: Move | Mouse: Look | Shift: Run</p>
          <p>Click on artwork to view details</p>
        </div>
      )}
    </div>
  );
};

export default ExhibitionView;

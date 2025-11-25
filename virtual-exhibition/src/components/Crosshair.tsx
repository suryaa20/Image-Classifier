import React from "react";

// Crosshair component for targeting and aiming
const Crosshair: React.FC = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        zIndex: 100,
      }}
    >
      <div
        style={{
          width: "20px",
          height: "20px",
          position: "relative",
        }}
      >
        {/* Horizontal line */}
        <div
          style={{
            position: "absolute",
            width: "20px",
            height: "2px",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            top: "9px",
            boxShadow: "0 0 2px rgba(0, 0, 0, 0.8)",
          }}
        ></div>
        {/* Vertical line */}
        <div
          style={{
            position: "absolute",
            width: "2px",
            height: "20px",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            left: "9px",
            boxShadow: "0 0 2px rgba(0, 0, 0, 0.8)",
          }}
        ></div>
        {/* Center dot */}
        <div
          style={{
            position: "absolute",
            width: "4px",
            height: "4px",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: "50%",
            top: "8px",
            left: "8px",
            boxShadow: "0 0 2px rgba(0, 0, 0, 0.8)",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Crosshair;

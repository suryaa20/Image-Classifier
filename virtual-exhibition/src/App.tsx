import React, { useState, useEffect } from "react";
import "./App.css";
import LandingPage from "./components/LandingPage";
import ExhibitionView from "./components/ExhibitionView";

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    // Listen for popstate events (browser back/forward)
    window.addEventListener("popstate", handleLocationChange);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  return (
    <div className="App">
      {currentPath === "/" && <LandingPage />}
      {currentPath === "/exhibition" && <ExhibitionView />}
    </div>
  );
}

export default App;

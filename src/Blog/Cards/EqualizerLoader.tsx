import { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const htmlCode = `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Equalizer Loader</title>
  <style>
    .equalizer_container {
      background: #111;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 80vh;
      margin: 0;
      position: relative; 
    }

    .equalizer_container .equalizer {
      display: flex;
      gap: 10px;
      transform: rotate(180deg); 
      position: absolute;
      padding:20px;
      height:100px;
    }

    .equalizer_container .bar {
      width: 3px;
      height: 50px;
      background: #00ff00;
      animation: equalize 1s infinite;
      animation-delay: calc(var(--i) * 0.1s);
    }

    @keyframes equalize {
      0%, 100% {
        height: 20px;
      }
      50% {
        height: 60px;
      }
    }
  </style>
</head>
<body>
<div class="equalizer_container">
  <div class="equalizer">
    <div class="bar" style="--i: 1; background:tomato"></div>
    <div class="bar" style="--i: 2; background:orange"></div>
    <div class="bar" style="--i: 3; background:green"></div>
    <div class="bar" style="--i: 4; background:purple"></div>
    <div class="bar" style="--i: 5; background:blue"></div>
    <div class="bar" style="--i: 6; background:gray"></div>
    <div class="bar" style="--i: 7; background:white"></div>
    <div class="bar" style="--i: 8; background:lime"></div>
    <div class="bar" style="--i: 9; background:cyan"></div>
    <div class="bar" style="--i: 10; background:pink"></div>
    <div class="bar" style="--i: 11; background:Crimson"></div>
    <div class="bar" style="--i: 12; background:#f5df9f"></div>
    <div class="bar" style="--i: 13; background:Yellow"></div>
    <div class="bar" style="--i: 14; background:Indigo"></div>
    <div class="bar" style="--i: 15; background:Coral"></div>
    <div class="bar" style="--i: 16; background:Turquoise"></div>
    <div class="bar" style="--i: 17; background:#968860"></div>
    <div class="bar" style="--i: 18; background:Maroon"></div>
  </div>
</body>
</html>
`;

const EqualizerLoader = () => {
  const [showCode, setShowCode] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <h2 style={styles.subheading}>🔍 Live Preview</h2>
      <div
        className="html-preview"
        style={{
          ...styles.previewContainer,
          overflowX: isMobile ? "scroll" : "visible",
        }}
        dangerouslySetInnerHTML={{ __html: htmlCode }}
      />

      <button onClick={() => setShowCode(!showCode)} style={styles.toggleButton}>
        {showCode ? (
          <>
            <FaChevronUp style={{ marginRight: "8px", transition: "transform 0.3s" }} />
            Hide Code
          </>
        ) : (
          <>
            <FaChevronDown style={{ marginRight: "8px", transition: "transform 0.3s" }} />
            Show Code
          </>
        )}
      </button>

      <div
        style={{
          ...styles.codeWrapper,
          maxHeight: showCode ? "1500px" : "0px",
          padding: showCode ? "1rem" : "0 1rem",
          opacity: showCode ? 1 : 0,
        }}
      >
        <h2 style={styles.subheading}>💡 HTML Code Example</h2>
        <pre style={styles.codeBlock}>
          <code>{htmlCode}</code>
        </pre>
      </div>
    </div>
  );
};
const styles: { [key: string]: React.CSSProperties } = {
  subheading: {
    marginTop: "2rem",
    color: "#00ffe1",
    fontSize: "1.2rem",
  },
  previewContainer: {
    backgroundColor: "#fff",
    color: "#000",
    padding: "1rem",
    borderRadius: "8px",
    marginTop: "1rem",
    width: "100%",
    overflowX: "auto",
  },
  toggleButton: {
    marginTop: "2rem",
    padding: "10px 20px",
    backgroundColor: "#00ffe1",
    color: "#000",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    transition: "background-color 0.3s, transform 0.3s",
  },
  codeWrapper: {
    transition: "all 0.5s ease",
    overflow: "auto",
  },
  codeBlock: {
    backgroundColor: "#2e2e2e",
    padding: "1rem",
    borderRadius: "8px",
    overflowX: "auto",
    color: "#00ffe1",
    fontSize: "0.85rem",
    whiteSpace: "pre-wrap",
    marginTop: "1rem",
    maxWidth: "100%",
  },
};

export default EqualizerLoader;

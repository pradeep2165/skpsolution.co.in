import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

<Helmet>
  <title>Color Picker Tool | CSS & HEX Color Generator</title>
  <meta name="description" content="Pick and experiment with colors using our intuitive color picker tool. Get HEX, RGB, and HSL values instantly for your CSS and design projects." />
  <meta name="keywords" content="color picker, HEX color tool, CSS color generator, color palette, online color selector" />
  <meta name="author" content="skp solution" />

  <meta property="og:url" content="https://skpsolution.co.in/color-picker" />
</Helmet>;

const ColorPicker: React.FC = () => {
  const [color, setColor] = useState("#4caf50");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [toastVisible, setToastVisible] = useState(false);

  const hexToRgb = (hex: string) => {
    const value = hex.replace("#", "");
    const bigint = parseInt(value, 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
    };
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h = 0,
      s = 0,
      l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h = Math.round(h * 60);
    }

    return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  const rgb = hexToRgb(color);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 1500);
    } catch {
      alert("Failed to copy");
    }
  };

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  useEffect(() => {
    document.body.style.background = theme === "dark" ? "#1a1a1a" : "#92c4e8ff";
  }, [theme]);

  return (
    <div className={`${theme === "dark" ? "dark" : ""}`} style={styles.wrapper}>
      <button onClick={toggleTheme} style={styles.toggleBtn}>
        {theme === "light" ? "🌙" : "☀️"}
      </button>
      <div style={{ ...styles.container, ...(theme === "dark" ? styles.darkCard : {}) }}>
        <h1 style={styles.title}>🎨 Color Picker</h1>
        <div style={{ ...styles.preview, background: color, boxShadow: `0 0 25px ${color}` }}></div>
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} style={styles.colorInput} />

        <ColorRow label="HEX" value={color} onCopy={copyToClipboard} />
        <ColorRow label="RGB" value={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`} onCopy={copyToClipboard} />
        <ColorRow label="HSL" value={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`} onCopy={copyToClipboard} />
      </div>

      {toastVisible && <div style={styles.toast}>Copied!</div>}
    </div>
  );
};

const ColorRow = ({ label, value, onCopy }: { label: string; value: string; onCopy: (val: string) => void }) => (
  <div style={styles.codeRow}>
    <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <span style={{ fontWeight: 500 }}>{label}:</span>
      <span style={{ wordBreak: "break-all" }}>{value}</span>
    </div>
    <button style={styles.copyBtn} onClick={() => onCopy(value)}>
      Copy
    </button>
  </div>
);

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    minHeight: "100vh",
    padding: "2rem 1rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Segoe UI, sans-serif",
    transition: "0.3s ease",
    position: "relative",
  },
  toggleBtn: {
    position: "absolute",
    top: 80,
    right: 20,
    fontSize: "1.5rem",
    background: "none",
    border: "none",
    cursor: "pointer",
  },
  container: {
    marginTop: "50px",
    maxWidth: 420,
    width: "100%",
    padding: "2rem 1rem",
    borderRadius: 20,
    background: "rgba(255,255,255,0.8)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  darkCard: {
    background: "rgba(0,0,0,0.3)",
    color: "#f0f0f0",
  },
  title: {
    fontSize: "1.8rem",
    marginBottom: "1rem",
  },
  preview: {
    width: 100,
    height: 100,
    borderRadius: "50%",
    margin: "0 auto 1rem",
    border: "4px solid white",
    transition: "box-shadow 0.3s",
  },
  colorInput: {
    width: 120,
    height: 60,
    border: "none",
    margin: "1rem auto",
    display: "block",
    cursor: "pointer",
  },
  codeRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    marginBottom: 8,
    flexWrap: "wrap",
    fontSize: "1rem",
    padding: "0 1rem",
  },
  copyBtn: {
    padding: "0.3rem 0.6rem",
    fontSize: "0.8rem",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
    backgroundColor: "#2196f3",
    color: "white",
    transition: "0.3s",
    margin: "auto",
  },
  toast: {
    position: "fixed",
    bottom: 20,
    left: "50%",
    transform: "translateX(-50%)",
    background: "#4caf50",
    color: "white",
    padding: "10px 20px",
    borderRadius: 6,
    fontSize: "0.9rem",
    zIndex: 11,
  },
};

export default ColorPicker;

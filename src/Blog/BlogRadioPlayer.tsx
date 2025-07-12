import React from "react";

const BlogRadioPlayer: React.FC = () => {
  return (
    <div
      className="blog-post"
      style={{
        fontFamily: "Segoe UI",
        padding: "2rem",
        maxWidth: "800px",
        margin: "0 auto",
        lineHeight: "1.6",
      }}
    >
      <h1>🎧 How to Build a Web-Based Radio Streaming App with Pure HTML, CSS & JavaScript</h1>

      <p>Have you ever wanted to stream live radio through your own website or app? Whether it's for your personal collection, a music streaming side project, or learning audio development—this guide shows you how to build a stylish, functional radio player using **only HTML, CSS, and JavaScript**. No frameworks, no backend, no complications.</p>

      <h2>🛠️ What You’ll Build</h2>
      <p>This simple yet powerful app includes:</p>
      <ul>
        <li>📻 A list of stations with logos and streaming URLs</li>
        <li>▶️ Play / Pause / Previous / Next controls</li>
        <li>🔊 Volume slider</li>
        <li>🌗 Theme toggle (Dark/Light)</li>
        <li>🖼 Smooth transitions and UI animation</li>
      </ul>

      <h2>📦 Core Technologies Used</h2>
      <ul>
        <li>
          <strong>HTML5</strong> – For structuring the interface
        </li>
        <li>
          <strong>CSS3</strong> – For styling, animations, and theming
        </li>
        <li>
          <strong>JavaScript</strong> – For controlling audio and user interaction
        </li>
        <li>
          <strong>HLS.js</strong> – To support `.m3u8` live radio streams
        </li>
      </ul>

      <h2>🧱 Step-by-Step Layout</h2>
      <p>The layout of the player is simple yet flexible:</p>
      <ul>
        <li>A container to hold the player</li>
        <li>Station logo image</li>
        <li>Play/Pause/Next/Previous buttons</li>
        <li>Volume slider</li>
        <li>Theme toggle button</li>
      </ul>

      <pre style={codeStyle}>
        {`<div class="player-container">
  <div class="logo"><img id="stationImage" /></div>
  <div class="station-name" id="stationName">Loading...</div>
  <div class="play-button">
    <button id="prevBtn">⏮</button>
    <button id="playBtn">▶️</button>
    <button id="pauseBtn" style="display:none;">⏸</button>
    <button id="nextBtn">⏭</button>
  </div>
  <input type="range" id="volumeSlider" min="0" max="1" step="0.01" />
</div>`}
      </pre>

      <h2>🎨 CSS Theming & Dark Mode</h2>
      <p>Use custom properties to define your color palette:</p>
      <pre style={codeStyle}>
        {`:root {
  --primary: #4a90e2;
  --bg-light: #f9f9f9;
  --bg-dark: #1a1a1a;
  --text-light: #ffffff;
  --text-dark: #333333;
}

body {
  background-color: var(--bg-light);
  color: var(--text-dark);
}

body.dark-mode {
  background-color: var(--bg-dark);
  color: var(--text-light);
}`}
      </pre>

      <p>Add a theme toggle with just one line:</p>
      <pre style={codeStyle}>
        {`function toggleTheme() {
  document.body.classList.toggle("dark-mode");
}`}
      </pre>

      <h2>🎧 Loading & Switching Stations</h2>
      <p>Here’s a sample station list:</p>
      <pre style={codeStyle}>
        {`const stations = [
  {
    name: "Radio Mirchi 98.3 FM",
    image: "https://onlineradiofm.in/assets/image/radio/180/radio-mirchi.webp",
    stream: "https://playerservices.streamtheworld.com/api/livestream-redirect/NJS_HIN_ESTAAC.m3u8"
  },
  {
    name: "Big FM 92.7",
    image: "https://onlineradiofm.in/assets/image/radio/180/big-fm.webp",
    stream: "https://stream.zeno.fm/dbstwo3dvhhtv"
  }
];`}
      </pre>

      <p>JavaScript to switch stations dynamically:</p>
      <pre style={codeStyle}>
        {`let currentIndex = 0;
let audio;
let hls;

function loadStation(index) {
  const station = stations[index];

  if (hls) hls.destroy();
  if (audio) {
    audio.pause();
    audio.src = '';
  }

  audio = new Audio();
  audio.volume = volumeSlider.value;

  if (station.stream.includes(".m3u8") && Hls.isSupported()) {
    hls = new Hls();
    hls.loadSource(station.stream);
    hls.attachMedia(audio);
    hls.on(Hls.Events.MANIFEST_PARSED, () => audio.play());
  } else {
    audio.src = station.stream;
    audio.play();
  }

  document.getElementById("stationImage").src = station.image;
  document.getElementById("stationName").textContent = station.name;
}`}
      </pre>

      <h2>🎮 Adding Interaction</h2>
      <ul>
        <li>
          <code>playBtn</code> starts audio
        </li>
        <li>
          <code>pauseBtn</code> pauses audio
        </li>
        <li>
          <code>nextBtn</code> and <code>prevBtn</code> switch stations
        </li>
        <li>
          <code>volumeSlider</code> updates audio volume
        </li>
      </ul>

      <h2>🚀 Want to Take It Further?</h2>
      <p>Here are some cool features you can add later:</p>
      <ul>
        <li>
          🗂 Favorite stations with <code>localStorage</code>
        </li>
        <li>📱 Mobile swipe navigation</li>
        <li>🔍 Search or filter by genre</li>
        <li>💾 Save volume/theme preferences</li>
        <li>📡 Add more stations from APIs or user input</li>
      </ul>

      <h2>🧠 Why Pure JS First?</h2>
      <p>Starting with pure JavaScript helps you understand how the browser works without libraries. You learn DOM manipulation, state control, media APIs, and UI responsiveness. Once you're confident, you can refactor the same app into **React + TypeScript** for better maintainability.</p>

      <h2>✅ Conclusion</h2>
      <p>Building a radio streaming web app is both easy and incredibly rewarding. With just HTML, CSS, and JavaScript, you can deliver a fully functional, elegant audio player that works across browsers — no backend required.</p>

      <p>🎉 Ready to build yours? Get started, add your favorite stations, and share your creation with the world!</p>

      <p>
        Need the <strong>React + TypeScript version?</strong> Let me know and I’ll share the full source code and component breakdown.
      </p>

      <p>Happy coding and happy streaming! 📡🎶</p>
    </div>
  );
};

const codeStyle: React.CSSProperties = {
  background: "#333",
  padding: "1rem",
  borderRadius: "8px",
  overflowX: "auto",
  fontSize: "0.9rem",
  marginTop: "1rem",
  marginBottom: "1rem",
};

export default BlogRadioPlayer;

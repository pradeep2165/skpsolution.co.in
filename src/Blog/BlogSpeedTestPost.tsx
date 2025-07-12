import React from "react";

const BlogSpeedTestPost: React.FC = () => {
  return (
    <div style={{ fontFamily: "Segoe UI", padding: "2rem", maxWidth: "800px", margin: "0 auto", color: "#fff" }}>
      <h1>🚀 Build Your Own Internet Speed Test App Using HTML, CSS & JavaScript</h1>

      <p>Ever wondered how websites like Fast.com or Speedtest.net measure your internet speed? What if you could build your own beautiful, real-time speed test app—**without using any framework**?</p>

      <p>
        In this post, we'll break down how to build a full-featured Internet Speed Test tool using just <strong>HTML, CSS, and Vanilla JavaScript</strong>. Then, we'll touch on how to modernize it using <strong>React + TypeScript</strong> for production apps.
      </p>

      <hr />

      <h2>🎯 What We’ll Build</h2>
      <ul>
        <li>⚡ A glowing, animated speedometer UI</li>
        <li>
          📍 Real-time <strong>ping</strong> measurement
        </li>
        <li>
          ⬇️ Live <strong>download speed</strong> tracking
        </li>
        <li>
          ⬆️ Live <strong>upload speed</strong> tracking
        </li>
        <li>
          🔁 A rotating <strong>needle</strong> showing current speed
        </li>
        <li>🎛️ Responsive and dark-themed layout</li>
      </ul>

      <h2>🧱 Step 1: Building the UI</h2>
      <p>The layout is made up of a circular meter, a needle, tick marks, and result fields. It’s centered using flexbox and styled using modern CSS with gradients and shadows:</p>

      <pre style={codeStyle}>
        {`<div class="container">
  <h1>Speed Test</h1>
  <div class="meter" id="meter">
    <div class="needle" id="needle"></div>
    <div class="center-dot"></div>
  </div>

  <div class="results">
    <div class="result-line"><span class="result-label">Ping:</span><span class="result-value" id="ping">--</span> ms</div>
    <div class="result-line"><span class="result-label">Download:</span><span class="result-value" id="download">--</span> Mbps</div>
    <div class="result-line"><span class="result-label">Upload:</span><span class="result-value" id="upload">--</span> Mbps</div>
  </div>

  <button onclick="startTest()">Start Test</button>
</div>`}
      </pre>

      <h2>🎨 Styling the Meter</h2>
      <p>The speedometer is a circular div with tick marks placed around it using trigonometry. The needle rotates dynamically based on the speed measured.</p>

      <pre style={codeStyle}>
        {`body {
  background: radial-gradient(circle, #1e1e1e 0%, #121212 100%);
  color: #fff;
}

.meter {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: #222;
  position: relative;
  box-shadow: 0 0 30px #0ff2;
}`}
      </pre>

      <h2>📐 Tick Marks using JavaScript</h2>
      <p>To draw 0–200 Mbps labels around the circle, we use this simple loop:</p>

      <pre style={codeStyle}>
        {`for (let i = 0; i <= 200; i += 20) {
  const angle = (i / 200) * 360;
  const x = 150 + 135 * Math.cos((angle - 90) * Math.PI / 180);
  const y = 150 + 135 * Math.sin((angle - 90) * Math.PI / 180);
  // Create and position the tick at (x, y)
}`}
      </pre>

      <h2>⏱️ Measuring Ping</h2>
      <p>A simple fetch request to a public API is timed using the Performance API:</p>

      <pre style={codeStyle}>
        {`async function measurePing() {
  const start = performance.now();
  await fetch("https://jsonplaceholder.typicode.com/posts/1");
  return Math.round(performance.now() - start);
}`}
      </pre>

      <h2>📥 Real-Time Download Speed</h2>
      <p>We fetch a 2MB file from Cloudflare and calculate the speed in Mbps. The result is updated in real-time as data streams in:</p>

      <pre style={codeStyle}>
        {`const response = await fetch("https://speed.cloudflare.com/__down?bytes=2097152");
const reader = response.body.getReader();
let received = 0;
const start = performance.now();
while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  received += value.length;
  const time = (performance.now() - start) / 1000;
  const speed = ((received * 8) / time / 1024 / 1024).toFixed(2);
  updateFn(+speed); // update the needle and UI
}`}
      </pre>

      <h2>📤 Upload Speed</h2>
      <p>For upload, we send 512KB chunks to a test API (`httpbin.org`) and measure how fast we can send 1MB of data.</p>

      <h2>🧠 Needle Rotation Logic</h2>
      <p>The needle rotates using `transform: rotate(...)`, mapped from a 0–200 Mbps scale:</p>

      <pre style={codeStyle}>
        {`function rotateNeedle(value) {
  const angle = (value / 200) * 360;
  document.getElementById("needle").style.transform = \`rotate(\${angle}deg)\`;
}`}
      </pre>

      <h2>🚦 Putting It All Together</h2>
      <p>
        When the user clicks the <strong>Start Test</strong> button:
      </p>
      <ol>
        <li>🔹 The button disables</li>
        <li>⏱️ Ping is measured</li>
        <li>⬇️ Download begins and updates live</li>
        <li>⬆️ Upload is measured</li>
        <li>📍 Needle rotates in sync</li>
        <li>✅ Button is re-enabled</li>
      </ol>

      <h2>🧩 Bonus: Rebuilding in React + TypeScript</h2>
      <p>Once you're happy with the vanilla JS version, you can migrate this into a React app for scalability and better state handling.</p>

      <ul>
        <li>
          Use a custom hook like <code>useSpeedTest()</code> to manage logic
        </li>
        <li>
          Split UI into components: <code>&lt;Meter /&gt;</code>, <code>&lt;Results /&gt;</code>, <code>&lt;SpeedButton /&gt;</code>
        </li>
        <li>
          Rotate the needle using a <code>useRef</code> or state-controlled CSS transform
        </li>
        <li>
          Add routing using React Router: <code>/speed-test</code>
        </li>
      </ul>

      <h2>✅ Final Thoughts</h2>
      <p>This project is a fun way to learn about browser performance APIs, streaming fetch, async logic, and real-time UI updates. Plus, it looks great!</p>

      <p>
        You can extend this further by adding:
        <ul>
          <li>🗺️ Location-based testing</li>
          <li>📊 Result history (with charts)</li>
          <li>🔐 Authenticated user history</li>
          <li>🌍 Multiple server selection</li>
        </ul>
      </p>

      <p>💻 Try it out, customize it, and maybe even deploy your own speedtest clone. Happy coding!</p>
    </div>
  );
};

const codeStyle: React.CSSProperties = {
  background: "#1e1e1e",
  padding: "1rem",
  borderRadius: "8px",
  overflowX: "auto",
  fontSize: "0.9rem",
  whiteSpace: "pre-wrap" as const,
  margin: "1rem 0",
  color: "#00ffe1",
};

export default BlogSpeedTestPost;

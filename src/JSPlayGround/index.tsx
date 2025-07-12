import React, { useState, useRef, useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const CodeAssistantPlayground: React.FC = () => {
  const [code, setCode] = useState(
    `<h2>Hello <span id="name">User</span></h2>
<script>
  const input = "User";
  document.getElementById('name').textContent = input;
</script>`
  );
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const runCode = () => {
    const oldFrame = iframeRef.current;
    if (oldFrame) {
      const newFrame = document.createElement("iframe");
      newFrame.id = "outputFrame";
      newFrame.style.width = "100%";
      newFrame.style.height = "100%";
      newFrame.style.border = "none";

      const outputBox = document.querySelector(".output-box");
      if (outputBox) {
        outputBox.innerHTML = "";
        outputBox.appendChild(newFrame);

        const doc = newFrame.contentWindow?.document;
        if (doc) {
          doc.open();
          doc.write(code);
          doc.close();
        }
      }
    }
  };

  return (
    <div style={{ fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif", background: "#f9fafb", color: "#111827", minHeight: "100vh" }}>
      <Helmet>
        <title>JavaScript Code Compiler | Online JS Editor & Preview</title>
        <meta name="description" content="Write, compile, and preview your JavaScript code online instantly. A fast, browser-based JS editor with live output." />
        <meta name="keywords" content="JavaScript compiler, online JS editor, JS code runner, live code preview" />
        <meta property="og:title" content="JavaScript Code Compiler" />
        <meta property="og:description" content="Write and preview JavaScript code in real time using our online JS compiler." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://skpsolution.co.in/js-paly-ground" />
      </Helmet>
      ;
      <header style={{ background: "#4f46e5", color: "white", padding: "2rem 1rem", textAlign: "center", borderBottom: "4px solid #6366f1" }}>
        <h1 style={{ marginTop: "40px ", fontSize: "2.5rem", fontWeight: 700 }}>Code Assistant</h1>
        <p style={{ fontSize: "1rem", marginTop: "0.5rem" }}>Write HTML/JS and preview output live</p>
      </header>
      <main style={{ maxWidth: 1200, margin: "2rem auto", padding: "1rem" }}>
        <h2 style={{ fontSize: "1.25rem", marginBottom: "1rem", fontWeight: 600 }}>Code Playground</h2>

        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: "1.5rem",
            alignItems: "stretch",
          }}
        >
          <div style={{ flex: 1 }}>
            <label htmlFor="codeArea" style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem" }}>
              Your HTML/JS Code:
            </label>
            <textarea
              id="codeArea"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              style={{
                width: "100%",
                minHeight: 200,
                fontFamily: "monospace",
                fontSize: 14,
                padding: 12,
                border: "1px solid #d1d5db",
                borderRadius: 8,
                background: "#ffffff",
                resize: "vertical",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            ></textarea>

            <button
              onClick={runCode}
              style={{
                marginTop: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                backgroundColor: "#10b981",
                color: "white",
                border: "none",
                padding: "0.6rem 1.2rem",
                borderRadius: "8px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#059669")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#10b981")}
            >
              <FaPlay /> Run Code
            </button>
          </div>

          <div className="output-box" style={{ flex: 1, border: "1px solid #d1d5db", borderRadius: 8, background: "#ffffff", height: 300, overflow: "hidden" }}>
            <iframe ref={iframeRef} id="outputFrame" style={{ width: "100%", height: "100%", border: "none" }}></iframe>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CodeAssistantPlayground;

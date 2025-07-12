import React, { useEffect, useRef, useState } from "react";
import "./SpeedTest.css";
import { Helmet } from "react-helmet-async";

const SpeedTest: React.FC = () => {
  const needleRef = useRef<HTMLDivElement>(null);
  const meterRef = useRef<HTMLDivElement>(null);

  const [ping, setPing] = useState<number | null>(null);
  const [download, setDownload] = useState<number | null>(null);
  const [upload, setUpload] = useState<number | null>(null);
  const [testing, setTesting] = useState(false);

  useEffect(() => {
    // Create tick marks
    if (meterRef.current && meterRef.current.children.length < 3) {
      for (let i = 0; i <= 199; i += 20) {
        const angle = (i / 200) * 360;
        const radius = 135;
        const x = 150 + radius * Math.cos(((angle - 90) * Math.PI) / 180);
        const y = 150 + radius * Math.sin(((angle - 90) * Math.PI) / 180);
        const tick = document.createElement("div");
        tick.className = "tick";
        tick.style.left = `${x}px`;
        tick.style.top = `${y}px`;
        tick.textContent = i.toString();
        meterRef.current.appendChild(tick);
      }
    }
  }, []);

  const rotateNeedle = (value: number) => {
    const angle = (value / 200) * 360;
    if (needleRef.current) {
      needleRef.current.style.transform = `rotate(${angle}deg)`;
    }
  };

  const measurePing = async (): Promise<number> => {
    const start = performance.now();
    await fetch("https://jsonplaceholder.typicode.com/posts/1");
    return Math.round(performance.now() - start);
  };

  const measureDownload = async (updateFn: (speed: number) => void) => {
    const size = 2 * 1024 * 1024;
    const url = `https://speed.cloudflare.com/__down?bytes=${size}`;
    const response = await fetch(url);
    const reader = response.body?.getReader();
    let received = 0;
    const start = performance.now();

    while (reader) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) {
        received += value.length;
        const time = (performance.now() - start) / 1000;
        const speed = +((received * 8) / time / 1024 / 1024).toFixed(2);
        updateFn(speed);
      }
    }

    const time = (performance.now() - start) / 1000;
    return +((received * 8) / time / 1024 / 1024).toFixed(2);
  };

  const measureUpload = async (updateFn: (speed: number) => void) => {
    const size = 1 * 1024 * 1024;
    const chunkSize = 512 * 1024;
    const chunks = size / chunkSize;
    const data = new Uint8Array(chunkSize);
    const start = performance.now();

    for (let i = 0; i < chunks; i++) {
      await fetch("https://httpbin.org/post", {
        method: "POST",
        body: data,
      });

      const elapsed = (performance.now() - start) / 1000;
      const uploaded = (i + 1) * chunkSize;
      const speed = +((uploaded * 8) / elapsed / 1024 / 1024).toFixed(2);
      updateFn(speed);
    }

    const totalTime = (performance.now() - start) / 1000;
    return +((size * 8) / totalTime / 1024 / 1024).toFixed(2);
  };

  const startTest = async () => {
    setTesting(true);
    setPing(null);
    setDownload(null);
    setUpload(null);
    rotateNeedle(0);

    const p = await measurePing();
    setPing(p);
    rotateNeedle(Math.min(p, 200));
    await new Promise((r) => setTimeout(r, 800));

    rotateNeedle(0);
    await measureDownload((speed) => {
      setDownload(speed);
      rotateNeedle(Math.min(speed, 200));
    });

    await new Promise((r) => setTimeout(r, 800));

    rotateNeedle(0);
    await measureUpload((speed) => {
      setUpload(speed);
      rotateNeedle(Math.min(speed, 200));
    });

    setTimeout(() => rotateNeedle(0), 2000);
    setTesting(false);
  };

  return (
    <div className="speedtest_main">
      <Helmet>
        <title>Speed Test Tool internet </title>
        <meta name="description" content="Test your internet speed: download, upload, and ping – all in one clean UI." />
      </Helmet>
      ;
      <div className="container">
        <h1>Speed Test</h1>
        <div className="meter" ref={meterRef}>
          <div className="needle" ref={needleRef}></div>
          <div className="center-dot"></div>
        </div>

        <div className="results">
          <div className="result-line">
            <span className="result-label">Ping:</span>
            <span className="result-value">{ping ?? "--"}</span> ms
          </div>
          <div className="result-line">
            <span className="result-label">Download:</span>
            <span className="result-value">{download ?? "--"}</span> Mbps
          </div>
          <div className="result-line">
            <span className="result-label">Upload:</span>
            <span className="result-value">{upload ?? "--"}</span> Mbps
          </div>
        </div>

        <button onClick={startTest} disabled={testing}>
          {testing ? "Testing..." : "Start Test"}
        </button>
      </div>
    </div>
  );
};

export default SpeedTest;

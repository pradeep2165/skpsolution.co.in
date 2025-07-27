import { useEffect, useState } from "react";
import "./YouTubeDownloader.css";
import { io } from "socket.io-client";
import { Helmet } from "react-helmet-async";

type FormatKey = string;

type Status = "idle" | "loading" | "ready" | "error";

const host = "https://skpsolution.co.in";

const YouTubeDownloader: React.FC = () => {
  const [url, setUrl] = useState<string>("");
  const [formats, setFormats] = useState<FormatKey[]>([]);
  const [format, setFormat] = useState<FormatKey>("");
  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState<number>(0);
  const [blobURL, setBlobURL] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("Something went wrong. Please try again");

  // Fetch available formats on load
  useEffect(() => {
    fetch(`${host}/formats`)
      .then((res) => res.json())
      .then((list: FormatKey[]) => {
        setFormats(list);
        setFormat(list[0] ?? "");
      })
      .catch(() => setFormats([]));
  }, []);

  // Poll for progress if downloading

  useEffect(() => {
    // const socket = io("https://skpsolution.co.in/socket.io");
    const socket = io("https://skpsolution.co.in");
    socket.on("completePercentage", (data) => {
      setProgress(data);
    });
  }, []);

  // Validate input URL
  const isValidYouTubeUrl = (url: string): boolean => {
    return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/.test(url);
  };

  // Handle download
  const handleDownload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!url || !format) return;

    if (!isValidYouTubeUrl(url)) {
      setStatus("error");
      setErrorMessage("Only YouTube links are allowed");
      return;
    }

    setStatus("loading");
    setProgress(0);
    setBlobURL("");

    try {
      const res = await fetch(`${host}/api/convert`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, formatKey: format }),
        credentials: "include",
      });

      if (!res.ok) throw new Error("backend error");

      const blob = await res.blob();
      console.log(blob);
      const objectUrl = URL.createObjectURL(blob);
      console.log(objectUrl);
      setBlobURL(objectUrl);
      setStatus("ready");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <main className="page-wrapper">
      <Helmet>
        <title>YouTube Video Downloader | Download Videos in HD, MP4, MP3</title>
        <meta name="description" content="Download YouTube videos in HD, MP4, or MP3 formats instantly. Fast and secure online video downloader — no installation needed." />
        <meta name="keywords" content="YouTube video downloader, download YouTube videos, MP4 YouTube download, YouTube to MP3, online video downloader" />
        <meta name="author" content="skpsolution" />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="YouTube Video Downloader" />
        <meta property="og:description" content="Free and fast tool to download YouTube videos and audio in multiple formats. Works directly in your browser." />
        <meta property="og:url" content="https://skpsolution.co.in/ytf-download" />
      </Helmet>
      ;
      <div className="downloader-box">
        <h1 className="downloader-title">🎬 YouTube Video Downloader</h1>

        <form onSubmit={handleDownload}>
          <div className="form-group">
            <label className="label">YouTube URL</label>
            <input type="url" required value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://youtu.be/..." className="input" />
          </div>

          <div className="form-group">
            <label className="label">Select Format</label>
            <select required value={format} onChange={(e) => setFormat(e.target.value)} className="select">
              {formats.map((f) => (
                <option key={f} value={f}>
                  {f.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" disabled={status === "loading"} className="button">
            {status === "loading" ? "Processing..." : "🎯 Start Download"}
          </button>
        </form>

        {status === "loading" && (
          <div className="progress-bar-wrapper">
            <div className="progress-text">Progress: {progress}%</div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        )}

        {status === "error" && <p className="error-message">❌ {errorMessage}</p>}

        {status === "ready" && blobURL && (
          <a href={blobURL} download={`video.${format.startsWith("mp3") ? "mp3" : format.split("-")[0]}`} className="download-link">
            ✅ Click to Save File
          </a>
        )}
      </div>
    </main>
  );
};

export default YouTubeDownloader;

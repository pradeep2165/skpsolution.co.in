import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import "./RadioPlayer.css";
import stationData from "./allIndiaStations.ts";
import { Helmet } from "react-helmet-async";

interface Station {
  radio_id: string;
  radio_name: string;
  radio_image: string;
  radio_url: string;
  genre: string;
  country_id: string;
  country_name: string;
  country_flag: string;
}

const stations: Station[] = stationData.stations;

const RadioPlayer: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);

  const station = stations[currentIndex];

  const loadStation = (index: number) => {
    const selected = stations[index];

    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }

    const newAudio = new Audio();
    newAudio.volume = volume;
    audioRef.current = newAudio;

    if (selected.radio_url.includes(".m3u8") && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(selected.radio_url);
      hls.attachMedia(newAudio);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        newAudio.play();
      });
      hlsRef.current = hls;
    } else {
      newAudio.src = selected.radio_url;
      newAudio.play();
    }

    setIsPlaying(true);
  };

  useEffect(() => {
    loadStation(currentIndex);

    return () => {
      if (hlsRef.current) hlsRef.current.destroy();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, [currentIndex]);

  const play = () => {
    audioRef.current?.play();
    setIsPlaying(true);
  };

  const pause = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  const next = () => setCurrentIndex((currentIndex + 1) % stations.length);
  const prev = () => setCurrentIndex((currentIndex - 1 + stations.length) % stations.length);

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const filteredStations = stations.filter((station) => station.radio_name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="radio-app responsive-layout">
      <Helmet>
        <title>Online FM Radio Player | Stream Live Music & Radio</title>
        <meta name="description" content="Listen to live FM radio stations online. Enjoy nonstop music, talk shows, and news channels from around the world – all in one simple web radio player." />
        <meta name="keywords" content="online FM radio, live radio streaming, internet radio player, music radio, FM station stream" />
        <meta name="author" content="skpsolution" />

        {/* Open Graph (for Facebook and others) */}
        <meta property="og:title" content="Online FM Radio Player" />
        <meta property="og:description" content="Free online FM radio streaming. Tune into music, news, and talk shows from global radio stations." />
        <meta property="og:url" content="https://skpsolution.co.in/fmRadio" />

        {/* Twitter Card */}
        <meta name="twitter:title" content="Online FM Radio Player" />
        <meta name="twitter:description" content="Stream live FM radio with music, talk, and more. Simple, free, and accessible online radio player." />
      </Helmet>
      ;
      <aside className="station-sidebar">
        <h2>📻 Indian Radios</h2>
        <input type="text" placeholder="Search station..." className="search-input" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <div className="station-list">
          {filteredStations.map((s) => (
            <div key={s.radio_id} className={`station-item ${stations.indexOf(s) === currentIndex ? "active" : ""}`} onClick={() => setCurrentIndex(stations.indexOf(s))}>
              <img src={s.radio_image} alt={s.radio_name} className="station-icon" />
              <span>{s.radio_name}</span>
            </div>
          ))}
        </div>
      </aside>
      <main className="player-content">
        <div className="player">
          <div className="station-art">
            <img src={station.radio_image} alt="Playing" className="rotating-image" />
          </div>
          <h3 className="station-title">{station.radio_name}</h3>

          <div className="controls">
            <button className="outline-btn" onClick={prev}>
              <ChevronLeft size={24} />
            </button>
            {isPlaying ? (
              <button className="outline-btn" onClick={pause}>
                <Pause size={24} />
              </button>
            ) : (
              <button className="outline-btn" onClick={play}>
                <Play size={24} />
              </button>
            )}
            <button className="outline-btn" onClick={next}>
              <ChevronRight size={24} />
            </button>
          </div>

          <input className="volume-slider" type="range" min="0" max="1" step="0.01" value={volume} onChange={changeVolume} />
        </div>
      </main>
    </div>
  );
};

export default RadioPlayer;

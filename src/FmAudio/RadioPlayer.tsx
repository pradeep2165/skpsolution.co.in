import React, { useEffect, useRef, useState, useMemo, lazy } from "react";
import Hls from "hls.js";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { Helmet } from "react-helmet-async";
import stationData from "./allIndiaStations.ts";
import type { Station } from "./types.ts";
import "./RadioPlayer.css";

const VirtualizedList = lazy(() => import("./VirtualizedList.tsx"));

const stations: Station[] = stationData.stations;

const useDebounce = (value: string, delay: number): string => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};

const RadioPlayer: React.FC = () => {
  const [volume, setVolume] = useState(0.8);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentStation, setCurrentStation] = useState<Station>(stations[0]);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);

  const stationsLength = useMemo(() => stations.length, []);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filteredStations = useMemo(() => {
    return stations.filter((station) => station.radio_name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()));
  }, [debouncedSearchTerm]);

  const loadStation = (station: Station) => {
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

    if (station.radio_url.includes(".m3u8") && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(station.radio_url);
      hls.attachMedia(newAudio);
      hlsRef.current = hls;
      setIsPlaying(false);
    } else {
      newAudio.src = station.radio_url;
      newAudio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  useEffect(() => {
    loadStation(currentStation);
    return () => {
      hlsRef.current?.destroy();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, [currentStation]);

  const play = () => {
    audioRef.current
      ?.play()
      .then(() => setIsPlaying(true))
      .catch((err) => {
        setIsPlaying(false);
        alert("Failed to play stream. Please try a different station.");
        console.error("Play error:", err);
      });
  };

  const pause = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  const next = () => {
    const index = stations.findIndex(({ radio_id }) => radio_id === currentStation.radio_id);
    setCurrentStation(stations[(index + 1) % stationsLength]);
  };

  const prev = () => {
    const index = stations.findIndex(({ radio_id }) => radio_id === currentStation.radio_id);
    setCurrentStation(stations[(index - 1 + stationsLength) % stationsLength]);
  };

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) audioRef.current.volume = newVolume;
  };

  const handleSetStation = (station: Station) => setCurrentStation(station);

  return (
    <div className="radio-app responsive-layout">
      <Helmet>
        <title>Online FM Radio Player | Stream Live Music & Radio</title>
        <meta name="description" content="Listen to live FM radio stations online. Enjoy nonstop music, talk shows, and news channels from around the world." />
        <meta name="keywords" content="online FM radio, live radio streaming, internet radio player, music radio, FM station stream" />
        <meta name="author" content="skp solution" />
        <meta property="og:title" content="Online FM Radio Player" />
        <meta property="og:description" content="Free online FM radio streaming. Tune into music, news, and talk shows from global radio stations." />
        <meta property="og:url" content="https://skpsolution.co.in/fmRadio" />
        <meta name="twitter:title" content="Online FM Radio Player" />
        <meta name="twitter:description" content="Stream live FM radio with music, talk, and more. Simple, free, and accessible online radio player." />
      </Helmet>

      <aside className="station-sidebar">
        <h2>📻 Indian Radios</h2>
        <input type="text" placeholder="Search station..." className="search-input" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <div className="station-list">
          <VirtualizedList list={filteredStations} height={350} width={255} itemHeight={64} setStation={handleSetStation} stationId={currentStation.radio_id} />
        </div>
      </aside>

      <main className="player-content">
        <div className="player">
          <div className="station-art">
            <img src={currentStation.radio_image} alt="Playing" className="rotating-image" loading="eager" decoding="async" />
          </div>
          <h6 className="station-title">{currentStation.radio_name}</h6>

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

import React, { useEffect, useRef, useState, useMemo } from "react";
import Hls from "hls.js";
import "./style.css";
import stationData from "./allIndiaStations.ts";

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
const stations_length: number = useMemo(function () {
  return stationData.stations.length;
}, []);
const RadioPlayer: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isPlaying, setIsPlaying] = useState(true);

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

  const toggleTheme = () => setIsDark(!isDark);

  const play = () => {
    audioRef.current?.play();
    setIsPlaying(true);
  };

  const pause = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  const next = () => setCurrentIndex((currentIndex + 1) % stations_length);
  const prev = () => setCurrentIndex((currentIndex - 1 + stations_length) % stations_length);

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className={`radio-container ${isDark ? "dark-mode" : ""}`}>
      <button className="theme-toggle" onClick={toggleTheme}>
        🌓
      </button>
      <div className="player-container">
        <div className="logo">
          <img loading="lazy" src={station.radio_image} alt="Station" />
          <div className="play-button">
            <svg onClick={prev} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
              <polygon points="65,30 35,50 65,70" />
            </svg>
            {isPlaying ? (
              <svg onClick={pause} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                <rect x="35" y="30" width="10" height="40" />
                <rect x="55" y="30" width="10" height="40" />
              </svg>
            ) : (
              <svg onClick={play} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                <polygon points="40,30 70,50 40,70" />
              </svg>
            )}
            <svg onClick={next} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
              <polygon points="35,30 65,50 35,70" />
            </svg>
          </div>
        </div>
        <div className="station-name">{station.radio_name}</div>
        <input type="range" min="0" max="1" step="0.01" value={volume} onChange={changeVolume} />
      </div>
    </div>
  );
};

export default RadioPlayer;

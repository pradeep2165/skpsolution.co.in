import { useState } from "react";
import type { UIEvent } from "react";
import type { Station } from "./types";

interface VirtualizedListProps {
  list: Station[]; // Adjust the object type based on actual shape
  height: number;
  width: number;
  itemHeight: number;
  stationId: string;
  setStation: (station: Station) => void;
}

export default function VirtualizedList({ list, height, itemHeight, setStation, stationId }: VirtualizedListProps) {
  const [indices, setIndices] = useState<[number, number]>([0, Math.floor(height / itemHeight)]);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    const newStartIndex = Math.floor(scrollTop / itemHeight);
    const newEndIndex = newStartIndex + Math.floor(height / itemHeight);
    setIndices([newStartIndex, newEndIndex]);
  };

  const visibleList = list.slice(indices[0], indices[1] + 1);

  return (
    <div className="container" onScroll={handleScroll} style={{ height, background: "inharit", overflow: "auto" }}>
      <div style={{ height: list.length * itemHeight, position: "relative" }}>
        {visibleList.map((item, index) => {
          return (
            <div
              key={indices[0] + index}
              className={`station-item ${stationId === item.radio_id ? "active" : ""}`}
              style={{
                height: "itemHeight",
                background: "inharit",
                position: "absolute",
                top: (indices[0] + index) * itemHeight,
                width: "100%",
                // textAlign: "center",
                color: "whitesmoke",
                margin: "auto",
                display: "fleX",
                gap: "4px",
                alignItems: "center",
              }}
              onClick={() => setStation(item)}
            >
              <img src={item.radio_image} alt="radio images" loading="lazy" className="station-icon" />
              <span>{item.radio_name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

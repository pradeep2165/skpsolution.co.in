import { useState, UIEvent } from "react";

interface VirtualizedListProps {
  list: { radio_name: string; radio_image: string }[]; // Adjust the object type based on actual shape
  height: number;
  width: number;
  itemHeight: number;
}

export default function VirtualizedList({ list, height, width, itemHeight }: VirtualizedListProps) {
  const [indices, setIndices] = useState<[number, number]>([0, Math.floor(height / itemHeight)]);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    const newStartIndex = Math.floor(scrollTop / itemHeight);
    const newEndIndex = newStartIndex + Math.floor(height / itemHeight);
    setIndices([newStartIndex, newEndIndex]);
  };

  const visibleList = list.slice(indices[0], indices[1] + 1);

  return (
    <div className="container" onScroll={handleScroll} style={{ height, width, background: "inharit", overflow: "auto" }}>
      <div style={{ height: list.length * itemHeight, position: "relative" }}>
        {visibleList.map((item, index) => {
          console.log(item);
          return (
            <div
              key={indices[0] + index}
              className="item"
              style={{
                height: "itemHeight",
                background: "inharit",
                //   borderTop: "5px solid grey",
                position: "absolute",
                top: (indices[0] + index) * itemHeight,
                width: "100%",
                //   textAlign: "center",
                color: "whitesmoke",
                margin: "auto",
                display: "fleX",
                gap: "1px",
                alignItems: "center",
              }}
            >
              <img src={item.radio_image} alt="radio images" loading="lazy" style={{ width: "2rem", height: "2rem", borderRadius: "50%", marginRight: "0.5rem" }} />
              <h5 title={item.radio_name}>{item.radio_name.slice(0, 30)}</h5>
            </div>
          );
        })}
      </div>
    </div>
  );
}

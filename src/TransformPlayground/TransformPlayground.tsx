import { useState } from "react";
import "./TransformPlayground.css";

import { Helmet } from "react-helmet-async";

const TransformPlayground = () => {
  const [rotate, setRotate] = useState(0);
  const [scale, setScale] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [skewX, setSkewX] = useState(0);
  const [skewY, setSkewY] = useState(0);

  const transformStyle = {
    transform: `translate(${translateX}px, ${translateY}px) scale(${scale}) rotate(${rotate}deg) skew(${skewX}deg, ${skewY}deg)`,
  };

  const transformText = transformStyle.transform;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`transform: ${transformText};`);
  };

  return (
    <div className="transformPlayground_container">
      <Helmet>
        <title>CSS Transform Playground | Visualize & Generate CSS Transform Code</title>
        <meta name="description" content="Experiment with CSS transform properties like rotate, scale, skew, and translate in real-time. Generate clean CSS transform code visually." />
        <meta name="keywords" content="CSS transform, rotate, scale, skew, translate, transform playground, CSS editor, online CSS generator" />
        <meta name="author" content="skpsolution" />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="CSS Transform Playground" />
        <meta property="og:description" content="Visual tool to learn and experiment with CSS transform functions. Instantly see and copy generated code." />
        <meta property="og:url" content="https://yourdomain.com/css-transform-playground" />
      </Helmet>
      ;<h1>🛠 CSS Transform Playground</h1>
      <div className="playground">
        <div className="controls">
          <label>
            Rotate (<span>{rotate}</span>°)
            <input type="range" min="0" max="360" value={rotate} onChange={(e) => setRotate(+e.target.value)} />
          </label>
          <label>
            Scale (<span>{scale}</span>)
            <input type="range" min="0.1" max="2" step="0.1" value={scale} onChange={(e) => setScale(+e.target.value)} />
          </label>
          <label>
            TranslateX (<span>{translateX}</span>px)
            <input type="range" min="-200" max="200" value={translateX} onChange={(e) => setTranslateX(+e.target.value)} />
          </label>
          <label>
            TranslateY (<span>{translateY}</span>px)
            <input type="range" min="-200" max="200" value={translateY} onChange={(e) => setTranslateY(+e.target.value)} />
          </label>
          <label>
            SkewX (<span>{skewX}</span>°)
            <input type="range" min="-90" max="90" value={skewX} onChange={(e) => setSkewX(+e.target.value)} />
          </label>
          <label>
            SkewY (<span>{skewY}</span>°)
            <input type="range" min="-90" max="90" value={skewY} onChange={(e) => setSkewY(+e.target.value)} />
          </label>
        </div>
        <div className="box" style={transformStyle}></div>
      </div>
      <div className="code-output">
        <span>{`transform: ${transformText};`}</span>
        <button className="copy-btn" onClick={copyToClipboard}>
          Copy
        </button>
      </div>
    </div>
  );
};

export default TransformPlayground;

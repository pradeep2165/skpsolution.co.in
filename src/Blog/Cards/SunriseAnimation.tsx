import { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const htmlCode = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        :root {
            --v1: #be91c6;
            --v2: #8a65cc;
            --v3: #5e30d9;
            --transparentv3: #5e30d900;
            --v4: #3b1895;
            --s1: #fea798;
            --s2: #ff846e;
            --cloud: #fea798;
        }

        *,
        *:before,
        *:after {
            //animation:none!important;
        }

        .landscape:after,
        .landscape:before,
        .landscape *,
        .landscape *:after,
        .landscape *:before {
            position: absolute;
        }

        .front {
            z-index: 1;
            bottom: 0;
            left: 0;
            right: 0;
        }

        .landscape {
            height: 100vh;
            background-image: linear-gradient(var(--v1), var(--s1), var(--v1));
            position: relative;
            z-index: 1;
            overflow: hidden;
        }

        .mountain {
            border-radius: 180% 80% 0% 0%/60vmin 60vmin 0% 0%;
            width: 40vmin;
            height: 30vmin;
            bottom: 50%;
            left: -10vmin;
            background: var(--s1);
            background-image: linear-gradient(var(--v1), var(--v2) 30%, var(--v3));
            box-shadow: inset -10px 0 10px -10px var(--s1);

            &:before {
                content: "";
                bottom: 0;
                width: inherit;
                height: inherit;
                background: inherit;
                border-radius: inherit;
                transform-origin: bottom center;
                transform: scaleX(1) scaleY(-0.6);
                filter: blur(3px);
            }
        }

        .mountain-2 {
            left: 5vmin;
            height: 15vmin;
            width: 40vmin;
            box-shadow: inset -15px 0 10px -14px var(--s1);
            border-radius: 120% 50% 0% 0%/25vmin 25vmin 0% 0%;
            background-image: linear-gradient(var(--v3), var(--v4));
        }

        .mountain-3 {
            border-radius: 80% 0% 0 0/100% 100% 0 0;
            right: -85vmin;
            width: 100vmin;
            left: auto;
            height: 12vmin;
            color: var(--v3);
            background-image: linear-gradient(var(--s1), var(--v4));
            box-shadow: inset 15px 0 10px -10px var(--s1);
        }

        .mountain-3:after {
            content: "";
            border-radius: 60% 0 0 0/100% 0 0 0;
            background: inherit;
            width: 100%;
            height: 0;
            bottom: 0;
            right: 20%;
        }

        .lotus {
            width: 10vmin;
            height: 5vmin;
            background: conic-gradient(var(--v3) 0deg 40deg,
                    var(--transparentv3) 50deg 70deg,
                    var(--v3) 80deg);
            border-radius: 50%;
        }

        .lotus-1 {
            bottom: 10vmin;
            right: 5vmin;
            width: 20vmin;
        }

        .lotus-2 {
            bottom: 20vmin;
            right: 15vmin;
            height: 3vmin;
            transform: skew(-10deg);
            opacity: 0.5;
            mix-blend-mode: multiply;
        }

        .lotus-3 {
            bottom: 10vmin;
            right: 35vmin;
            transform: rotate(180deg) skew(-20deg);
            opacity: 0.8;
            width: 15vmin;
        }

        .cloud {
            width: 80vmin;
            height: 6vmin;
            background: currentcolor;
            color: var(--cloud);
            top: 24vmin;
            left: 20vmin;
            border-radius: 50%;
            box-shadow: 30vmin 0.5vmin 0 -1vmin currentcolor,
                -25vmin 0 0 -0.6vmin currentcolor;
            opacity: 0.3;
            transform: translate3d(-150vmin, 0, 0);
            animation: clouds 120s infinite;
            animation-delay: -10s;
        }

        @keyframes clouds {
            50% {
                transform: translate3d(0, 0, 0);
            }

            100% {
                transform: translate3d(150vmin, 0, 0);
            }
        }

        .cloud-1 {
            left: 60vmin;
            top: 15vmin;
            opacity: 0.2;
            filter: blur(1px);
            animation-delay: 0;
            animation-duration: 100s;
        }

        .water {
            top: 50%;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(#fea79855, var(--v2));
            overflow: hidden;
            box-shadow: inset 0 1px 4px -3px white;
        }

        .stone {
            bottom: -5vh;
            left: 0;
            height: 20vmin;
            width: 40vmin;
            background: var(--v4);
            box-shadow: inset 0 0 20px -5px rgba(0, 0, 0, 0.2);
            border-radius: 0% 200% 0 0/0% 200%;
        }

        .stone:after {
            content: "";
            background: var(--v3);
            width: 100%;
            height: 100%;
            right: -15%;
            border-radius: inherit;
            z-index: -1;
            transform: scaleX(1.3) skew(10deg);
            box-shadow: inset 0 0 20px -5px rgba(0, 0, 0, 0.4);
        }

        .grass {
            height: 40vmin;
            width: 10vmin;
            border-radius: 0 60% 0 0/0 100% 0 0;
            bottom: 0;
            border-right: 5px solid var(--v4);
            box-shadow: 1px 0 0 var(--s1);
            filter: drop-shadow(-0.5vmin 6vmin 0 var(--s2)) drop-shadow(-4.5vmin 10vmin 0 var(--v3));
        }

        .grass-1 {
            left: 14vmin;
            bottom: -2vmin;
            transform: scaleX(-1);
            box-shadow: 2px 0 0 var(--v4);
            border-color: var(--v3);
            filter: drop-shadow(-1vmin 5vmin 0 var(--v3)) drop-shadow(-80vmin 5vmin 0 var(--v4));
        }

        .grass-2 {
            right: 0;
            left: auto;
            height: 20vmin;
            bottom: -2vmin;
            transform: scaleX(-1);
        }

        .sun {
            background: white;
            border-radius: 50%;
            width: 20vmin;
            height: 20vmin;
            left: calc(60% - 10vmin);
            top: 100%;
            transform: translate3d(0, 0, 0);
            animation: rise 20s infinite;
            box-shadow: 0 0 10px white;
        }

        .reed {
            height: 40vmin;
            width: 0.5vmin;
            bottom: 0;
            left: 10vmin;
            color: var(--v4);
            background: currentColor;
            transform-origin: bottom center;
            transform: rotate(4deg);
            box-shadow: inset -1px 0 0 var(--s2), -6vmin 3vmin 0 0, 80vmin 0 0 0;
            animation: verticalise 20s infinite;
        }

        .reed-1 {
            color: var(--s2);
            left: 15vmin;
            height: 50vmin;
            bottom: -5vmin;
            transform: rotate(-2deg);
            animation: verticalise-1 20s infinite;
            box-shadow: inset -1px 0 0 var(--s1), 6vmin 13vmin 0 0 var(--s1),
                80vmin 10vmin 0 0 var(--v3);
        }

        .reed:after {
            content: "";
            width: 1.5vmin;
            height: 10vmin;
            background: currentcolor;
            border-radius: 0.75vmin;
            top: 0;
            left: -0.5vmin;
            box-shadow: inherit;
        }

        @keyframes verticalise {

            0%,
            10% {
                transform: rotate(4deg);
            }

            30%,
            70% {
                transform: rotate(0);
            }
        }

        @keyframes verticalise-1 {

            0%,
            10% {
                transform: rotate(-2deg);
            }

            45%,
            70% {
                transform: rotate(0) translateY(-6vmin);
            }
        }

        @keyframes rise {
            100% {
                transform: translate3d(0, -100vh, 20vmin);
            }
        }

        @keyframes rise-reflection {
            30% {
                opacity: 0;
                transform: translate3d(0, 5vmin, 0);
            }

            100% {
                opacity: 0;
                transform: translate3d(0, 80vmin, 0);
            }
        }

        .sun-container {
            overflow: hidden;
            width: 100%;
            height: 50%;
        }

        .sun-container-1:after {
            content: "";
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background: radial-gradient(circle at 60% 100%, var(--s2), transparent);
            animation: fade 20s infinite;
            mix-blend-mode: color-burn;
        }

        @keyframes fade {
            10% {
                opacity: 1;
            }

            30%,
            70% {
                opacity: 0;
            }
        }

        .sun-container-reflection {
            top: 50%;
            background: radial-gradient(circle at 60% 0%, var(--s2), transparent);
        }

        .sun-container-reflection .sun {
            background: linear-gradient(white, rgba(255, 255, 255, 0));
            box-shadow: none;
            filter: blur(5px);
            opacity: 1;
            top: 0;
            transform: translate3d(0, -20vmin, 0);
            animation-name: rise-reflection;
        }

        .light {
            height: 0.5vmin;
            width: 20vmin;
            background: white;
            left: 20%;
            right: 0;
            margin: auto;
            top: calc(50% + 1vmin);
            animation: light 20s infinite;
            opacity: 0;
            transform: scaleX(0.1) translate3d(0%, 0, 0);
            border-radius: 0.25vh;
            filter: blur(1px);
        }

        @-webkit-keyframes light {
            5% {
                opacity: 1;
                transform: scaleX(1);
            }

            10% {
                opacity: 0.6;
                transform: scaleX(1) translate3d(5%, 0, 0);
            }

            15% {
                opacity: 0.6;
                transform: scaleX(1) translate3d(-5%, 0, 0);
            }

            20% {
                opacity: 0;
                transform: scaleX(0.1) translate3d(0, 0, 0);
            }
        }

        @keyframes light {
            5% {
                opacity: 1;
                transform: scaleX(1);
            }

            10% {
                opacity: 0.6;
                transform: scaleX(1) translate3d(5%, 0, 0);
            }

            15% {
                opacity: 0.6;
                transform: scaleX(1) translate3d(-5%, 0, 0);
            }

            20% {
                opacity: 0;
                transform: scaleX(0.1) translate3d(0, 0, 0);
            }
        }

        .light-1 {
            top: calc(50% + 2vmin);
            animation-delay: 0.5s;
        }

        .light-2 {
            top: calc(50% + 3vmin);
            width: 18vmin;
            animation-delay: 1s;
        }

        .light-3 {
            top: calc(50% + 4vmin);
            width: 18vmin;
            animation-delay: 1.5s;
        }

        .light-4 {
            top: calc(50% + 5vmin);
            width: 16vmin;
            animation-delay: 2s;
        }

        .light-5 {
            top: calc(50% + 8vmin);
            width: 14vmin;
            animation-delay: 2.5s;
        }

        .light-6 {
            top: calc(50% + 9vmin);
            width: 10vmin;
            animation-delay: 3s;
        }

        .light-7 {
            top: calc(50% + 7vmin);
            width: 12vmin;
            animation-delay: 3.5s;
        }

        .splash {
            width: 8vmin;
            height: 3vmin;
            border: 2px solid var(--s1);
            box-shadow: 0 0 2px var(--s1);
            border-radius: 50%;
            bottom: 5vmin;
            left: 70%;
            animation: splash 9s infinite;
            transform: scale(0);
        }

        .splash-stone {
            bottom: 15vh;
            left: -3vmin;
            height: 10vmin;
            width: 30vmin;
        }

        .splash-4 {
            bottom: 5vmin;
            left: auto;
            bottom: 15vmin;
            right: -2vmin;
        }

        @keyframes splash {

            50%,
            100% {
                transform: scale(1);
                opacity: 0;
            }
        }

        .delay-1 {
            animation-delay: 1s;
        }

        .delay-2 {
            animation-delay: 2s;
        }

        .delay-3 {
            animation-delay: 3s;
        }

        .delay-4 {
            animation-delay: 4s;
        }

        .delay-5 {
            animation-delay: 5s;
        }

        .delay-6 {
            animation-delay: 6s;
        }
    </style>
</head>

<body>
    <div class="landscape">
        <div class="mountain"></div>
        <div class="mountain mountain-2"></div>
        <div class="mountain mountain-3"></div>
        <div class="sun-container sun-container-1">
        </div>
        <div class="sun-container">
            <div class="sun"></div>
        </div>
        <div class="cloud"></div>
        <div class="cloud cloud-1"></div>
        <div class="sun-container sun-container-reflection">
            <div class="sun"></div>
        </div>
        <div class="light"></div>
        <div class="light light-1"></div>
        <div class="light light-2"></div>
        <div class="light light-3"></div>
        <div class="light light-4"></div>
        <div class="light light-5"></div>
        <div class="light light-6"></div>
        <div class="light light-7"></div>
        <div class="water"></div>
        <div class="splash"></div>
        <div class="splash delay-1"></div>
        <div class="splash delay-2"></div>
        <div class="splash splash-4 delay-2"></div>
        <div class="splash splash-4 delay-3"></div>
        <div class="splash splash-4 delay-4"></div>
        <div class="splash splash-stone delay-3"></div>
        <div class="splash splash-stone splash-4"></div>
        <div class="splash splash-stone splash-5"></div>
        <div class="lotus lotus-1"></div>
        <div class="lotus lotus-2"></div>
        <div class="lotus lotus-3"></div>
        <div class="front">
            <div class="stone"></div>
            <div class="grass"></div>
            <div class="grass grass-1"></div>
            <div class="grass grass-2"></div>
            <div class="reed"></div>
            <div class="reed reed-1"></div>
        </div>
    </div>
</body>

</html>
`;

const SunriseAnimation = () => {
  const [showCode, setShowCode] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <h2 style={styles.subheading}>🔍 Live Preview</h2>
      <div
        className="html-preview"
        style={{
          ...styles.previewContainer,
          overflowX: isMobile ? "scroll" : "visible",
        }}
        dangerouslySetInnerHTML={{ __html: htmlCode }}
      />

      <p style={{ marginTop: "2rem", fontStyle: "italic" }}>
        Make sure related images like <code>pentool-removebg-preview.png</code> are in your
        <code>/public</code> folder or adjust paths accordingly.
      </p>

      <button onClick={() => setShowCode(!showCode)} style={styles.toggleButton}>
        {showCode ? (
          <>
            <FaChevronUp style={{ marginRight: "8px", transition: "transform 0.3s" }} />
            Hide Code
          </>
        ) : (
          <>
            <FaChevronDown style={{ marginRight: "8px", transition: "transform 0.3s" }} />
            Show Code
          </>
        )}
      </button>

      <div
        style={{
          ...styles.codeWrapper,
          maxHeight: showCode ? "1500px" : "0px",
          padding: showCode ? "1rem" : "0 1rem",
          opacity: showCode ? 1 : 0,
        }}
      >
        <h2 style={styles.subheading}>💡 HTML Code Example</h2>
        <pre style={styles.codeBlock}>
          <code>{htmlCode}</code>
        </pre>
      </div>
    </div>
  );
};
const styles: { [key: string]: React.CSSProperties } = {
  subheading: {
    marginTop: "2rem",
    color: "#00ffe1",
    fontSize: "1.2rem",
  },
  previewContainer: {
    backgroundColor: "#fff",
    color: "#000",
    padding: "1rem",
    borderRadius: "8px",
    marginTop: "1rem",
    width: "100%",
    overflowX: "auto",
  },
  toggleButton: {
    marginTop: "2rem",
    padding: "10px 20px",
    backgroundColor: "#00ffe1",
    color: "#000",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    transition: "background-color 0.3s, transform 0.3s",
  },
  codeWrapper: {
    transition: "all 0.5s ease",
    overflow: "auto",
  },
  codeBlock: {
    backgroundColor: "#2e2e2e",
    padding: "1rem",
    borderRadius: "8px",
    overflowX: "auto",
    color: "#00ffe1",
    fontSize: "0.85rem",
    whiteSpace: "pre-wrap",
    marginTop: "1rem",
    maxWidth: "100%",
  },
};

export default SunriseAnimation;

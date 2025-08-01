import { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const htmlCode = `
<style>
        @import url(//fonts.googleapis.com/css?family=Lato:300:400);


        .wave_hero_header h1 {
            font-family: 'Lato', sans-serif;
            font-weight: 300;
            letter-spacing: 2px;
            font-size: 48px;
        }

        .wave_hero_header p {
            font-family: 'Lato', sans-serif;
            letter-spacing: 1px;
            font-size: 14px;
            color: #333333;
        }

        .wave_hero_header {
            position: relative;
            text-align: center;
            background: linear-gradient(60deg, rgba(84, 58, 183, 1) 0%, rgba(0, 172, 193, 1) 100%);
            color: white;
        }

        .wave_hero_header .logo {
            width: 50px;
            fill: white;
            padding-right: 15px;
            display: inline-block;
            vertical-align: middle;
        }

        .wave_hero_header .inner-header {
            height: 65vh;
            width: 100%;
            margin: 0;
            padding: 0;
        }

        .wave_hero_header .flex,   .wave_hero_flex{
            /*Flexbox for containers*/
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
        }

        .wave_hero_header .waves {
            position: relative;
            width: 100%;
            height: 15vh;
            margin-bottom: -7px;
            /*Fix for safari gap*/
            min-height: 100px;
            max-height: 150px;
        }

        .wave_hero_content {
            position: relative;
            height: 20vh;
            text-align: center;
            background-color: white;
        }

        /* Animation */

        .wave_hero_header .parallax>use {
            animation: move-forever 25s cubic-bezier(.55, .5, .45, .5) infinite;
        }

        .wave_hero_header .parallax>use:nth-child(1) {
            animation-delay: -2s;
            animation-duration: 7s;
        }

        .wave_hero_header .parallax>use:nth-child(2) {
            animation-delay: -3s;
            animation-duration: 10s;
        }

        .wave_hero_header .parallax>use:nth-child(3) {
            animation-delay: -4s;
            animation-duration: 13s;
        }

        .wave_hero_header .parallax>use:nth-child(4) {
            animation-delay: -5s;
            animation-duration: 20s;
        }

        @keyframes move-forever {
            0% {
                transform: translate3d(-90px, 0, 0);
            }

            100% {
                transform: translate3d(85px, 0, 0);
            }
        }

        /*Shrinking for mobile*/
        @media (max-width: 768px) {
            .wave_hero_header .waves {
                height: 40px;
                min-height: 40px;
            }

            .wave_hero_content {
                height: 30vh;
            }

            .wave_hero_header h1 {
                font-size: 24px;
            }
        }
    </style>
<div class="wave_hero_header">

        <!--Content before waves-->
        <div class="inner-header flex">
            <!--Just the logo.. Don't mind this-->
            <svg version="1.1" class="logo" baseProfile="tiny" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 500 500" xml:space="preserve">
                <path fill="#FFFFFF" stroke="#000000" stroke-width="10" stroke-miterlimit="10" d="M57,283" />
                <g>
                    <path fill="#fff"
                        d="M250.4,0.8C112.7,0.8,1,112.4,1,250.2c0,137.7,111.7,249.4,249.4,249.4c137.7,0,249.4-111.7,249.4-249.4
C499.8,112.4,388.1,0.8,250.4,0.8z M383.8,326.3c-62,0-101.4-14.1-117.6-46.3c-17.1-34.1-2.3-75.4,13.2-104.1
c-22.4,3-38.4,9.2-47.8,18.3c-11.2,10.9-13.6,26.7-16.3,45c-3.1,20.8-6.6,44.4-25.3,62.4c-19.8,19.1-51.6,26.9-100.2,24.6l1.8-39.7		c35.9,1.6,59.7-2.9,70.8-13.6c8.9-8.6,11.1-22.9,13.5-39.6c6.3-42,14.8-99.4,141.4-99.4h41L333,166c-12.6,16-45.4,68.2-31.2,96.2	c9.2,18.3,41.5,25.6,91.2,24.2l1.1,39.8C390.5,326.2,387.1,326.3,383.8,326.3z" />
                </g>
            </svg>
            <h1>Simple CSS Waves</h1>
        </div>

        <!--Waves Container-->
        <div>
            <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
                <defs>
                    <path id="gentle-wave"
                        d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                </defs>
                <g class="parallax">
                    <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
                    <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                    <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                    <use xlink:href="#gentle-wave" x="48" y="7" fill="#fff" />
                </g>
            </svg>
        </div>
        <!--Waves end-->

    </div>
    <!--Header ends-->

    <!--Content starts-->
    <div class="wave_hero_content wave_hero_flex">
        <p>By.Goodkatz | Free to use </p>
    </div>
`;

const WaveHero = () => {
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

export default WaveHero;

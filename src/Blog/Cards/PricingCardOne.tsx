import { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const htmlCode = `
<style>
 @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
*{
box-sizing:border-box
}
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin: 40px, 0;
}
.container .cards {
    position: relative;
    width: 350px;
    height: 520px;
    background-color: #ccc;
    margin: 20px;
    border-radius: 40px;
    overflow: hidden;
}
.container .cards::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.2);
    z-index: 11;
    pointer-events: none;
}
.container .cards .icon {
    position: relative;
    width: 100%;
    height: 50%;
    background: #333;
    display: flex;
    justify-content: center;
    align-items: center;
}
.container .cards .icon img {
    filter: invert(1);
    max-width: 120px;
    z-index: 10;
}
.container .cards .icon::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 80px;
    background: #ccc;

}
.container .cards .icon::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 80px;
    background: #333;
    /* border-bottom-left-radius: 80px; */
}
.container .cards .content {
    position: relative;
    width: 100%;
    height: 50%;
    background-color: #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
}
.container .cards .content::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 80px;
    background: #333;

}
.container .cards .content::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 80px;
    background: #ccc;
    border-top-right-radius: 80px;
    border-top-left-radius: 80px;
}
.container .cards .content .text {

    text-align: center;
    padding: 2px 30px;
    z-index: 1;
}
.container .cards .content .text h2 {
    font-weight: 500;
    font-size: 1.7em;
    color: #333
}
.container .cards .content .text p {
    font-weight: 400;
    color: #300;
    margin: 10px 0;

}
.container .cards .content .text a {
    display: inline-block;
    padding: 12px 25px;
    background: #333;
    color: #fff;
    margin-top: 10px;
    border-radius: 30px;
    text-decoration: none;

}
.container .cards:nth-child(1) .icon,
.container .cards:nth-child(1) .icon::after,
.container .cards:nth-child(1) .content::before,
.container .cards:nth-child(1) .content .text a {
    background-color: #0cc58e;
}
.container .cards:nth-child(1) .content,
.container .cards:nth-child(1) .icon::before,
.container .cards:nth-child(1) .content::after {
    background-color: #effaf0;
}
.container .cards:nth-child(2) .icon,
.container .cards:nth-child(2) .icon::after,
.container .cards:nth-child(2) .content::before,
.container .cards:nth-child(2) .content .text a {
    background-color: #f25894;
}
.container .cards:nth-child(2) .content,
.container .cards:nth-child(2) .icon::before,
.container .cards:nth-child(2) .content::after {
    background-color: #feebf1;
}
.container .cards:nth-child(3) .icon,
.container .cards:nth-child(3) .icon::after,
.container .cards:nth-child(3) .content::before,
.container .cards:nth-child(3) .content .text a {
    background-color: #4d5bf9;
}
.container .cards:nth-child(3) .content,
.container .cards:nth-child(3) .icon::before,
.container .cards:nth-child(3) .content::after {
    background-color: #eff0ff;
}
</style>

<div class="container">
  <div class="cards">
    <div class="icon">
      <img src="/pentool-removebg-preview.png" alt="">
    </div>
    <div class="content">
      <div class="text">
        <h2>design</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque repudiandae quis similique.</p>
        <a href="#">read more</a>
      </div>
    </div>
  </div>
  <div class="cards">
    <div class="icon">
      <img src="/coding-removebg-preview.png" alt="">
    </div>
    <div class="content">
      <div class="text">
        <h2>development</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque repudiandae quis similique.</p>
        <a href="#">read more</a>
      </div>
    </div>
  </div>
  <div class="cards">
    <div class="icon">
      <img src="/rocket_launch-removebg-preview.png" alt="">
    </div>
    <div class="content">
      <div class="text">
        <h2>launch</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque repudiandae quis similique.</p>
        <a href="#">read more</a>
      </div>
    </div>
  </div>
</div>
`;

const PricingCardOne = () => {
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

export default PricingCardOne;

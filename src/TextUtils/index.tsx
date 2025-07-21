import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const TextUtilLayout: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Helmet>
        <title>Text Utils | Tutorials, Tools & Tips</title>
        <meta name="description" content="Explore tutorials, tools, and insights on web development, JavaScript, CSS, React, and more. Stay updated with useful blogs for developers." />
        <meta name="keywords" content="developer blog, web development tutorials, JavaScript blog, React tips, CSS tricks, coding articles" />
        <meta name="author" content="skpsolution" />
        <meta property="og:url" content="https://skpsolution.co.in/text-utils" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Text Utils | Tutorials, Tools & Tips" />
        <meta property="og:description" content="Explore powerful tools and tutorials for frontend developers. Convert text, learn new skills, and boost productivity." />
      </Helmet>

      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          minHeight: "100vh",
          fontFamily: "Segoe UI",
          background: "#1e1e1e",
          color: "#fff",
        }}
      >
        {/* Main content area */}
        <main
          style={{
            flex: 1,
            padding: "2rem 0",
            // marginLeft: isMobile ? 0 : "20rem",
            marginTop: isMobile ? "1rem" : "1rem",
            overflowY: "auto",
            width: "100%",
          }}
        >
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default TextUtilLayout;

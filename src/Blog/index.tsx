import React, { useState, useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";

<Helmet>
  <title>Developer Blog | Tutorials, Tools & Tips</title>
  <meta name="description" content="Explore tutorials, tools, and insights on web development, JavaScript, CSS, React, and more. Stay updated with useful blogs for developers." />
  <meta name="keywords" content="developer blog, web development tutorials, JavaScript blog, React tips, CSS tricks, coding articles" />
  <meta name="author" content="skpsolution" />

  <meta property="og:url" content="https://skpsolution.co.in/blog" />
</Helmet>;

const BlogLayout: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
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
      {/* Sidebar */}
      <aside
        style={{
          width: isMobile ? "100%" : "250px",
          padding: "1.5rem 1rem",
          backgroundColor: "#2b2b2b",
          borderRight: isMobile ? "none" : "1px solid #444",
          borderBottom: isMobile ? "1px solid #444" : "none",
          position: isMobile ? "relative" : "fixed",
          top: 50,
          left: 0,
          height: isMobile ? "auto" : "100vh",
          zIndex: 10,
        }}
      >
        <h2 style={{ marginBottom: "1.5rem", fontSize: "1.5rem" }}>📚 Blog Menu</h2>
        <nav
          style={{
            display: "flex",
            flexDirection: isMobile ? "row" : "column",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <NavLink
            to="/blog/radio-player"
            style={({ isActive }) => ({
              textDecoration: "none",
              color: isActive ? "#00ffe1" : "#ccc",
              fontWeight: isActive ? "bold" : "normal",
            })}
          >
            🎧 Radio Player
          </NavLink>
          <NavLink
            to="/blog/speed-test"
            style={({ isActive }) => ({
              textDecoration: "none",
              color: isActive ? "#00ffe1" : "#ccc",
              fontWeight: isActive ? "bold" : "normal",
            })}
          >
            🚀 Internet Speed Tester
          </NavLink>
          <NavLink
            to="/blog/card-design"
            style={({ isActive }) => ({
              textDecoration: "none",
              color: isActive ? "#00ffe1" : "#ccc",
              fontWeight: isActive ? "bold" : "normal",
            })}
          >
            🧩 Design Cards
          </NavLink>
        </nav>
      </aside>

      {/* Content Area */}
      <main
        style={{
          flex: 1,
          padding: "2rem 0",
          marginLeft: isMobile ? 0 : "20rem",
          marginTop: isMobile ? "1rem" : "1rem",
          overflowY: "auto",
          width: "100%",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default BlogLayout;

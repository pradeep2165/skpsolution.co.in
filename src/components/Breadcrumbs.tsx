// src/components/Breadcrumbs.tsx
// import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Breadcrumbs.css"; // Optional: for styling

const Breadcrumbs = () => {
  const location = useLocation();
  const crumbs = location.pathname.split("/").filter(Boolean);

  return (
    <div className="breadcrumbs">
      <Link to="/">Home</Link>
      {crumbs.map((crumb, index) => {
        const to = "/" + crumbs.slice(0, index + 1).join("/");
        return (
          <span key={to}>
            {" / "}
            <Link to={to}>{crumb.replace(/-/g, " ")}</Link>
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;

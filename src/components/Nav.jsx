import React, { useState, useCallback } from "react";
import { NavLink as Link } from "react-router-dom";
import { TextField } from "@shopify/polaris";

export default function Nav() {
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  let activeStyle = {
    textDecoration: "none",
    background: "var(--p-action-primary)",
    color: "#ffffff",
    padding: "15px 45px",
  };

  let inactiveStyle = {
    textDecoration: "none",
    color: "black",
    padding: "15px 45px",
    flex: "auto",
  };

  let hoverStyle = {
    backgroundColor: isHover ? "var(--p-action-primary-hover)" : "lightgray",
  };

  return (
    <nav>
      <ul
        style={{
          listStyle: "none",
          display: "flex",
          justifyContent: "space-around",
          padding: "0px 0px 0px 0px",
        }}
      >
        <li style={{ flex: "1" }}>
          <Link
            to={"/"}
            style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to={"/products"}
            style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
          >
            Products
          </Link>
        </li>
        <li>
          <Link
            to={"/locations"}
            style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
          >
            Locations
          </Link>
        </li>
        <li>
          <Link
            to={"/picklists"}
            style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
          >
            Picklists
          </Link>
        </li>
      </ul>
    </nav>
  );
}

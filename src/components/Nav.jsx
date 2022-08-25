import React, { useState, useCallback } from "react";
import { NavLink as Link } from "react-router-dom";
import { TextField, Icon } from "@shopify/polaris";
import { navData } from "./navData";
import {
  MobileHamburgerMajor,
  MobileCancelMajor,
} from "@shopify/polaris-icons";
import css from "./nav.css";

export default function Nav() {
  const [isHover, setIsHover] = useState(false);
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const onMouseEnter = () => {
    if (window.innerWidth > 650) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };
  const onMouseLeave = () => {
    if (window.innerWidth < 650) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  return (
    <>
      <nav>
        <div className="hamburger" onClick={handleClick}>
          <Icon source={click ? MobileCancelMajor : MobileHamburgerMajor} />
        </div>
        <ul className={click ? "nav-menu-active" : "nav-menu"}>
          {navData.map((item, index) => {
            return (
              <li key={index}>
                <Link
                  onClick={closeMobileMenu}
                  to={item.url}
                  style={item.style}
                  className={item.className}
                >
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

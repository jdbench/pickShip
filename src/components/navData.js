let activeStyle = {
  textDecoration: "none",
  background: "var(--p-action-primary)",
  color: "#ffffff",
  padding: "15px 45px",
  flex: "1",
};

let inactiveStyle = {
  textDecoration: "none",
  color: "black",
  padding: "15px 45px",
  flex: "1",
};

export const navData = [
  {
    title: "Dashboard",
    url: "/",
    className: "nav-links",
    style: ({ isActive }) => (isActive ? activeStyle : inactiveStyle),
  },
  {
    title: "Locations",
    url: "/locations",
    className: "nav-links",
    style: ({ isActive }) => (isActive ? activeStyle : inactiveStyle),
  },
  {
    title: "Products",
    url: "/products",
    className: "nav-links",
    style: ({ isActive }) => (isActive ? activeStyle : inactiveStyle),
  },
  {
    title: "Picklists",
    url: "/picklists",
    className: "nav-links",
    style: ({ isActive }) => (isActive ? activeStyle : inactiveStyle),
  },
];

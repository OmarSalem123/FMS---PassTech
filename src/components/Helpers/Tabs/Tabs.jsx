 import React from "react";

const Tabs = ({ title, isActive, onClick, style = "" }) => {
  const activeClass = isActive ? "tab-active" : "";

  return (
    <div
      role="button"
      className={`tabs ${style} ${activeClass}`}
      onClick={onClick}
    >
      {title}
    </div>
  );
};

export default Tabs;

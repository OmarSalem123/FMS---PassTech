import React from "react";

export default function Searchbar({
  style,
  path,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div>
      <div className={style}>
        <span className="input-group-text">
          <img src={path} alt="search" />
        </span>
        <input
          className="form-control"
          type="text"
          placeholder={placeholder}
          aria-label="default input example"
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

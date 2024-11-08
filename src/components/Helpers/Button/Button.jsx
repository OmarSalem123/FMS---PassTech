import React from "react";

export default function Button({
  style,
  textstyle,
  onClick,
  type,
  disabled,
  img,
  text,
  img2,
}) {
  return (
    <>
      <div>
        <button
          className={style}
          onClick={onClick}
          type={type}
          disabled={disabled}
        >
          <div className="flex-between">
            {img && <img className="me-2" src={`${process.env.PUBLIC_URL}/assets/${img}`} alt="" />}
            <div className={textstyle}>{text}</div>
            {img2 && <img src={`${process.env.PUBLIC_URL}/assets/${img2}`} alt="" />}
          </div>
        </button>
      </div>
    </>
  );
}

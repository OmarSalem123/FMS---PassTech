import React from "react";

export default function Close({ close, style, img }) {
  return (
    <>
      <div onClick={close}>
        <div className={style} >
          <img src={`/assets/${img}.svg`} alt="close" />
        </div>
      </div>
    </>
  );
}

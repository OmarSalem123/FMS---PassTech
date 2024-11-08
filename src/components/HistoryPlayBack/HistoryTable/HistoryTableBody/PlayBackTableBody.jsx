import React, { useContext, useEffect, useRef } from "react";
import { popupcontext } from "../../../../context/Popupscontext";
import { formatDate } from "../../../../JsHelpers/DateFormat";

export default function PlayBackTableBody({ historypositions }) {
  let { posIndex } = useContext(popupcontext);
  const rowRefs = useRef([]);

  const getFormattedDate = (serverTime) => formatDate(serverTime);

  useEffect(() => {
    if (rowRefs.current[posIndex]) {
      rowRefs.current[posIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [posIndex]);
  let tableData = historypositions.map((i, index) => {
    const { formattedDate, formattedTime } = getFormattedDate(i?.deviceTime);
    return (
      <div
        key={i.id}
        ref={(el) => (rowRefs.current[index] = el)}
        className={`${
          posIndex === index ? "bg-brand50 " : ""
        } history-playback-tablecontent-body`}
      >
        <div className="history-playback-tablecontent-body-time ">
          {formattedDate + " " + formattedTime}
        </div>
        <div className="history-playback-tablecontent-body-speed">
          {i.speed}
        </div>
      </div>
    );
  });
  return (
    <div className="p-8 sticky-header">
      <div className=" history-playback-tablecontent">
        <div className="history-playback-tablecontent-head-wrap">
          <div className="history-playback-tablecontent-head">
            <div className="w-50">Time</div>
            <div className="w-50">Speed</div>
          </div>
        </div>

        <div className="history-playback-tablecontent-body-wrap">
          {tableData}
        </div>
      </div>
    </div>
  );
}

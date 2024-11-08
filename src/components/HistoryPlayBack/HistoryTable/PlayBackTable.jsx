import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { popupcontext } from "../../../context/Popupscontext";
import PlayBackTableHead from "./HistoryTableHead/PlayBackTableHead";
import PlayBackTableBody from "./HistoryTableBody/PlayBackTableBody";

export default function PlayBackTable() {
  const historypositions = useSelector(
    (state) => state.webSocket.historypositions
  );
  let { display } = useContext(popupcontext);

  return (
    <>
      {display && historypositions.length !== 0 && (
        <>
          <div className="history-playback-table p-0">
            <PlayBackTableHead />
            <div className="H-line"></div>
            <PlayBackTableBody historypositions={historypositions} />
          </div>
          {/**  <div className="history-playback-table overflow-auto">
            <div className="d-flex justify-content-between ">
              <table>
                <tr className="sticky-header w-100">
                  <th className="history-playback-table-header">Time</th>
                  <th className="history-playback-table-header">Speed</th>
                </tr>
                {tableData}
              </table>
            </div>
          </div>*/}
        </>
      )}
    </>
  );
}

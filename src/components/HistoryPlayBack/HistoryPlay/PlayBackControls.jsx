import React, { useContext } from "react";
import { popupcontext } from "../../../context/Popupscontext";
import { useSelector } from "react-redux";
import { formatDate } from "../../../JsHelpers/DateFormat";

export default function PlayBackControls({ maxValue }) {
  let { isPlaying, setIsPlaying, posIndex, setPosIndex } =
    useContext(popupcontext);
  //let [currentIndex, setCurrentIndex] = useState(0);
  const data = useSelector((state) => state.webSocket.historypositions);
  const { formattedDate, formattedTime } = formatDate(
    data[posIndex]?.deviceTime
  );
  const moveNext = () => {
    if (posIndex + 1 !== data?.length) setPosIndex(posIndex + 1);
  };
  const moveBack = () => {
    if (posIndex !== 0) setPosIndex(posIndex - 1);
  };
  return (
    <>
      <div className="history-playback-media mt-4">
        <input
          type="range"
          min="0"
          max={data?.length - 1}
          value={posIndex}
          onChange={(e) => {
            setPosIndex(e.target.value);
            console.log("Range Value", e.target.value);
          }}
          className="history-playback-slider"
        />
        <div className="history-playback-current data">
          <div className="flex-between fs-14">
            <div>
              {Number(posIndex) + 1}/{data?.length}
            </div>
            <div>{formattedDate + " " + formattedTime}</div>
          </div>
        </div>
        <div className="history-playback-mediaplayer mx-auto w-50">
          <div className="mediabutton">
            <img src="/assets/doubleback.svg" alt="media" onClick={moveBack} />
          </div>
          <div className="mediabutton">
            <img
              src={isPlaying ? "/assets/pause.svg" : "/assets/play.svg"}
              alt="media"
              onClick={() => setIsPlaying(!isPlaying)}
            />
          </div>
          <div className="mediabutton">
            <img src="/assets/doublenext.svg" alt="media" onClick={moveNext} />
          </div>
        </div>
      </div>
    </>
  );
}

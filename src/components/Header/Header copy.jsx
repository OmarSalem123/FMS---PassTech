/* eslint-disable react/style-prop-object */
import React, { useContext, useEffect, useRef } from "react";
import { sidebarcontext } from "../../context/Sidebarcontext";
import Searchbar from "../Helpers/Searchbar/Searchbar";
import { useSelector } from "react-redux";
import { popupcontext } from "../../context/Popupscontext";

export default function Header() {
  let { isSideOpen } = useContext(sidebarcontext);
  let { isFullScreen, setIsFullScreen, options, setOptions } =
    useContext(popupcontext);

  const dropdownRef = useRef(null);

  let inf = useSelector((state) => state.users.user);

  const goFullScreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    }
    setIsFullScreen(true);
  };

  const exitFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    setIsFullScreen(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "F11") {
      event.preventDefault();
      isFullScreen ? exitFullScreen() : goFullScreen();
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOptions(false);
    }
  };

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("fullscreenchange", handleFullScreenChange);
    document.addEventListener("mousedown", handleClickOutside); // Listen for outside clicks

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFullScreen]);

  return (
    <>
      <div className={isSideOpen ? "header header-max" : "header header-min"}>
        <div className="flex-between w-100">
          <Searchbar
            style="search input-group"
            path="/assets/dark/search.svg"
            placeholder="Search anything"
          />
          <div className="header-tools flex-between">
            <div className="notify position-relative">
              <img src="/assets/dark/notifications.svg" alt="notification" />
              <div className="notify-count">
                <p>5</p>
              </div>
              <div className="p"></div>
            </div>
            <div
              className="screen-control"
              role="button"
              onClick={!isFullScreen ? goFullScreen : exitFullScreen}
            >
              <img
                src={
                  !isFullScreen
                    ? "/assets/dark/expand.svg"
                    : "/assets/Minimize.svg"
                }
                alt="expand"
              />
            </div>
            <div
              className="header-username"
              ref={dropdownRef}
              onClick={() => setOptions(!options)}
            >
              <p className="text-capitalize">{inf.name[0]}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
